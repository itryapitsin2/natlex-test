import React, { useEffect } from 'react';
import { Grid, Box, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';

import { useAppDispatch, useAppSelector } from '../Store';
import { ChartCard } from '../Components/ChartCard';
import {
  showEditChartDialog,
  showRemoveChartDialog,
  getChartCardsByFilter,
  setFrom,
  setTo,
} from '../Store/ChartSlice';

export const ViewMode = () => {
  const state = useAppSelector((state) => state.chart);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getChartCardsByFilter({
        from: state.filterRange.from,
        to: state.filterRange.to,
      }),
    );
  }, []);

  return (
    <Box sx={{ marginLeft: 2, marginRight: 2 }}>
      <Stack spacing={0.5}>
        {!!state.chartCards.length && (
          <Grid
            container
            justifyContent="center"
            spacing={2}
            direction="row"
            alignItems="center"
          >
            <Grid item>
              <DatePicker
                format="ddd, DD MMM YYYY"
                label="From"
                value={state.filterRange.from}
                onChange={(e) => {
                  if (e) {
                    dispatch(setFrom(e));
                  }
                }}
              />
            </Grid>
            <Grid item>
              <DatePicker
                format="ddd, DD MMM YYYY"
                label="To"
                value={state.filterRange.to}
                onChange={(e) => {
                  if (e) {
                    dispatch(setTo(e));
                  }
                }}
              />
            </Grid>
            <Grid item>
              <LoadingButton
                disabled={state.chartCards.length === 0}
                loading={state.loadingData}
                onClick={() => {
                  dispatch(
                    getChartCardsByFilter({
                      from: state.filterRange.from,
                      to: state.filterRange.to,
                    }),
                  );
                }}
                variant="contained"
                size="large"
              >
                Filter
              </LoadingButton>
            </Grid>
          </Grid>
        )}
        <Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 2, lg: 4 }}>
          {state.chartCards.map((chartCard) => {
            return (
              <Grid item xs={1} sm={1} md={1} lg={1} key={chartCard.id}>
                <ChartCard
                  chart={chartCard}
                  editable={false}
                  onEditClick={(payload) => {
                    dispatch(showEditChartDialog(payload));
                  }}
                  onRemoveClick={(payload) =>
                    dispatch(showRemoveChartDialog(chartCard))
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Box>
  );
};
