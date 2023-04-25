import { Field, ID, InputType } from '@nestjs/graphql';
import { ChartType } from '../entity/chartType';
import { DateRangeFilter } from './dateRangeFilter.input';

@InputType()
export class EditChartInput {
  @Field(() => String!)
  title: string;

  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => ChartType!)
  tpe: ChartType;

  @Field()
  theme: string;
}
