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
    import { loginSuccess } from '../../actions/userActions';
    import { useNavigate } from "react-router-dom";
    import { useDispatch, useSelector } from "react-redux";
    import { clearErrors , login } from '../../actions/userActions'
    import { toast } from 'react-toastify';
    import { Radio, RadioGroup } from "@mui/material";



    const names = [
        'Doctor',
        'Admin',
    ];

    export default function Login() {

        const navigate = useNavigate();
        const dispatch = useDispatch()



        const { user , success , error, loading , isAuthenticated} = useSelector((state) => state.user);

        console.log('user', user);
        console.log('success', success);
        // console.log('error');
        // console.log(error);
        // console.log('loading');
        // console.log(loading);
        console.log('login isAuthenticated: ', isAuthenticated);
        
        

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [role, setRole] = useState('');


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
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);
        // console.log(email);
        // console.log(password);
        dispatch(login(email , password , role))
        console.log("Login Form Submitted");
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
            toast.success(`Successfully Logged IN!`, {
            position: toast.POSITION.TOP_RIGHT
            });
        };


        console.log('person role is: ', role);


        useEffect(() => {
        if(error){
        
            showToastErrorMessage(error);
            dispatch(clearErrors())
        }
        if(success){
            showToastSuccessMessage();
            navigate('/home')
        }
        
    
        }, [dispatch , success , error]);
        // }, [dispatch , error]);
        //     if (error) {
        //     showToastErrorMessage(error);
            
        //     dispatch(clearErrors());
        // }
        
        // if(isAuthenticated){
        //     showToastSuccessMessage();
        //     navigate("/cattle");
        // }
        

        // }, [dispatch , user, isAuthenticated]);






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
            Log In
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
            value={role}
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
                sx={{ mt: 3, mb: 2 , backgroundColor:'green'}}
            >
                Log In
            </Button>
            <Grid container>
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
            </Grid>
            </Box>
        </Box>
        </Container>
    );
    }