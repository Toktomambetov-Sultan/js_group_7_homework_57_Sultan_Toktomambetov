import React from 'react';
import { Grid, Button, Input } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteIcon from '@material-ui/icons/Delete';

export default function PersonPayForm(props) {
    return (
        <Grid item >
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={6}>
                    <Input
                        placeholder="Имя"
                        inputProps={{ 'aria-label': 'description' }}
                        value={props.personPay.name}
                        onChange={(event) => props.changePersonsPayProp(event, props.personPay.id, "name")}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Input
                        inputProps={{ 'aria-label': 'description' }}
                        value={props.personPay.price}
                        endAdornment={<InputAdornment position="end">сом</InputAdornment>}
                        onChange={(event) => props.changePersonsPayProp(event, props.personPay.id, "price")}
                    />
                </Grid>
                <Grid item >
                    <Button color="primary" onClick={() => props.deletePersonPay(props.personPay.id)}>
                        <DeleteIcon />
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
