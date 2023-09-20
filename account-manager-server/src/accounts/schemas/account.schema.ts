import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop({ required: true })
  service: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    required: true,
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId: any;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
