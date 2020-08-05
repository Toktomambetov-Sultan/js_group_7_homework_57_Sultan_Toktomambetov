import React from 'react';
import './App.css';
import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Container, Typography, Grid, Paper, OutlinedInput, Button, makeStyles, Input } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';



const useStyles = makeStyles((theme) => ({
  mainPaper: {
    padding: theme.spacing(3),
    margin: theme.spacing(3, 0),
  },
  payTypeBlock: {
    marginBottom: theme.spacing(3),
  }
}));
const PAY_TYPES = [
  {
    text: "Поровну между всеми участниками.",
    type: "total"
  },
  {
    text: "Каждому индивидуально.",
    type: "individ",
  }
];
const orderDataDescriptions = {
  personsCount: { text: "Человек:", unit: "чел." },
  orderPrice: { text: "Сумма заказа:", unit: "сом" },
  percentageOfTeas: { text: "Процент чаявых:", unit: "%" },
  delivery: { text: "Доставка", unit: "сом" },
};

function App() {
  const [payType, setPayType] = useState("total");
  const [orderData, setOrderData] = useState({
    personsCount: 0,
    orderPrice: 0,
    percentageOfTeas: 0,
    delivery: 0,
  });
  const [personsPay, setPersonsPay] = useState([]);
  const changePayType = (event) => {
    const value = event.target.value;
    setOrderData({
      ...orderData,
      orderPrice: personsPay.reduce((acc, person) => acc + person.price, 0),
      personsCount: personsPay.length,
    });
    setPayType(value);
  };
  const changeOrderDataProp = (event, key) => {
    const value = event.target.value;
    if (isNaN(+value)) return;
    setOrderData({ ...orderData, [key]: value ? +value : 0 });
  };
  const changePersonsPayProp = (event, id, key) => {
    const copyPersonsPay = [...personsPay];
    const index = copyPersonsPay.findIndex(personPay => personPay.id === id);
    const copyPersonPay = { ...copyPersonsPay[index] };
    const value = event.target.value;
    console.log(key === "price" && isNaN(+value));
    if (key === "price" && isNaN(+value)) return;
    copyPersonPay[key] = key === "price" ? +value : value;
    copyPersonsPay[index] = copyPersonPay;
    setPersonsPay(copyPersonsPay);
  };
  const deletePersonPay = (id) => {
    const copyPersonsPay = [...personsPay];
    const index = copyPersonsPay.findIndex(personPay => personPay.id === id);
    copyPersonsPay.splice(index, 1);
    setPersonsPay(copyPersonsPay);
  };
  const addPersonPay = () => {
    setPersonsPay([...personsPay, { name: "", id: new Date().getTime(), price: 0 }]);
  };
  const getConclusion = () => {
    
  };
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Paper elevation={3} className={classes.mainPaper}>
        <form>
          <div className={classes.payTypeBlock}>
            <Typography variant="h4" gutterBottom>
              Сумма заказа считается:
          </Typography>
            <RadioGroup value={payType} onChange={(event) => changePayType(event)}>
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
          {payType === "individ" ? (

            <div>
              <Grid container direction="column" justify="center" spacing={3}>
                {personsPay.map(personPay => (
                  <Grid item key={personPay.id}>
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item xs={6}>
                        <Input
                          placeholder="Имя"
                          inputProps={{ 'aria-label': 'description' }}
                          value={personPay.name}
                          onChange={(event) => changePersonsPayProp(event, personPay.id, "name")}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Input
                          inputProps={{ 'aria-label': 'description' }}
                          value={personPay.price}
                          endAdornment={<InputAdornment position="end">сом</InputAdornment>}
                          onChange={(event) => changePersonsPayProp(event, personPay.id, "price")}
                        />
                      </Grid>
                      <Grid item >
                        <Button color="primary" onClick={() => deletePersonPay(personsPay.id)}>
                          <DeleteIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={3} alignItems="center">
                <Grid item>
                  <Button onClick={addPersonPay}>
                    <Icon style={{ color: green[500] }}>add_circle</Icon>
                  </Button>
                </Grid>
                <Grid item>
                  {personsPay.length ? null : (
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
              .keys(orderData)
              .slice(payType === "total" ? 0 : 2)
              .map(key => (
                <Grid item key={key}>
                  <Grid container alignItems="center" >
                    <Grid item xs={6}>
                      <Typography variant="h6" gutterBottom>{orderDataDescriptions[key].text}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <OutlinedInput
                        value={orderData[key]}
                        onChange={
                          (event) => changeOrderDataProp(event, key)
                        }
                        inputProps={{ 'aria-label': 'description' }}
                        endAdornment={<InputAdornment position="end">{orderDataDescriptions[key].unit}</InputAdornment>}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>

          <Button variant="contained" color="primary">
            Primary
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default App;
