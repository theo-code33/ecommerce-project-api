import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id };
        return {
        access_token: await this.jwtService.signAsync(payload),
        };
    }
}
