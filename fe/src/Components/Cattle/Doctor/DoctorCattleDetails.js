import {
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { updateDoctor } from "../../../actions/doctorActions";
import { toast } from "react-toastify";
import { UPDATE_DOCTOR_RESET } from "../../../constants/doctorConstants";
import { getCattleDetails } from "../../../actions/cattleActions";

const CattleDetails = ({ cattle, id }) => {
  console.log("cattle");
  console.log(cattle);
  const dispatch = useDispatch();
  const { cattle: cat } = useSelector((state) => state.cattleDetail);

  const [medicines, setMedicines] = useState(cattle ?.medicines ?.name);
  const [injections, setInjections] = useState(cattle ?.injections ?.name);
  const [diseases, setDiseases] = useState(cattle ?.diseases ?.name);
  console.log(`Cattle Details : ${cat}`);
  const [cattl, setCattl] = useState([
    {
      _id: cattle._id,
      medicines: {
        name: medicines,
      },
      injections: {
        name: injections,
      },
      diseases: {
        name: diseases,
      },
    },
  ]);

  const { isUpdated, success } = useSelector((state) => state.updDoctor);

  const handleUpdateCattle = (cattleId) => {
    const formData = new FormData();
    formData.set("cattleId", cattleId); // Set the cattleId in the FormData
    formData.set("medicines", medicines); // Set the medicines in the FormData
    formData.set("injections", injections); // Set the injections in the FormData
    formData.set("diseases", diseases); // Set the diseases in the FormData
    // console.log(id);
    // console.log(cattl);
    dispatch(updateDoctor(id, cattl));
    // Implement your update cattle logic here
    console.log("Medicine: ", medicines);
    console.log("Injection: ", injections);
    console.log("Disease: ", diseases);
    console.log(`Update cattle with ID ${cattleId}`);
  };

  const handleAddMedicine = () => {
    setMedicines(medicines);
    setCattl([
      {
        _id: cattle._id,
        medicines: {
          name: medicines,
        },
        injections: {
          name: injections,
        },
        diseases: {
          name: diseases,
        },
      },
    ]);
  };

  const handleAddInjection = () => {
    setInjections(injections);
    setCattl([
      {
        _id: cattle._id,
        medicines: {
          name: medicines,
        },
        injections: {
          name: injections,
        },
        diseases: {
          name: diseases,
        },
      },
    ]);
  };

  const handleAddDisease = () => {
    setDiseases(diseases);
    setCattl([
      {
        _id: cattle._id,
        medicines: {
          name: medicines,
        },
        injections: {
          name: injections,
        },
        diseases: {
          name: diseases,
        },
      },
    ]);
  };

  const showToastErrorMessage = (err) => {
    toast.error(err, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastSuccessMessage = () => {
    toast.success(`Successfully Updated Cattle`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    if (isUpdated) {
      showToastSuccessMessage();
      dispatch({ type: UPDATE_DOCTOR_RESET });
    }
  }, [isUpdated, dispatch]);
  useEffect(() => {
    dispatch(getCattleDetails(cattle._id));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Grid item xs={12} md={6} lg={4}>
        <Typography variant="h5" color="red">
          Cattle ID: {cattle._id}
        </Typography>

        {/* <img src={cat.images[0].url} alt="Cattle" /> */}
        {/* <ImageList cols={3} rowHeight={200}>
          <ImageListItem key={cat.images[0]._id}> */}
        {/* {cat.images.length > 0 ? (
          <img src={cat.images[0].url} alt="Cattle" />
        ) : (
          <img src="No image Available" alt="Cattle" />
        )} */}
        {/* </ImageListItem>
        </ImageList> */}

        <Typography variant="h6" color="green">
          Medicines:
        </Typography>
        {cattle ?.medicines ?.name === "" ? (
          ""
        ) : (
            <ul>
              <li>{cattle ?.medicines ?.name}</li>
            </ul>
          )}

        <Typography variant="h6" color="green">
          Injections:
        </Typography>
        {cattle ?.injections ?.name === "" ? (
          ""
        ) : (
            <ul>
              <li>{cattle ?.injections ?.name}</li>
            </ul>
          )}

        <Typography variant="h6" color="green">
          Diseases:
        </Typography>
        {cattle ?.diseases ?.name === "" ? (
          ""
        ) : (
            <ul>
              <li>{cattle ?.diseases ?.name}</li>
            </ul>
          )}

        <Typography variant="h6" color="green">
          Add Medicine:
        </Typography>
        <Grid item>
          <TextField
            // fullWidth
            name="name"
            label="Add Medicine"
            variant="outlined"
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
          />
          <Button
            sx={{ width: "4rem", padding: "0.9rem" }}
            variant="contained"
            onClick={handleAddMedicine}
          >
            Add
          </Button>
        </Grid>
        <Typography variant="h6" color="green">
          Add Injection:
        </Typography>
        <Grid item>
          <TextField
            // fullWidth
            name="name"
            label="Add Injection"
            variant="outlined"
            value={injections}
            onChange={(e) => setInjections(e.target.value)}
          />
          <Button
            sx={{ width: "4rem", padding: "0.9rem" }}
            variant="contained"
            onClick={handleAddInjection}
          >
            Add
          </Button>
        </Grid>
        <Typography variant="h6" color="green">
          Add Disease:
        </Typography>
        <Grid item>
          <TextField
            // fullWidth
            name="name"
            label="Add Disease"
            variant="outlined"
            value={diseases}
            onChange={(e) => setDiseases(e.target.value)}
          />
          <Button
            sx={{ width: "4rem", padding: "0.9rem" }}
            variant="contained"
            onClick={handleAddDisease}
          >
            Add
          </Button>
        </Grid>
        <Button
          sx={{ marginTop: "2rem" }}
          variant="text"
          onClick={() => handleUpdateCattle(cattle._id)}
        >
          Update Cattle
        </Button>
        <hr />
      </Grid>
    </React.Fragment>
  );
};

export default CattleDetails;
