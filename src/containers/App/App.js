import React from 'react';
import './App.css';
import { useState } from 'react';

import { Container, Paper, makeStyles } from '@material-ui/core';
import OrderForm from '../../components/OrderForm/OrderForm';
import ConclusionBlock from '../../components/ConclusionBlock/ConclusionBlock';



const useStyles = makeStyles((theme) => ({
  mainPaper: {
    padding: theme.spacing(3),
    margin: theme.spacing(3, 0),
  },
  payTypeBlock: {
    marginBottom: theme.spacing(3),
  }
}));
function App() {
  const [payType, setPayType] = useState("total");
  const [orderData, setOrderData] = useState({
    personsCount: 0,
    orderPrice: 0,
    percentageOfTeas: 0,
    delivery: 0,
  });
  const [personsPay, setPersonsPay] = useState([]);
  const [conclusion, setConclusion] = useState(null);
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Paper elevation={3} className={classes.mainPaper}>
        <OrderForm
          payType={payType}
          personsPay={personsPay}
          orderData={orderData}
          classes={classes}
          setPayType={setPayType}
          setConclusion={setConclusion}
          setPersonsPay={setPersonsPay}
          setOrderData={setOrderData}
        />
        <ConclusionBlock payType={payType} conclusion={conclusion} />
      </Paper>
    </Container>
  );
}

export default App;
