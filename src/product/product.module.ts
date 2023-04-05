import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    MulterModule.register({
      dest: 'files/'
    })
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
