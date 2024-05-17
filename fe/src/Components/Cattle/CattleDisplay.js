import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteCattle,
  fetchCattle,
  updateCattle,
} from "../../actions/cattleActions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import {
  DELETE_CATTLE_RESET,
  UPDATE_CATTLE_RESET,
} from "../../constants/cattleConstants";
import { Link } from "react-router-dom";

const CattleDisplay = () => {
  const categoryOptions = [
    "Black Angus",
    "Sahiwal",
    "Red Sindhi",
    "Tharparkar",
    "Hariana",
    "Kankrej",
    "Gir",
    "Ongole",
  ];

  const dispatch = useDispatch();

  const { cattles, loading, error } = useSelector((state) => state.cattle);
  const { isUpdated, error: updateError } = useSelector(
    (state) => state.updCattle
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.delCattle
  );

  const showToastErrorMessage = (err) => {
    toast.error(err, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastDeleteError = (err) => {
    toast.error(err, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastUpdateErrorMessage = (err) => {
    toast.error(err, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastSuccessMessage = () => {
    toast.success(`Successfully Deleted Cattle!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastUpdateSuccessMessage = () => {
    toast.success(`Successfully Updated Cattle!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleUpdateCattle = (cattleId) => {
    const cattleLocalState = localState[cattleId];

    // Filter out fields with undefined or null values
    const updatedData = Object.fromEntries(
      Object.entries(cattleLocalState).filter(
        ([key, value]) => value !== undefined && value !== null
      )
    );

    // dispatch(updateCattle(cattleId , updatedData));
    if (updatedData.height || updatedData.width || updatedData.weight) {
      const size = {};

      // Add height to size if it exists
      console.log("updatedData.height: ", updatedData.height);
      if (updatedData.height) {
        size.height = updatedData.height;
      }

      // Add weight to size if it exists
      console.log("updatedData.weight: ", updatedData.weight);
      if (updatedData.weight) {
        size.weight = updatedData.weight;
      }

      // Add width to size if it exists
      console.log("updatedData.width: ", updatedData.width);
      if (updatedData.width) {
        size.width = updatedData.width;
      }

      // Add the size object to updatedData
      updatedData.size = size;
    }
    // console.log(localState);
    dispatch(updateCattle(cattleId, updatedData));
    setLocalState({});
    console.log("updated value of cattle : ", isUpdated);
  };

  const handleDeleteCattle = (cattleId) => {
    dispatch(deleteCattle(cattleId));
  };

  useEffect(() => {
    if (error) {
      showToastErrorMessage(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      showToastUpdateErrorMessage(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      showToastUpdateSuccessMessage();
      dispatch({ type: UPDATE_CATTLE_RESET });
    }

    if (deleteError) {
      showToastDeleteError(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      showToastSuccessMessage();
      dispatch({ type: DELETE_CATTLE_RESET });
    }
    dispatch(fetchCattle());
  }, [dispatch, error, isUpdated, updateError, isDeleted, deleteError]);

  const handleInputChange = (cattleId, field, value) => {
    // Update the local state for the specific cattle item
    setLocalState((prev) => ({
      ...prev,
      [cattleId]: {
        ...prev[cattleId],
        [field]: value,
      },
    }));
  };

  // const handleInputChange = (cattleId, field, value) => {
  //   setLocalState((prev) => ({
  //     ...prev,
  //     [cattleId]: {
  //       ...prev[cattleId],
  //       [field]: value,
  //     },
  //     // Add this line to remove other cattle data
  //     ...Object.fromEntries(Object.entries(prev).filter(([key]) => key === cattleId)),
  //   }));
  // };

  const [localState, setLocalState] = useState({});

  // console.log(localState);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        bgcolor: "rgb(2,0,36)",
        background:
          "linear-gradient(154deg, rgba(2,0,36,0.7399334733893557) 0%, rgba(83,205,38,1) 55%, rgba(255,255,255,1) 100%)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "white" }}
            >
              Age
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "white" }}
            >
              Image
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "white" }}
            >
              Size
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "white" }}
            >
              Category
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "white" }}
            >
              Feed
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "white" }}
            >
              Cost
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "white" }}
            >
              Milk
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "white" }}
            >
              Vaccination Date
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "white" }}
            >
              Pregnancy Date
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "white" }}
            >
              Calving Date
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "white" }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(cattles) && cattles.length > 0 ? (
            cattles.map((cattleItem) => (
              <TableRow key={cattleItem._id}>
                <TableCell>
                  <TextField
                    fullWidth
                    name={`age-${cattleItem._id}`}
                    label="Age"
                    variant="outlined"
                    value={
                      localState[cattleItem._id]?.age || cattleItem.age || ""
                    }
                    sx={{ width: "5rem" }}
                    onChange={(e) =>
                      handleInputChange(cattleItem._id, "age", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <img
                    style={{ borderRadius: "10%" }}
                    src={cattleItem.images[0].url}
                    alt="Cattle-Img"
                  />
                </TableCell>
                <TableCell>
                  {/* Assuming you want separate fields for height, width, and weight */}
                  <TextField
                    fullWidth
                    name="height"
                    label="Height"
                    variant="outlined"
                    value={
                      localState[cattleItem._id]?.height ||
                      cattleItem.size?.height ||
                      "N/A"
                    }
                    sx={{ width: "5rem", marginBottom: "0.5rem" }}
                    onChange={(e) =>
                      handleInputChange(
                        cattleItem._id,
                        "height",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    fullWidth
                    name="width"
                    label="Width"
                    variant="outlined"
                    value={
                      localState[cattleItem._id]?.width ||
                      cattleItem.size?.width ||
                      "N/A"
                    }
                    sx={{ width: "5rem", marginBottom: "0.5rem" }}
                    onChange={(e) =>
                      handleInputChange(cattleItem._id, "width", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    name="weight"
                    label="Weight"
                    variant="outlined"
                    value={
                      localState[cattleItem._id]?.weight ||
                      cattleItem.size?.weight ||
                      "N/A"
                    }
                    sx={{ width: "5rem", marginBottom: "0.5rem" }}
                    onChange={(e) =>
                      handleInputChange(
                        cattleItem._id,
                        "weight",
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="category"
                    select
                    label="Category"
                    variant="outlined"
                    // value={cattleItem.category}
                    value={
                      localState[cattleItem._id]?.category ||
                      cattleItem.category ||
                      ""
                    }
                    sx={{ width: "10rem" }}
                    onChange={(e) =>
                      handleInputChange(
                        cattleItem._id,
                        "category",
                        e.target.value
                      )
                    }
                  >
                    <MenuItem
                      value={
                        localState[cattleItem._id]?.category ||
                        cattleItem.category ||
                        ""
                      }
                      disabled={true}
                    >
                      {localState[cattleItem._id]?.category ||
                        cattleItem.category ||
                        ""}
                    </MenuItem>
                    {categoryOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="feed"
                    label="Feed"
                    variant="outlined"
                    value={
                      localState[cattleItem._id]?.feed || cattleItem.feed || ""
                    }
                    sx={{ width: "5rem" }}
                    onChange={(e) =>
                      handleInputChange(cattleItem._id, "feed", e.target.value)
                    }
                    // handle onChange accordingly if you want to edit this field
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="cost"
                    label="Cost"
                    variant="outlined"
                    value={
                      localState[cattleItem._id]?.cost || cattleItem.cost || ""
                    }
                    sx={{ width: "5rem" }}
                    onChange={(e) =>
                      handleInputChange(cattleItem._id, "cost", e.target.value)
                    }
                    // handle onChange accordingly if you want to edit this field
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="milk"
                    label="Milk"
                    variant="outlined"
                    value={localState[cattleItem._id]?.milk || cattleItem.milk}
                    sx={{ width: "5rem" }}
                    onChange={(e) =>
                      handleInputChange(cattleItem._id, "milk", e.target.value)
                    }
                    // handle onChange accordingly if you want to edit this field
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="date"
                    name="vaccinationDate"
                    label="Vaccination Date"
                    variant="outlined"
                    value={new Date(
                      localState[cattleItem._id]?.vaccinationDate ||
                        cattleItem.vaccinationDate
                    )
                      .toLocaleDateString("en-GB")
                      .split("/")
                      .reverse()
                      .join("-")}
                    sx={{ width: "8rem" }}
                    onChange={(e) =>
                      handleInputChange(
                        cattleItem._id,
                        "vaccinationDate",
                        e.target.value
                      )
                    }
                    // handle onChange accordingly if you want to edit this field
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="date"
                    name="pregnancyDate"
                    label="Pregnancy Date"
                    variant="outlined"
                    value={new Date(
                      localState[cattleItem._id]?.pregnancyDate ||
                        cattleItem.pregnancyDate
                    )
                      .toLocaleDateString("en-GB")
                      .split("/")
                      .reverse()
                      .join("-")}
                    sx={{ width: "8rem" }}
                    onChange={(e) =>
                      handleInputChange(
                        cattleItem._id,
                        "pregnancyDate",
                        e.target.value
                      )
                    }
                    // handle onChange accordingly if you want to edit this field
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="date"
                    name="calvingDate"
                    label="Calving Date"
                    variant="outlined"
                    value={new Date(
                      localState[cattleItem._id]?.calvingDate ||
                        cattleItem.calvingDate
                    )
                      .toLocaleDateString("en-GB")
                      .split("/")
                      .reverse()
                      .join("-")}
                    sx={{ width: "8rem" }}
                    onChange={(e) =>
                      handleInputChange(
                        cattleItem._id,
                        "calvingDate",
                        e.target.value
                      )
                    }
                    // handle onChange accordingly if you want to edit this field
                  />
                </TableCell>
                <TableCell>
                  <Link to={`/cattle/${cattleItem._id}`}>
                    <Button variant="contained" color="primary">
                      Details
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDeleteCattle(cattleItem._id)}
                    variant="contained"
                    color="secondary"
                    sx={{ marginTop: "5px" }}
                  >
                    Delete
                  </Button>
                  <Button
                    disabled={
                      Object.keys(localState).length !== 0 ? false : true
                    }
                    onClick={() => handleUpdateCattle(cattleItem._id)}
                    variant="contained"
                    color="warning"
                    sx={{ marginTop: "5px" }}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No Cattles data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CattleDisplay;
