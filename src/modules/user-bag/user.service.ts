// src/modules/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { Product } from '../product/schemas/product.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, // User 모델 주입
    @InjectModel(Product.name) private productModel: Model<Product>, // Product 모델 주입
  ) {}

  // 사용자 생성
  async createUser(username: string): Promise<User> {
    const user = new this.userModel({ username });
    return user.save();
  }

  // 찜 목록에 아이템 추가
  async addToWishlist(userId: string, productId: string, name: string, active: boolean = true) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('상품을 찾을 수 없습니다.');

    user.wishlist.push({ productId: product._id as Types.ObjectId, name, active });
    return user.save();
  }

  // 장바구니에 아이템 추가
  async addToCart(userId: string, productId: string, name: string, active: boolean = true) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('상품을 찾을 수 없습니다.');

    user.cart.push({ productId: product._id as Types.ObjectId, name, active });
    return user.save();
  }

  // 찜 목록 조회
  async getWishlist(userId: string, isActive: boolean) {
    const user = await this.userModel
      .findById(userId)
      .populate({
        path: 'wishlist.productId',
        select: '_id name price imageUrl tags supplier'
      })
      .exec();

    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    return user.wishlist.filter(item => item.active === isActive);
  }

  // 장바구니 목록 조회
  async getCart(userId: string, isActive: boolean) {
    const user = await this.userModel
      .findById(userId)
      .populate({
        path: 'cart.productId',
        select: '_id name price imageUrl tags supplier'
      })
      .exec();

    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    return user.cart.filter(item => item.active === isActive);
  }
}
