import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';

export type Order = 'ASC' | 'DESC';

export type Query = {
  limit?: number;
  offset?: number;
  order?: Order;
}

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ){}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      return await this.categoryRepository.save(createCategoryDto);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findAll(query: Query): Promise<CategoryEntity[]> {
    let { limit, offset, order } = query;
    limit = limit || 100;
    offset = offset || 0;
    order = order || 'DESC';

    try {
      const queryBuilder = await this.categoryRepository.createQueryBuilder('category')
                                  .leftJoinAndSelect('category.products', 'products')
      const [data] = await queryBuilder
        .orderBy('category.createdAt', order)
        .limit(limit)
        .offset(offset)
        .getManyAndCount()
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<CategoryEntity> {
    try {
      return await this.categoryRepository.findOne({
        where: {
          id
        },
        relations: ['products']
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    try{
      const category = await this.categoryRepository.findOneBy({
        id
      })
      const updatedCategory = {
        ...category,
        ...updateCategoryDto
      }
      return await this.categoryRepository.save(updatedCategory);
    }catch(error){

    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try{
      const category = await this.categoryRepository.findOne({
        where: {
          id
        },
        relations: ['products']
      })
      if(category.products.length > 0){
        for(const product of category.products){
          await this.productRepository.delete(product.id);
        }
      }
      return await this.categoryRepository.delete(id);
    }catch(error){
      console.log(error);
      throw new Error(error);
    }
  }
}
