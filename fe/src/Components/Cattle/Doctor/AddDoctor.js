import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createDoctor } from "../../../actions/doctorActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { REGISTER_DOCTOR_RESET } from "../../../constants/doctorConstants";

const AddDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, error, loading } = useSelector((state) => state.newDoctor);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [button, setButton] = useState(false);

  const [disable, setDisable] = useState(false);

  const showToastSuccessMessage = () => {
    toast.success(`Successfully Created Doctor!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastErrorMessage = (e) => {
    toast.error(e, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    if (error) {
      showToastErrorMessage(error);
      dispatch(clearErrors());
    }
    //     if (!isAuthenticated) {
    //     navigate('/');
    //     }
    if (success) {
      showToastSuccessMessage();
      navigate("/home");
      // navigate('/cattle');
      dispatch({ type: REGISTER_DOCTOR_RESET });
    }
  }, [dispatch, navigate, success, error]);
  // }, [dispatch, error, success, isAuthenticated]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setDisable(!disable);

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("address", address);
    myForm.set("contact", contact);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    console.log(myForm);
    dispatch(createDoctor(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    const allowedTypes = ["image/jpeg", "image/png"];

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        };

        reader.readAsDataURL(file);
      } else {
        setButton(!button);
        showToastErrorMessage("Only JPEG and PNG images are allowed.");
      }
    });
  };

  return (
    <React.Fragment>
      <Container
        maxWidth="md"
        style={{
          margin: "2rem auto",
          border: "1px solid #ccc",
          padding: "1rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="div"
              style={{ color: "orange", width: "100%" }}
            >
              Add Doctor
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={10} sm={6} md={4}>
              <TextField
                required
                fullWidth
                name="name"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={10} sm={6} md={4}>
              <TextField
                required
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={10} sm={6} md={4}>
              <TextField
                required
                fullWidth
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                fullWidth
                type="file"
                name="images"
                // label="Images"
                variant="outlined"
                onChange={createProductImagesChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                fullWidth
                name="contact"
                label="Contact"
                variant="outlined"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                fullWidth
                name="address"
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                style={{ backgroundColor: "green" }}
                type="submit"
                variant="contained"
              >
                Add Doctor
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default AddDoctor;
