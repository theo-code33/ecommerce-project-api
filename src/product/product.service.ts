import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ){}

  create(
    createProductDto: CreateProductDto,
    file: Express.Multer.File
  ): Promise<ProductEntity> {
    try {
      const product = {
        ...createProductDto,
        image: process.env.API_URL + 'files/' + file.filename
      }
      return this.productRepository.save(product);
    } catch (error) {
      console.log(error);
      throw new Error(error);      
    }
  }

  async findAll(): Promise<ProductEntity[]> {
    try {
      return await this.productRepository.find({
        relations: ['category']
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<ProductEntity> {
    try {
      return await this.productRepository.findOne({
        where: {
          id
        },
        relations: ['category']
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);      
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.findOneBy({
        id
      })
      const updatedProduct = {
        ...product,
        ...updateProductDto
      }
      return await this.productRepository.save(updatedProduct);
    } catch (error) {
      console.log(error);
      throw new Error(error);      
    }
  }

  remove(id: string): Promise<DeleteResult> {
    try {
      return this.productRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
