// src/modules/user/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class WishlistItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true }) // 찜 목록이나 장바구니 이름
  name: string;

  @Prop({ default: true }) // 활성화 여부
  active: boolean;
}

export const WishlistItemSchema = SchemaFactory.createForClass(WishlistItem);

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true }) // 고유한 사용자 이름
  username: string;

  @Prop({ type: [WishlistItemSchema], default: [] }) // 여러 종류의 찜 목록
  wishlist: WishlistItem[];

  @Prop({ type: [WishlistItemSchema], default: [] }) // 여러 종류의 장바구니
  cart: WishlistItem[];
}

export const UserSchema = SchemaFactory.createForClass(User);
