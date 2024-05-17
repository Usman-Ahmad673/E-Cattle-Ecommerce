    import React, { Fragment, useState, useEffect } from "react";
    import "./UpdatePassword.css";
    import Loader from "../layout/Loader/Loader";
    import { useDispatch, useSelector } from "react-redux";
    import { clearErrors, updatePassword } from "../../actions/userActions";
    import { useAlert } from "react-alert";
    import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
    import MetaData from "../layout/MetaData";
    import LockOpenIcon from "@mui/icons-material/LockOpen";
    import LockIcon from "@mui/icons-material/Lock";
    import VpnKeyIcon from "@mui/icons-material/VpnKey";
    // import { TextField , InputAdornment , IconButton } from '@material-ui/core';
    // import { Visibility, VisibilityOff } from '@mui/icons-material';

    import { useNavigate } from "react-router-dom";
    
    
    const UpdatePassword = () => {


        // const [showPassword, setShowPassword] = useState(false);
        // const [showNewPassword, setShowNewPassword] = useState(false);

        // const handleClickShowPassword = () => {
        //     setShowPassword(!showPassword);
        //     };
        
        //     const handleMouseDownPassword = (event) => {
        //     event.preventDefault();
        // };
        // const handleClickShowNewPassword = () => {
        //     setShowNewPassword(!showNewPassword);
        //     };
        
        //     const handleMouseDownNewPassword = (event) => {
        //     event.preventDefault();
        // };
    

        const navigate = useNavigate()
        const dispatch = useDispatch();
        const alert = useAlert();

        const { error, isUpdated, loading } = useSelector((state) => state.profile);

        const [oldPassword, setOldPassword] = useState("");
        const [newPassword, setNewPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");

        const updatePasswordSubmit = (e) => {
            e.preventDefault();

            const myForm = new FormData();

            myForm.set("oldPassword", oldPassword);
            myForm.set("newPassword", newPassword);
            myForm.set("confirmPassword", confirmPassword);

            dispatch(updatePassword(myForm));
        };

        useEffect(() => {
            if (error) {
            alert.error(error);
            dispatch(clearErrors());
            }

            if (isUpdated) {
            alert.success("Profile Updated Successfully");

            navigate("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
            }
        }, [dispatch, error, alert, navigate, isUpdated]);

        return (
            <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                <MetaData title="Change Password" />
                <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                    <h2 className="updatePasswordHeading">Update Profile</h2>

                    <form
                        className="updatePasswordForm"
                        onSubmit={updatePasswordSubmit}
                    >
                        <div className="loginPassword">
                        <VpnKeyIcon />
                        <input 
                            // type={showPassword ? 'text' : 'password'}
                            type="password"
                            placeholder="Old Password"
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        {/* <TextField
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Old Password"
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                ),
                            }}
                        /> */}

                        </div>

                        <div className="loginPassword">
                        <LockOpenIcon />
                        <input
                            type="password"
                            placeholder="New Password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {/* <TextField className="tf"
                            // type={password ? 'text' : 'password'}
                            type="password"
                            placeholder="New Password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="center">
                                    <IconButton
                                    onClick={handleClickShowNewPassword}
                                    onMouseDown={handleMouseDownNewPassword}
                                    >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                ),
                            }}
                        /> */}

                        </div>
                        <div className="loginPassword">
                        <LockIcon />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        </div>
                        <input
                        type="submit"
                        value="Change"
                        className="updatePasswordBtn"
                        />
                    </form>
                    </div>
                </div>
                </Fragment>
            )}
            </Fragment>
        );
    };

    export default UpdatePassword;