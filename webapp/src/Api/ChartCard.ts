import { gql, request } from 'graphql-request';
import { client } from './Address';
import { ChartCard } from '../Store/ChartSlice';
import { PageContent } from 'natlex-test-backend/dist/chart/dto/pageContent';

const GET_CHART_CARDS = gql`
  query GET_CHART_CARDS($filter: DateRangeFilter!) {
    pageContent(filter: $filter) {
      charts {
        id
        title
        tpe
        theme
      }
      data {
        date
        value
      }
    }
  }
`;

const ADD_CHART_CARD = gql`
  mutation addChartCard($chartCard: EditChartInput!) {
    addChartCard(chart: $chartCard) {
      charts {
        id
        title
        tpe
        theme
      }
      data {
        date
        value
      }
    }
  }
`;

const REMOVE_CHART_CARD = gql`
  mutation deleteChart($id: Int!) {
    deleteChart(id: $id) {
      charts {
        id
        title
        tpe
        theme
      }
      data {
        date
        value
      }
    }
  }
`;

const EDIT_CHART_CARD = gql`
  mutation editChart($chartCard: EditChartInput!) {
    editChart(chart: $chartCard) {
      charts {
        id
        title
        tpe
        theme
      }
      data {
        date
        value
      }
    }
  }
`;

export const loadChartCardsByFilter = (filter: {
  from: string;
  to: string;
}): Promise<{ pageContent: PageContent }> => {
  return client.request(GET_CHART_CARDS, {
    filter,
  });
};

export const addChartCard = (
  newChartCard: ChartCard,
): Promise<{ addChartCard: PageContent }> => {
  return client.request(ADD_CHART_CARD, {
    chartCard: {
      title: newChartCard.title.text,
      tpe: newChartCard.chart.type.toUpperCase(),
    },
  });
};

export const editChartCard = (
  chartCard: ChartCard,
): Promise<{ editChart: PageContent }> => {
  return client.request(EDIT_CHART_CARD, {
    chartCard: {
      id: chartCard.id,
      title: chartCard.title.text,
      tpe: chartCard.chart.type.toUpperCase(),
    },
  });
};

export const deleteChartCard = (
  id: number,
): Promise<{ deleteChart: PageContent }> => {
  return client.request(REMOVE_CHART_CARD, {
    id,
  });
};
