import { Injectable } from '@nestjs/common';
import { WeatherStorage } from './data/storage';
import { Item } from './dto/item';
import { ChartEntity } from './entity/chart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChartService {
  constructor(
    @InjectRepository(ChartEntity)
    private chartRepository: Repository<ChartEntity>,
  ) {}

  findWeatherInPeriod(from: Date, to: Date): Array<Item> {
    return WeatherStorage.filter((item) => {
      return from < item.date && item.date < to;
    }).map((x, idx) => ({
      date: x.date,
      value: x.value,
      id: idx,
    }));
  }

  getWeatherData(): Array<Item> {
    return WeatherStorage.map((x, idx) => ({
      date: x.date,
      value: x.value,
      id: idx,
    }));
  }

  async getChartCards(): Promise<Array<ChartEntity>> {
    return this.chartRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async addChartCard(newChartCard: ChartEntity): Promise<Array<ChartEntity>> {
    await this.chartRepository.insert(newChartCard);
    return this.getChartCards();
  }

  async editChartCard(chartCard: ChartEntity): Promise<Array<ChartEntity>> {
    const entity = await this.chartRepository.findOne({
      where: {
        id: chartCard.id,
      },
    });
    console.log(entity, chartCard);
    await this.chartRepository.update(chartCard.id, chartCard);
    return this.getChartCards();
  }

  async removeChartCard(id: number): Promise<Array<ChartEntity>> {
    await this.chartRepository.delete(id);

    return this.getChartCards();
  }
}
