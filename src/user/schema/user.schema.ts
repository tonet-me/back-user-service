import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type UserDocument = User & mongoosePaginate<Document>;

export enum UserStatusEnum {
  REGISTERED = 'registered',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class User {
  @Prop()
  fullName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ default: false })
  emailVerify: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  verified: string;

  @Prop()
  photo: string;

  @Prop({ enum: UserStatusEnum, default: UserStatusEnum.REGISTERED })
  status: string;

  @Prop({ default: false })
  oauthRegistered: boolean;

  @Prop()
  oauthProvider: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoosePaginate);
