import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [passcode, setpasscode] = useState("");

  const handleLogin = () => {
    if (!!email && !!passcode) {
      console.log(email + " " + passcode);
      return;
    }
  };

  return (
    <div>
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "15px",
          borderRadius: "20px",
          background: "gray",
        }}
      >
        <CardContent>
          <div style={{ marginTop: "15px" }}>
            <TextField
              id="outlined-basic"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label="Email"
              variant="filled"
              size="small"
              color="error"
              fullWidth
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <TextField
              id="outlined-basic"
              type="password"
              onChange={(e) => {
                setpasscode(e.target.value);
              }}
              label="Password"
              variant="filled"
              size="small"
              color="error"
              fullWidth
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardActions>
      </Card>
      <Box style={{ marginTop: "20px" }}>
        <Typography>Don't have an account? </Typography>
      </Box>
    </div>
  );
};

export default Login;
