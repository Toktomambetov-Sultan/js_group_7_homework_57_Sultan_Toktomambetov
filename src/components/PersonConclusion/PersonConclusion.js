import React from 'react';
import { Grid, Typography } from '@material-ui/core';


export default function PersonConclusion(props) {
    return (
        <Grid item >
            <Typography variant="subtitle1">
                {props.person.name}: {props.person.price} сом
            </Typography>
        </Grid>
    );
}
