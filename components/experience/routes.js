const express = require("express");
const router = express.Router();

const { listExperience, showAddForm, addNewExperience, deleteExperienceById, getExperienceAPI } = require("./controller");

router.get("/list", listExperience);
router.get("/add", showAddForm);
router.post("/add/submit",addNewExperience);
router.get("/delete/submit", deleteExperienceById);
router.get("/api/list", getExperienceAPI);

module.exports = router;



