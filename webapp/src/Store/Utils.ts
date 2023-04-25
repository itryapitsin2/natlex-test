import { ChartCard } from './ChartSlice';
import { Item } from 'natlex-test-backend/dist/chart/dto/item';
import { ChartEntity } from 'natlex-test-backend/dist/chart/entity/chart.entity';

/**
 * @deprecated Shit!
 * @param chart
 * @param data
 */
export const chartToChartCard = (chart: ChartEntity, data: Item[]): any => {
  return {
    id: chart.id,
    title: {
      text: chart.title,
    },
    chart: {
      type: chart.tpe.toLowerCase(),
    },
    series: {
      data: data.map((x) => [new Date(x.date), x.value]),
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b',
      },
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: 'Snow depth (m)',
      },
      min: 0,
    },
  };
};
