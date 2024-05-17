const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Doctor = require("../model/doctorModel");
const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwtToken");
// const User = require("../model/userModel");

//ADD Doctor
exports.createDoctor = catchAsyncError(async (req, res, next) => {
  try {
    console.log('1');
    const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
      folder: "cattle-doctor-images",
      width: 150,
      crop: "scale",
    });

    console.log('2');
    const images = [];

    console.log('3');
    images.push({
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    });
    console.log('4');

    req.body.images = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
    console.log('5');
    console.log(req.body.images);
    console.log('6');
    console.log(req.body);
    console.log('7');
    const doctor = await Doctor.create(req.body);
    console.log('8');
    res.status(201).json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.log(`Error Ocurred While Creating Doctor: ${error}`);
  }
});

exports.loginDoctor = catchAsyncError(async (req, res, next) => {
  try {
    const reqq = req.body
    console.log(reqq);
    console.log(req.body.email);
    const user = await Doctor.findOne({ email: req.body.email });
    console.log(user.password);
    console.log(user.role);
    console.log(req.body.password);
    console.log(req.body.role);
    //   const isPasswordMatched = await bcrypt.compare(vpassword, user.password);
    //   if (!isPasswordMatched) {
    //     return next(new ErrorHandler("Invalid Email & Password", 401));
    //   }
    const isPasswordMatched =
      user.password != req.body.password || user.role != req.body.role;
    console.log(isPasswordMatched);
    if (isPasswordMatched) {
      return next(new ErrorHandler("Invalid Password & Role", 401));
    }
    console.log(user);
    // res.status(201).json({
    //   success: true,
    //   doctor,
    // });
    sendToken(user, 200, res);
  } catch (error) {
    console.log(`Error Ocurred While Login: ${error}`);
  }
});

//Logout User
exports.logoutDoctor = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  console.log("logged out");
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

exports.assignCattleToDoctor = catchAsyncError(async (req, res, next) => {
  try {
    const doctorId = req.params.id; // Assuming you get the doctor ID from the route parameters
    console.log("1");
    const cattleId = req.body.cattleId; // Assuming you send the cattle ID in the request body

    console.log("2");
    console.log(doctorId);
    console.log("3");
    console.log(cattleId);
    console.log("4");
    // Find the doctor by ID
    const doctor = await Doctor.findById(doctorId);

    console.log("5");
    console.log(doctor);
    console.log("6");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    console.log("7");

    // // Check if the cattle ID is valid (you may want to add more validation here)
    // if (!mongoose.Types.ObjectId.isValid(cattleId)) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'Invalid cattle ID',
    //     });
    // }
    console.log("8");
    console.log(cattleId);
    console.log("8.1");
    let isCattleAlreadyAssigned = false;
    for (let i = 0; i < doctor.cattle.length; i++) {
      console.log("Searching Cattle");
      console.log(doctor.cattle[i]._id.toString());
      console.log(cattleId);
      if (doctor.cattle[i]._id.toString() === cattleId) {
        console.log("CattleFound");
        isCattleAlreadyAssigned = true;
        break; // Exit the loop as soon as a match is found
      }
    }
    console.log("8.2");

    console.log(isCattleAlreadyAssigned);
    console.log("8.3");

    if (isCattleAlreadyAssigned) {
      return res.status(400).json({
        success: false,
        message: "Cattle is already assigned to this doctor",
      });
    }

    console.log("9");

    // Assign the cattle to the doctor
    doctor.cattle.push(cattleId);
    console.log("10");
    await doctor.save();
    console.log("11");

    res.status(201).json({
      success: true,
      doctor,
    });
    console.log("12");
  } catch (error) {
    console.log(`Error Occurred While Assigning Cattle to Doctor: ${error}`);
    res.status(500).json({
      success: false,
      error: "An error occurred while assigning cattle to the doctor",
    });
  }
});

//GET Doctors
exports.getDoctors = async (req, res) => {
  try {
    console.log("2");
    let doctors = await Doctor.find();

    const quantity = doctors.length;
    if (doctors) {
      res.status(200).json({
        success: true,
        quantity,
        doctors,
      });
    } else {
      doctors = "";
      res.status(200).json({
        success: true,
        quantity,
        doctors,
      });
    }
  } catch (error) {
    const err = error;
    console.log(`Error Ocurred : ${error}`);
    res.json({
      success: false,
      error: err,
    });
  }
};

//GET Single Doctor
exports.getDoctorById = async (req, res) => {
  try {
    // const id = req.params.id

    let doctor = await Doctor.findById(req.params.id);

    console.log(doctor);

    if (doctor) {
      res.status(200).json({
        success: true,
        doctor,
      });
    } else {
      doctor = "";
      res.status(200).json({
        success: true,
        doctor,
      });
    }
  } catch (error) {
    console.log(`Error Ocurred While Creating Doctor: ${error}`);
  }
};

//Update Single Doctor
exports.updateDoctorById = async (req, res) => {
  try {
    console.log("1");
    console.log(req.body);
    console.log("1");
    const doctor = await Doctor.findById(req.body.doctorId);
    console.log(doctor);
    console.log("2");
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    console.log("3");

    const updatedCattle = req.body.cattle[0]; // Assuming you want to update the first cattle in the array

    console.log("4");
    // Find the index of the cattle to update within the doctor.cattle array
    const index = doctor.cattle.findIndex(
      (cattle) => cattle._id.toString() === updatedCattle._id
    );
    console.log("5");

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Cattle not found for update",
      });
    }

    console.log("6");
    // Update the specific cattle object
    doctor.cattle[index] = updatedCattle;

    console.log("7");
    // Save the updated doctor
    const updatedDoctor = await doctor.save();

    console.log("8");
    res.status(200).json({
      success: true,
      isUpdated: true,
      doctor: updatedDoctor,
    });
    console.log("9");
  } catch (error) {
    console.log(`Error Occurred While Updating Doctor: ${error}`);
    res.status(500).json({
      success: false,
      error: "An error occurred while updating the doctor",
    });
  }
};

