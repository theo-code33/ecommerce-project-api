import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { DeleteResult, Repository } from 'typeorm';
import { OrderItemEntity } from 'src/order-item/entities/order-item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}
  
  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    try {

      return await this.orderRepository.save(createOrderDto);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findAll(): Promise<OrderEntity[]> {
    try {
      return await this.orderRepository.find({
        relations: ['items', 'items.product', 'user']
      })
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<OrderEntity> {
    try {
      return this.orderRepository.findOne({
        where: {
          id
        }, 
        relations: ['items', 'items.product', 'user']
      })
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findByUser(userId: string): Promise<OrderEntity[]> {
    try {
      return this.orderRepository.find({
        where: {
          user: {id: userId}
        },
        relations: ['items', 'items.product', 'user']
      })
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {    
    try {
      const order = await this.orderRepository.findOne({
        where: {
          id
        },
        relations: ['items', 'items.product', 'user']
      })
      const updatedOrder = {
        ...order,
        ...updateOrderDto
      }
      return await this.orderRepository.save(updatedOrder);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.orderRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
