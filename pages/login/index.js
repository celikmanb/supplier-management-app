import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { AES } from "crypto-js";
import { getJwtSecretKey } from "../../lib/auth";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    let temp2 = getJwtSecretKey()
    const decoder = new TextDecoder("utf-8");
    let temp3 = decoder.decode(temp2)
    console.log({
      email: temp3,
      password: data.get("password"),
    });
    let hashPassword = AES.encrypt(data.get("password"), temp3).toString();
    console.log({
      email: data.get("email"),
      password: hashPassword,
    });
    await axios.post("/api/login", {
      username: data.get("email"),
      password: hashPassword,
    }).then(res => {
      console.log("login res", res);
      const nextUrl = searchParams.get("next");
      console.log("deneme12 ", nextUrl ?? "/");
      router.push(nextUrl ?? "/");
      router.refresh();
    }).catch(err => {
      alert("login failed.")
      console.log("login err", err);
    })

    /* await axios.put("/api/login", {
      email: data.get("email"),
      password: hashPassword,
      role: '6521277f63836c4c4499d291'
    }).then(res => {
      console.log("login res", res);
    }).catch(err => {
      console.log("login err", err);
    }) */
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: '#adbfd5'
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}