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
import { forgotPassword, resetForgotPassword } from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";



const Resetpassword = () => {
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    const {loading , success } = useSelector((state) => state.forgotPassword);

    console.log(success);
    console.log(loading);
    
    const params = useParams()
    console.log(`params is : ${params.token}`);

    
const handleSubmit = (event) => {
    event.preventDefault();
    console.log(password);
    console.log(confirmpassword);
    if(password === confirmpassword){
        console.log(password);
        console.log(confirmpassword);
        dispatch(resetForgotPassword(params.token,password))
    }
    navigate('/login')
};
const showpasswords = () => {
    console.log(password);
    console.log(confirmpassword);
    
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
        Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        
        <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // Add an input name attribute for accessibility
        name="password"
        />
        <TextField
        label="ConfirmPassword"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={confirmpassword}
        onChange={(e) => setConfirmpassword(e.target.value)}
        name="confirmpassword"
        />
        
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Change Password
        </Button>

        </Box>
    </Box>
        <Button
        onClick={showpasswords}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 , backgroundColor:'green' }}
        >
            Show Password
        </Button>
    </Container>
)};

export default Resetpassword;
