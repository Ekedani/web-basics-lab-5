import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [AuthModule, AccountsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
