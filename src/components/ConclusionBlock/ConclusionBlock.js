import React from 'react';
import PersonConclusion from '../PersonConclusion/PersonConclusion';
import ConclusionForTotalBlock from '../ConclusionForTotalBlock/ConclusionForTotalBlock';
import { Grid, Typography } from '@material-ui/core';

export default function ConclusionBlock(props) {

    return (<>
        {
            props.conclusion ? (
                <Grid container direction="column" >
                    <Grid item>
                        <Typography variant="subtitle1">
                            Общая сумма: {props.conclusion.totalPrice} сом
                        </Typography>
                    </Grid>
                    {props.payType === "individ" ? (props.conclusion.personsPayResult.map(person => (
                        <PersonConclusion person={person} key={person.id} />
                    ))) : null
                    }
                    {
                        props.payType === "total" ? (
                            <>
                                <ConclusionForTotalBlock
                                    name="Количество человек"
                                    value={props.conclusion.personsCount}
                                    unit="чел."
                                />
                                <ConclusionForTotalBlock
                                    name="Каждый платит по"
                                    value={props.conclusion.everyPay}
                                    unit="сом"
                                />
                            </>
                        ) : null
                    }
                </Grid >
            ) : null
        }</>
    );
}
