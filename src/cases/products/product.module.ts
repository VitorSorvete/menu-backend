import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.crotroller';
import { Category } from '../categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
