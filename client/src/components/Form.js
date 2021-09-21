import React from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";

const initialForm = {
  username: "",
};

export const Form = () => {
  const [values, setvalues] = useState(initialForm);
//   const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { value } = e.target;
    setvalues({
      username: value,
    });
  };

  const reset = (e) => {
      setvalues({
          username: initialForm.username
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    // setLoading(true);
    axios({
      url: `/username/compliance-check/${values.username}`,
      method: "get",
    })
      .then(() => {
          console.log("username is compliant")
        alert("username is compliant");
        // setLoading(false);
      })
      .catch((error) => {
        console.error("API Error" + error.response.status);
        if(error.response.status===400){
            alert("username is Not Compliant !")
        }
        else{
            alert("Error while connecting with the backend Server")
        }
        // setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" spacing="1" direction="column">
          <h1>Check the Compliance of your username</h1>
          <Grid item>
            <TextField
              required
              id="username-input"
              label="username"
              variant="outlined"
              type="text"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <Button color="primary" variant="outlined" type="submit">
              Check compliance
            </Button>
          </Grid>
      </Grid>
    </form>
  );
};
