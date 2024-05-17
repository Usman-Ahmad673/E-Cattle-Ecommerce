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
import { clearErrors, register } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Radio, RadioGroup } from "@mui/material";
import { toast } from "react-toastify";




const names = [
    'Doctor',
    'Admin',
];


export default function Signup() {


    const navigate = useNavigate();
    const dispatch = useDispatch()

    // const { isAuthenticated , error } = useSelector((state) => state.newUser)


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [personRole, setPersonRole] = useState('');


    const handleRoleChange = (e) => {
        setPersonRole(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
const handleSubmit = (e) => {
    e.preventDefault()
    
    const myForm = new FormData()
    myForm.set("name" , name)
    myForm.set("email" , email)
    myForm.set("password" , password)
    myForm.set("role" , personRole)
    dispatch(register(myForm))
    console.log("SignUp Form Submitted");
    // console.log({
    //     name: data.get(name),
    //     email: data.get(email),
    //     password: data.get(password),
    // });
};


const showToastErrorMessage = (err) => {
    toast.error(err, {
    position: toast.POSITION.TOP_RIGHT
    });
};
const showToastSuccessMessage = () => {
    toast.success(`Successfully SignUp!`, {
    position: toast.POSITION.TOP_RIGHT
    });
};

// useEffect(() => {
    // if(error){
    //     showToastErrorMessage(error)
    //     dispatch(clearErrors())
    // }
    // if(isAuthenticated){
    //     showToastSuccessMessage()
    //     navigate('/')
    // }
// },[dispatch , error ])
// },[dispatch , error , isAuthenticated])


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
        Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Names"
            name="name"
            value={name}
            onChange={handleNameChange}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={handleEmailChange}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
        />
        <RadioGroup
            row
            aria-label="role"
            name="role"
            value={personRole}
            onChange={handleRoleChange}
            >
                {names.map((name) => (
                <FormControlLabel
                    key={name}
                    value={name}
                    control={<Radio />}
                    label={name}
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
            sx={{ mt: 3, mb: 2 , backgroundColor:'green' }}
        >
            Sign In
        </Button>
        <Grid container>
            <Grid item>
            <Link href="/" variant="body2">
                {"Already Have an account? Login"}
            </Link>
            </Grid>
        </Grid>
        </Box>
    </Box>
    </Container>
);
}