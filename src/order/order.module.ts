import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderItemModule } from 'src/order-item/order-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    OrderItemModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
