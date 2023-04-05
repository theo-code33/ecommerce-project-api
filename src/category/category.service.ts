import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ){}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      return await this.categoryRepository.save(createCategoryDto);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findAll(): Promise<CategoryEntity[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<CategoryEntity> {
    try {
      return await this.categoryRepository.findOneBy({
        id
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

  remove(id: string): Promise<DeleteResult> {
    try{
      return this.categoryRepository.delete(id);
    }catch(error){
      console.log(error);
      throw new Error(error);
    }
  }
}
