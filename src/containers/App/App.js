import React from 'react';
import './App.css';
import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Container, Typography } from '@material-ui/core';

function App() {
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
  const [payType, setPayType] = useState("total");
  return (
    <Container maxWidth="md">
      <form>
        <FormControl component="fieldset">
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
        </FormControl>
        
      </form>
    </Container>
  );
}

export default App;
