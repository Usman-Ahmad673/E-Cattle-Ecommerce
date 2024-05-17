import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../actions/userActions";



const ForgotPassword = () => {
  
    const dispatch = useDispatch()
    
    const [email, setEmail] = useState('');

    const {message} = useSelector((state) => state.forgotPassword);

    console.log(message);
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    console.log(email);
    dispatch(forgotPassword(formData))
};

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
        <Typography component="h1" variant="h5" color='green'>
        Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        
        <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={handleEmailChange}
        // Add an input name attribute for accessibility
        name="email"
        />
        
        {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
        /> */}
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 , backgroundColor:'green' }}
        >
            Send Token
        </Button>

        </Box>
    </Box>
    </Container>
)};

export default ForgotPassword;
