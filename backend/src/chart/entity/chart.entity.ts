import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ChartType } from './chartType';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ChartEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => ChartType)
  @Column('text')
  tpe: ChartType;

  @Field()
  @Column()
  theme: string;
}
