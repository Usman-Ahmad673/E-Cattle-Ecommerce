const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    // validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    // minLength: [8, "Password Cannot less 8 Letters"],
    // select: false,
  },
  role: {
    type: String,
    default: "doctor",
  },
  cattle: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cattle",
      },
      medicines: {
        name: {
          type: String,
        },
      },
      diseases: {
        name: {
          type: String,
        },
      }, // Array of diseases
      injections: {
        name: {
          type: String,
        },
      }, // Array of injections
    },
  ],
});

//JWT Token
doctorSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_KEY,
  });
};

module.exports = mongoose.model("Doctor", doctorSchema);
