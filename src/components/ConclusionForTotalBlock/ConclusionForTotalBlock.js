import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default function ConclusionForTotalBlock(props) {
    return (
        <div>
            <Grid item>
                <Typography variant="subtitle1">
                    {props.name}: {props.value} {props.unit}
                </Typography>
            </Grid>
        </div>
    );
}
