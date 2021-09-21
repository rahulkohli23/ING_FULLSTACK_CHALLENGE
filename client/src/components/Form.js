import React from "react";
import { Button, Box, TextField, Grid } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";

const initialForm = {
  username: "",
};

export const Form = () => {
  const [values, setvalues] = useState(initialForm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setvalues({
      username: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    axios({
      url: `/username/compliance-check/${values.username}`,
      method: "get",
    })
      .then(() => {
          console.log("THe provided UserName is compliant")
        alert("THe provided UserName is compliant");
      })
      .catch((error) => {
        console.error("API Error" + error);
        alert("There was an issue while connecting with the API");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" direction="column">
        <Box>
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
          <div>
            <Button color="primary" variant="contained" type="submit">
              Check compliance
            </Button>
          </div>
          </Grid>
        </Box>
      </Grid>
    </form>
  );
};
