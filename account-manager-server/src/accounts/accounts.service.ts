import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './schemas/account.schema';
import { Model } from 'mongoose';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel('Account')
    private readonly accountModel: Model<Account>,
  ) {}

  create(createAccountDto: CreateAccountDto): Promise<Account> {
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  findOne(id: number): Promise<Account> {
    return this.accountModel.findById(id).exec();
  }

  update(id: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
    const updatedAccount = this.accountModel.findByIdAndUpdate(
      id,
      updateAccountDto,
    );
    return updatedAccount.exec();
  }

  remove(id: number): Promise<Account> {
    const deletedAccount = this.accountModel.findByIdAndDelete(id);
    return deletedAccount.exec();
  }
}
