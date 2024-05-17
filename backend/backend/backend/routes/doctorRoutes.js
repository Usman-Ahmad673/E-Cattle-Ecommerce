const express = require("express");
const {
  createDoctor,
  getDoctors,
  searchDoctorByName,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
  assignCattleToDoctor,
  loginDoctor,
  logoutDoctor,
} = require("../controller/doctorController");
const { isAuthenticatedUser } = require("../middleware/Auth");

const router = express.Router();

router.route("/doctor/new").post(createDoctor);
router.route("/doctor/login").post(loginDoctor);
router.route("/doctor/logout").get(logoutDoctor);
router.route("/doctor/addcattle/:id").put(assignCattleToDoctor);
router.route("/doctors").get(getDoctors);
router.route("/doctor").get(searchDoctorByName);
// router.route('/doctor/:id').get(getDoctorById).put(updateDoctorById).delete(deleteDoctorById)
router.route("/doctor/:id").get(getDoctorById).delete(deleteDoctorById);
router.route("/doctor").put(updateDoctorById);
// router.route('/doctor/new').post(isAuthenticatedUser , createDoctor)
// router.route('/doctors').get(isAuthenticatedUser , getDoctors)
// router.route('/doctor').get(isAuthenticatedUser , searchDoctorByName)
// router.route('/doctor/:id').get(isAuthenticatedUser , getDoctorById).put(isAuthenticatedUser , updateDoctorById).delete(isAuthenticatedUser , deleteDoctorById)
module.exports = router;
