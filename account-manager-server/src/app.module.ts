import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AccountsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
