import { Field, InputType } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';

@InputType()
export class DateRangeFilter {
  @Field(() => GraphQLDate)
  from: Date;

  @Field(() => GraphQLDate)
  to: Date;
}
