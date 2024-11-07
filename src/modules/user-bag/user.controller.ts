// src/modules/user/user.controller.ts
import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 사용자 생성 엔드포인트
  @Post()
  async createUser(@Body('username') username: string) {
    return this.userService.createUser(username);
  }

  // 찜 목록에 아이템 추가
  @Post(':userId/wishlist/:productId')
  async addToWishlist(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body('name') name: string,
    @Body('active') active: boolean
  ) {
    return this.userService.addToWishlist(userId, productId, name, active);
  }

  // 장바구니에 아이템 추가
  @Post(':userId/cart/:productId')
  async addToCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body('name') name: string,
    @Body('active') active: boolean
  ) {
    return this.userService.addToCart(userId, productId, name, active);
  }

  // 활성화된 찜 목록 조회
  @Get(':userId/wishlist')
  async getWishlist(
    @Param('userId') userId: string,
    @Query('active') active: string
  ) {
    const isActive = active === 'true';
    return this.userService.getWishlist(userId, isActive);
  }

  // 활성화된 장바구니 목록 조회
  @Get(':userId/cart')
  async getCart(
    @Param('userId') userId: string,
    @Query('active') active: string
  ) {
    const isActive = active === 'true';
    return this.userService.getCart(userId, isActive);
  }
}
