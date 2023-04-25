import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { ChartCard } from '../Store/ChartSlice';
import Highcharts from 'highcharts';

interface DeleteChartCardDialogProps {
  open: boolean;
  data: ChartCard;
  onSaveClick: (payload: ChartCard) => void;
  onCancelClick: (payload: ChartCard) => void;
}

export const RemoveChartCardDialog = (props: DeleteChartCardDialogProps) => {
  return (
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Remove selected chart?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You are removing the chart from the page. You will be able to add the
          chart again later.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onCancelClick(props.data)}>Cancel</Button>
        <Button onClick={() => props.onSaveClick(props.data)} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
