// src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema'; // User 스키마 임포트
import { UserService } from './user.service'; // User 서비스 임포트
import { UserController } from './user.controller'; // User 컨트롤러 임포트
import { Product, ProductSchema } from '../product/schemas/product.schema'; // Product 스키마 임포트

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // User 모델 등록
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), // Product 모델 등록
    ],
    controllers: [UserController], // User 컨트롤러 등록
    providers: [UserService], // User 서비스 등록
})
export class UserModule { }
