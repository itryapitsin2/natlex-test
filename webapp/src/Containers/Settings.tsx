import { Box, Fab, Grid, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../Store';
import {
  closeEditChartDialog,
  closeRemoveChartDialog,
  createChartCard,
  getChartCardsByFilter,
  removeChartCard,
  setSelectedChartCardTitle,
  setSelectedChartCardType,
  showAddChartDialog,
  showEditChartDialog,
  showRemoveChartDialog,
  updateChartCard,
} from '../Store/ChartSlice';
import { ChartCard } from '../Components/ChartCard';
import { EditChartCardDialog } from '../Components/EditChartCardDialog';
import { RemoveChartCardDialog } from '../Components/RemoveChartCardDialog';
import { Add } from '@mui/icons-material';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';

export const Settings = () => {
  const state = useAppSelector((state) => state.chart);

  const dispatch = useAppDispatch();
  const onAddChartCardClick = () => {
    dispatch(showAddChartDialog());
  };

  useEffect(() => {
    dispatch(
      getChartCardsByFilter({
        from: dayjs(new Date(0)),
        to: dayjs(Date.today()),
      }),
    );
  }, []);

  return (
    <Box sx={{ marginLeft: 2, marginRight: 2 }}>
      <Stack spacing={0.5}>
        <Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 2, lg: 4 }}>
          {state.chartCards.map((chartCard) => {
            return (
              <Grid item xs={1} sm={1} md={1} lg={1} key={chartCard.id}>
                <ChartCard
                  chart={chartCard}
                  editable
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
          <EditChartCardDialog
            data={state.selectedChartCard}
            open={state.openEditChartDialog}
            onTitleChange={(payload) => {
              dispatch(setSelectedChartCardTitle(payload));
            }}
            onTypeChange={(payload) => {
              dispatch(setSelectedChartCardType(payload));
            }}
            onSaveClick={(payload) => {
              if (payload.id) {
                dispatch(updateChartCard(payload));
              } else {
                dispatch(createChartCard(payload));
              }
            }}
            onCancelClick={() => dispatch(closeEditChartDialog())}
          />
          {state.selectedChartCard && (
            <RemoveChartCardDialog
              data={state.selectedChartCard}
              open={state.openRemoveChartDialog}
              onSaveClick={(payload) => dispatch(removeChartCard(payload))}
              onCancelClick={(payload) =>
                dispatch(closeRemoveChartDialog(payload))
              }
            />
          )}
        </Grid>
      </Stack>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: 'fixed', bottom: 15, right: 15 }}
        onClick={onAddChartCardClick}
      >
        <Add />
      </Fab>
    </Box>
  );
};
