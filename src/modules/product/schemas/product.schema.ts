// src/modules/product/schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true }) // 필수: 상품 이름
  name: string;

  @Prop({ required: true }) // 필수: 가격
  price: number;

  @Prop({ required: false }) // 선택: 이미지 URL
  imageUrl?: string;

  @Prop({ type: [String] }) // 태그 배열
  tags: string[];

  @Prop({ required: true }) // 필수: 공급사 이름
  supplier: string;
}

// Product 스키마 생성
export const ProductSchema = SchemaFactory.createForClass(Product);
