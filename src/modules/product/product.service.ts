// src/modules/product/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  // 제품 생성
  async createProduct(createProductDto: any): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  // 제품 ID로 조회
  async findProductById(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('상품을 찾을 수 없습니다.');
    return product;
  }

  // 모든 제품 가져오기
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
  
}
