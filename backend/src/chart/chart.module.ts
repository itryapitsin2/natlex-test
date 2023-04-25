import { Module } from '@nestjs/common';
import { ChartService } from './chart.service';
import { ChartResolver } from './chart.resolver';
import { ChartEntity } from './entity/chart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ChartEntity])],
  providers: [ChartService, ChartResolver],
})
export class ChartModule {}
