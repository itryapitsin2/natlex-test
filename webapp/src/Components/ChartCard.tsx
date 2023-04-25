import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Box from '@mui/material/Box';
import { EditChartCardDialog } from './EditChartCardDialog';
import { RemoveChartCardDialog } from './RemoveChartCardDialog';
import { ChartCard as ChartCardType } from '../Store/ChartSlice';

export interface ChartCardProps {
  editable?: boolean;
  chart: ChartCardType;
  onEditClick: (payload: ChartCardType) => void;
  onRemoveClick: (payload: ChartCardType) => void;
}

export const ChartCard = (props: ChartCardProps) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <HighchartsReact highcharts={Highcharts} options={props.chart} />
      </CardContent>
      <CardActions>
        <Box>
          {props.editable && (
            <>
              <Button
                size="small"
                onClick={() => props.onEditClick(props.chart)}
              >
                Edit
              </Button>
              <Button
                size="small"
                onClick={() => props.onRemoveClick(props.chart)}
              >
                Remove
              </Button>
            </>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};