//Delete Single Doctor
exports.deleteDoctorById = async (req, res) => {
  try {
    let doctor = await Doctor.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Successfully Deleted Doctor",
      isDeleted: true,
    });
  } catch (error) {
    console.log(`Error Ocurred While Creating Doctor: ${error}`);
  }
};

//Get Doctors Via Search through Name
exports.searchDoctorByName = async (req, res) => {
  try {
    const { name } = req.query;
    console.log("1");
    let doctors = await Doctor.find({
      name: { $regex: name, $options: "i" },
    });
    console.log("2");
    const quantity = doctors.length;
    console.log("3");
    console.log("4");
    if (doctors) {
      res.status(200).json({
        success: true,
        quantity,
        doctors,
      });
      console.log("5");
    } else {
      doctors = "";
      res.status(200).json({
        success: true,
        doctors,
      });
    }
    console.log("6");
  } catch (error) {
    console.log(`Error Ocurred While Getting Doctor: ${error}`);
  }
};

//Get ALL Doctors
// exports.getDoctor = catchAsyncError(async (req,res) => {

//     const doctors = await Doctor.find()

//     res.status(200).json({
//         success:true,
//         doctors
//     })
// })

// exports.getDoctors = catchAsyncError(async (req, res, next) => {
//     try {
//         const doctors = await Doctor.find();

//         const doctorCount = await Doctor.countDocuments();

//         res.status(200).json({
//             success: true,
//             doctors,
//             doctorCount,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// });

// exports.getDoctorBySearch = catchAsyncError(async (req, res, next) => {
//     try {
//         const { city, name } = req.query;

//         // Query your database based on the search parameters
//         const doctors = await Doctor.find({
//             city: { $regex: city, $options: 'i' },
//             name: { $regex: name, $options: 'i' },
//         });

//         res.status(200).json({
//             success: true,
//             doctors,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

//Get Single Doctors
// exports.getSingleDoctor = catchAsyncError(async (req, res, next) => {
//     try {

//         const name = req.params.id;
//         console.log(`You seracged Doctor by ${name}`);
//         let doctor;

//         // Search by hospital name
//         if (!doctor || doctor.length === 0) {
//             doctor = await Doctor.find({ 'hospital.hospital_name': { $regex: name, $options: 'i' } });
//         }

//         if (!doctor || doctor.length === 0) {
//           // If no doctor found by hospital name, search by disease name
//             doctor = await Doctor.find({ 'disease.name': { $regex: name, $options: 'i' } });
//         }

//         if (!doctor || doctor.length === 0) {
//             if(name === 'surgeon'){
//                 // If no doctor found by hospital name, search by disease name
//                 doctor = await Doctor.find({ surgeon: true });
//                 }

//         }

//         if (!doctor || doctor.length === 0) {
//           // If no doctor found by hospital name, search by disease name
//             doctor = await Doctor.find({ 'services.name': { $regex: name, $options: 'i' } });
//         }

//         if (!doctor || doctor.length === 0) {
//           // If no doctor found by hospital name, search by disease name
//             doctor = await Doctor.find({ 'city': { $regex: name, $options: 'i' } });
//         }

//             if (!doctor || doctor.length === 0) {
//             // If no doctor found by disease name, search by symptoms name
//             doctor = await Doctor.find({ 'symptoms.name': { $regex: name, $options: 'i' } });
//             }

//             if (!doctor || doctor.length === 0) {
//             // If no doctor found by symptoms name, search by speciality
//             doctor = await Doctor.find({ 'speciality': { $regex: name, $options: 'i' } });
//             }

//             if (!doctor || doctor.length === 0) {
//             // If no doctor found by symptoms name, search by speciality
//             doctor = await Doctor.findById(req.params.id);
//             }

//             const count = doctor.length;

//             if (!doctor || doctor.length === 0) {
//             return next(new ErrorHandler(`The Doctor You Searched Does Not Exist in: ${req.params.id}`, 404));
//             }

//             res.status(200).json({
//             success: true,
//             doctor,
//             total: count,
//             });

//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     });

//Update Single Doctor
// exports.updateDoctor = catchAsyncError(async (req, res, next) => {
//     try {
//     let doctor = await Doctor.findById(req.params.id)

//     if(!doctor){
//         return next(
//             new ErrorHandler(`Doctor Doesnot Exist with ID: ${req.params.id}`,404)
//         )
//     }

//     doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body,
//                                         {
//                                             new:true,
//                                             runValidators:true,
//                                             useFindAndModify:false
//                                         })

//     res.status(200).json({
//         success:true,
//         doctor
//     })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// });

//Delete Doctor
// exports.deleteDoctor = catchAsyncError(async (req, res, next) => {
//     try {
//     const doctor = await Doctor.findByIdAndDelete(req.params.id)

//     if(!doctor){
//         return next(
//             new ErrorHandler(`Doctor Doesnot Exist with ID: ${req.params.id}`,404)
//         )
//     }

//     // await Doctor.remove()
//     else{
//         res.status(200).json({
//             success:true,
//             message:"Doctor Deleted Successfully"
//         })
//     }
// } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// });
