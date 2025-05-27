import { Module } from '@nestjs/common';
import { ArbitrageController } from './arbitrage.controller';
import { ArbitrageService } from './arbitrage.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsSnapshot } from './entities/statistics-snapshot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StatisticsSnapshot]),
    UserModule
  ],
  controllers: [ArbitrageController],
  providers: [ArbitrageService],
  exports: [ArbitrageService]
})
export class ArbitrageModule {}
