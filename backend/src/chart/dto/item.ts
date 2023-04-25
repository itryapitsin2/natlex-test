import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Item {
  @Field(() => ID)
  id: number;

  @Field(() => GraphQLDate)
  date: Date;

  @Field(() => Float)
  value: number;
}
