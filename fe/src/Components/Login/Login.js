import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { loginSuccess } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userActions";
import { toast } from "react-toastify";
import { Radio, RadioGroup } from "@mui/material";

const names = ["doctor", "admin"];

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, success, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  console.log("user", user);
  console.log("success", success);
  console.log('error', error);
  console.log("login isAuthenticated: ", isAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if any of the required fields is empty
    if (email === "" || password === "" || role === "") {
      showToastErrorMessage("All fields are required");
      return;
    }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    // console.log(email);
    // console.log(password);

    dispatch(login(email, password, role));
    console.log("Login Form Submitted");
    console.log({
      email: email,
      password: password,
      role: role,
    });
    setPassword("");
  };

  const showToastErrorMessage = (err) => {
    toast.error(err, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastSuccessMessage = () => {
    toast.success(`Successfully Logged IN!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  //   console.log("person role is: ", role);

  useEffect(() => {
    if (error) {
      console.log(error);

      showToastErrorMessage(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      console.log('isAuthenticated Login page', isAuthenticated);

      showToastSuccessMessage();
      if (user.role === "admin") {
        navigate("/home");
      }
      if (user.role === "doctor") {
        navigate("/doctor-dashboard");
      }
    }
    else {
      console.log('isAuthenticated Login page', isAuthenticated);

      showToastErrorMessage('Invalid Login Details');
    }
  }, [dispatch, isAuthenticated, error]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color="green">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            // Add an input name attribute for accessibility
            name="email"
          />
          <TextField
            required
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <RadioGroup
            required
            row
            aria-label="role"
            name="role"
            value={role}
            onChange={handleRoleChange}
          >
            {names.map((name) => (
              <FormControlLabel
                key={name}
                value={name}
                control={<Radio />}
                label={name.toUpperCase()}
              />
            ))}
          </RadioGroup>
          {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "green" }}
          >
            Log In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="/password/forgot" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </Container>
  );
}
