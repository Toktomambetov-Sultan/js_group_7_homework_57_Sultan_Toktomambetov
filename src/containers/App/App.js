import React from 'react';
import './App.css';
import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Container, Typography, Grid, Paper, OutlinedInput, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    padding: theme.spacing(3),
    margin: theme.spacing(3,0),
  },
  payTypeBlock: {
    marginBottom: "10px",
  },
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
  const changeOrderDataProp = (event, key) => {
    const value = event.target.value;
    if (isNaN(+value)) return;
    setOrderData({ ...orderData, [key]: value ? +value : 0 });
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
            <RadioGroup value={payType} onChange={(event) => setPayType(event.target.value)}>
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
          <Grid container direction="column" justify="center" spacing={3}>
            {Object.keys(orderData).map(key => (
              <Grid item key={key}>
                <Grid container alignItems="center" >
                  <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>{orderDataDescriptions[key].text}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <OutlinedInput
                      value={+orderData[key] ? orderData[key] : ""}
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
