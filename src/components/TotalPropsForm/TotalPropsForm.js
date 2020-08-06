import React from 'react';
import orderDataDescriptions from '../../constants/orderDataDescriptions';
import { Grid, Typography, OutlinedInput, InputAdornment } from '@material-ui/core';


export default function TotalPropsForm(props) {
    return (
        <Grid item>
            <Grid container alignItems="center" >
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>{orderDataDescriptions[props.name].text}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <OutlinedInput
                        value={props.orderData[props.name]}
                        onChange={
                            (event) => props.changeOrderDataProp(event, props.name)
                        }
                        inputProps={{ 'aria-label': 'description' }}
                        endAdornment={<InputAdornment position="end">{orderDataDescriptions[props.name].unit}</InputAdornment>}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}
