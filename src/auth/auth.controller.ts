import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signin(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto.email, signInDto.password);
    }
}
