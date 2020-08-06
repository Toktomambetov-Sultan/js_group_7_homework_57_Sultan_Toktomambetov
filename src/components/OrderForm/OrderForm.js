import React from 'react';
import PersonPayForm from '../PersonPayForm/PersonPayForm';
import TotalPropsForm from '../TotalPropsForm/TotalPropsForm';
import { Grid, Typography, RadioGroup, FormControlLabel, Radio, Button, Icon } from '@material-ui/core';
import PAY_TYPES from '../../constants/PAY_TYPES';
import { green } from '@material-ui/core/colors';

export default function OrderForm(props) {

    const updateOrderData = () => {
        props.setOrderData({
            ...props.orderData,
            orderPrice: props.personsPay.reduce((acc, person) => acc + person.price, 0),
            personsCount: props.personsPay.length,
        });
    };
    const changePayType = (event) => {
        const value = event.target.value;
        props.setPayType(value);
        updateOrderData();
        props.setConclusion(null);
    };
    const changeOrderDataProp = (event, key) => {
        const value = event.target.value;
        if (isNaN(+value)) return;
        props.setOrderData({ ...props.orderData, [key]: value ? +value : 0 });
    };
    const changePersonsPayProp = (event, id, key) => {
        const copyPersonsPay = [...props.personsPay];
        const index = copyPersonsPay.findIndex(personPay => personPay.id === id);
        const copyPersonPay = { ...copyPersonsPay[index] };
        const value = event.target.value;
        if (key === "price" && isNaN(+value)) return;
        copyPersonPay[key] = key === "price" ? +value : value;
        copyPersonsPay[index] = copyPersonPay;
        props.setPersonsPay(copyPersonsPay);
    };
    const deletePersonPay = (id) => {
        const copyPersonsPay = [...props.personsPay];
        const index = copyPersonsPay.findIndex(personPay => personPay.id === id);
        copyPersonsPay.splice(index, 1);
        props.setPersonsPay(copyPersonsPay);
    };
    const addPersonPay = () => {
        props.setPersonsPay([...props.personsPay, { name: "", id: new Date().getTime(), price: 0 }]);
    };
    const updateConclusion = () => {
        const totalPrice = props.payType === "total" ?
            (props.orderData.orderPrice * (props.orderData.percentageOfTeas / 100 + 1) + props.orderData.delivery) :
            (
                props.personsPay.reduce((acc, person) => acc + person.price, 0)
                * (props.orderData.percentageOfTeas / 100 + 1)
                + props.orderData.delivery
            );
        if (props.payType === "individ" && !props.personsPay.length) { alert("Вы не добавили покупателей."); return; }
        if (props.payType === "total" && !props.orderData.personsCount) { alert("Вы не указали количество человек."); return; }
        if (!totalPrice) { alert("Вы не указали цену покупки."); return; }
        props.setConclusion(
            {
                totalPrice: Math.round(totalPrice),
                personsCount: props.orderData.personsCount,
                personsPayResult: props.personsPay.map(person => (
                    { name: person.name, price: Math.ceil(person.price * (props.orderData.percentageOfTeas / 100 + 1)) + props.orderData.delivery, id: person.id }
                )),
                everyPay: Math.round(totalPrice / props.orderData.personsCount),
            }
        );
    };

    return (
        <form>
            <div className={props.classes.payTypeBlock}>
                <Typography variant="h4" gutterBottom>
                    Сумма заказа считается:
                </Typography>
                <RadioGroup value={props.payType} onChange={(event) => changePayType(event)}>
                    {
                        PAY_TYPES.map(type => (
                            <FormControlLabel
                                key={type.type}
                                value={type.type}
                                control={<Radio />}
                                label={type.text}
                            />
                        ))
                    }
                </RadioGroup>
            </div>
            {props.payType === "individ" ? (

                <div>
                    <Grid container direction="column" justify="center" spacing={3}>
                        {props.personsPay.map(personPay => (
                            <PersonPayForm
                                deletePersonPay={deletePersonPay}
                                personPay={personPay}
                                key={personPay.id}
                                changePersonsPayProp={changePersonsPayProp}
                            />
                        ))}
                    </Grid>

                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <Button onClick={addPersonPay}>
                                <Icon style={{ color: green[500] }}>add_circle</Icon>
                            </Button>
                        </Grid>
                        <Grid item>
                            {props.personsPay.length ? null : (
                                <Typography variant="h6" gutterBottom>
                                    Введите имена
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </div>
            ) : null}
            <Grid container direction="column" justify="center" spacing={2}>
                {Object
                    .keys(props.orderData)
                    .slice(props.payType === "total" ? 0 : 2)
                    .map(key => (
                        <TotalPropsForm key={key} name={key} orderData={props.orderData} changeOrderDataProp={changeOrderDataProp} />
                    ))}
            </Grid>

            <Button
                variant="contained"
                color="primary"
                onClick={updateConclusion}
            >
                Расчитать
          </Button>
        </form>
    );
}
