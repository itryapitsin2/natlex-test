import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Button,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { ChartCard } from '../Store/ChartSlice';

interface EditChartCardDialogProps {
  open: boolean;
  data: ChartCard | null;
  onSaveClick: (payload: ChartCard) => void;
  onCancelClick: () => void;
  onTitleChange: (e: string) => void;
  onTypeChange: (e: string) => void;
}

export const EditChartCardDialog = (props: EditChartCardDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Modify Chart</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To modify this chart, please enter title and type here.
        </DialogContentText>
        <Stack spacing={2}>
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            value={props.data?.title.text}
            onChange={(e) => {
              props.onTitleChange(e.target.value);
            }}
          />

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Chart Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Chart Type"
              value={props.data?.chart.type}
              onChange={(e) => props.onTypeChange(e.target.value)}
            >
              <MenuItem value="bar">Bar</MenuItem>
              <MenuItem value="column">Column</MenuItem>
              <MenuItem value="spline">Spline</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            props.onCancelClick();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (props.data) {
              props.onSaveClick(props.data);
            }
          }}
          disabled={!props.data}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
