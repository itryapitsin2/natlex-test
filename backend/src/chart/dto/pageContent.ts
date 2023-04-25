import { Field, ObjectType } from '@nestjs/graphql';
import { ChartEntity } from '../entity/chart.entity';
import { Item } from './item';

@ObjectType()
export class PageContent {
  @Field(() => [ChartEntity], {
    defaultValue: [],
  })
  charts: ChartEntity[] = [];

  @Field(() => [Item], {
    defaultValue: [],
  })
  data: Item[] = [];
}
