import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route } from "react-router-dom";
import Profile from "../User/Profile";

const ProtectedRoute = ({ component: Component , ...rest }) => {
    
    const navigate = useNavigate();
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    
    return (
        <Fragment>
            
            {!loading && (
                <Route
                // {...rest} element={isAuthenticated ? <Profile /> : navigate("/login")} 
                {...rest}
                render={(props) => {
                    if (isAuthenticated === false) {
                    return navigate("/login")
                    }

                    return <Component {...props} />
                }}
                />
            )}
            
        </Fragment>
    );
};

export default ProtectedRoute;