import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from './entities/order-item.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>
  ) {}
  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItemEntity> {
    try {
      const newOrderItem = await this.orderItemRepository.save(createOrderItemDto);
      return await this.orderItemRepository.findOne({
        where: {
          id: newOrderItem.id
        },
        relations: ['product']
      })
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findAll(): Promise<OrderItemEntity[]> {
    try {
      return await this.orderItemRepository.find({
        relations: ['order', 'product']
      })
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<OrderItemEntity> {
    try {
      return await this.orderItemRepository.findOne({
        where: {
          id
        },
        relations: ['order', 'product']
      })
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItemEntity> {
    try {
      const orderItem = await this.orderItemRepository.findOne({
        where: {
          id
        },
        relations: ['order', 'product']
      });
      const updatedOrderItem = {
        ...orderItem,
        ...updateOrderItemDto
      }
      return await this.orderItemRepository.save(updatedOrderItem);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.orderItemRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
