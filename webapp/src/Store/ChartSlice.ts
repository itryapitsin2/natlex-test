import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';
import 'datejs';
import {
  addChartCard,
  deleteChartCard,
  editChartCard,
  loadChartCardsByFilter,
} from '../Api/ChartCard';
import { chartToChartCard } from './Utils';

export type ChartCard = {
  id?: number;
  title: {
    text: string;
  };
  series?: {
    data: [Date, number][];
  };
  chart: {
    type: string;
  };
};

export type FilterRange = {
  from: Dayjs;
  to: Dayjs;
};

export const getChartCardsByFilter = createAsyncThunk(
  'chartCards/fetchByIdStatus',
  async (filter: FilterRange, thunkAPI) => {
    return await loadChartCardsByFilter({
      from: filter.from.format('YYYY-MM-DD'),
      to: filter.to.format('YYYY-MM-DD'),
    });
  },
);

export const createChartCard = createAsyncThunk(
  'chartCards/createChartCard',
  async (newCard: ChartCard) => {
    return await addChartCard(newCard);
  },
);

export const updateChartCard = createAsyncThunk(
  'chartCards/updateChartCard',
  async (editChardCart: ChartCard) => {
    return await editChartCard(editChardCart);
  },
);

export const removeChartCard = createAsyncThunk(
  'chartCards/removeChartCard',
  async (newCard: ChartCard) => {
    return await deleteChartCard(newCard.id!!);
  },
);

export const chartSlice = createSlice({
  name: 'chart',
  initialState: {
    chartCards: [] as ChartCard[],
    openEditChartDialog: false,
    openRemoveChartDialog: false,
    loadingData: false,
    filterRange: {
      from: dayjs(Date.today().addYears(-4)),
      to: dayjs(Date.today()),
    } as FilterRange,
    selectedChartCard: null as ChartCard | null,
  },
  reducers: {
    setFrom: (state, action: PayloadAction<Dayjs>) => {
      state.filterRange.from = action.payload;
    },
    setTo: (state, action: PayloadAction<Dayjs>) => {
      state.filterRange.to = action.payload;
    },
    setSelectedChartCardTitle: (state, action: PayloadAction<string>) => {
      if (state.selectedChartCard?.title.text) {
        state.selectedChartCard.title.text = action.payload;
      } else {
        state.selectedChartCard = {
          title: {
            text: action.payload,
          },
          chart: {
            type: '',
          },
        };
      }
    },
    setSelectedChartCardType: (state, action: PayloadAction<string>) => {
      if (state.selectedChartCard?.chart) {
        state.selectedChartCard.chart.type = action.payload;
      } else {
        state.selectedChartCard = {
          title: {
            text: '',
          },
          chart: {
            type: action.payload,
          },
        };
      }
    },
    showAddChartDialog: (state) => {
      state.openEditChartDialog = true;
    },
    showEditChartDialog: (state, action: PayloadAction<ChartCard>) => {
      state.openEditChartDialog = true;
      state.selectedChartCard = action.payload;
    },
    closeEditChartDialog: (state) => {
      state.openEditChartDialog = false;
      state.selectedChartCard = null;
    },
    showRemoveChartDialog: (state, action: PayloadAction<ChartCard>) => {
      state.openRemoveChartDialog = true;
      state.selectedChartCard = action.payload;
    },
    closeRemoveChartDialog: (state, action) => {
      state.openRemoveChartDialog = false;
      state.selectedChartCard = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChartCardsByFilter.pending, (state, action) => {
        state.loadingData = true;
      })
      .addCase(getChartCardsByFilter.fulfilled, (state, action) => {
        state.loadingData = false;
        state.chartCards = action.payload.pageContent.charts.map(
          (x) =>
            chartToChartCard(x, action.payload.pageContent.data) as ChartCard,
        );
      })
      .addCase(getChartCardsByFilter.rejected, (state, action) => {
        state.loadingData = false;
      })
      .addCase(createChartCard.pending, (state, action) => {
        state.loadingData = true;
        state.selectedChartCard = null;
        state.openEditChartDialog = false;
      })
      .addCase(createChartCard.fulfilled, (state, action) => {
        state.loadingData = false;
        state.chartCards = action.payload.addChartCard.charts.map(
          (x) =>
            chartToChartCard(x, action.payload.addChartCard.data) as ChartCard,
        );
      })
      .addCase(updateChartCard.pending, (state, action) => {
        state.loadingData = true;
        state.selectedChartCard = null;
        state.openEditChartDialog = false;
      })
      .addCase(updateChartCard.fulfilled, (state, action) => {
        state.loadingData = false;
        state.chartCards = action.payload.editChart.charts.map(
          (x) =>
            chartToChartCard(x, action.payload.editChart.data) as ChartCard,
        );
      })
      .addCase(removeChartCard.pending, (state, action) => {
        state.loadingData = true;
        state.selectedChartCard = null;
        state.openRemoveChartDialog = false;
      })
      .addCase(removeChartCard.fulfilled, (state, action) => {
        state.loadingData = false;

        state.chartCards = action.payload.deleteChart.charts.map(
          (x) =>
            chartToChartCard(x, action.payload.deleteChart.data) as ChartCard,
        );
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  showAddChartDialog,

  showEditChartDialog,
  closeEditChartDialog,

  showRemoveChartDialog,
  closeRemoveChartDialog,

  setFrom,
  setTo,

  setSelectedChartCardTitle,
  setSelectedChartCardType,
} = chartSlice.actions;
