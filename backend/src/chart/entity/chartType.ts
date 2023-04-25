import { registerEnumType } from '@nestjs/graphql';

export enum ChartType {
  BAR = 'bar',
  COLUMN = 'column',
  SPLINE = 'spline',
}

registerEnumType(ChartType, {
  name: 'ChartType',
});

export const chartTypeResolver: Record<keyof typeof ChartType, string> = {
  BAR: 'bar',
  COLUMN: 'column',
  SPLINE: 'spline',
};
