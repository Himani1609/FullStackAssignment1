const experienceModel = require("./model");


// creating getExperience to list all the experiences which is in experience.pug
const listExperience = async(request,response) => {

    let experienceData = await experienceModel.getExperience();

    if(!experienceData.length){
        await experienceModel.initializeExperience();
        experienceData = experienceModel.getExperience();
    }

    response.render("experiences/list", {experience : experienceData});
};


const getExperienceAPI = async(request,response) => {
    let experientList = await experienceModel.getExperience();
    response.json(experientList);
}

// creating showAddForm to show the add form which is in add.pug
// Redirect to the experiences list page after successful submission
const showAddForm = async(request,response) => {
    response.render("experiences/add", );
}


// creating experienceInForm to submit the data inputted in the form
const addNewExperience = async(request,response) => {

    let result = await experienceModel.addExperience(request.body.title,
        request.body.company,
        request.body.location,
        request.body.startYear,
        request.body.endYear,
        request.body.description);
    console.log(result);
    response.redirect("../list");
}


// creating deleteExperienceById to delete the experience
const deleteExperienceById = async(request,response) => {
    let id = request.query.expId;
    await experienceModel.deleteExperience(id);
    console.log(id);
    response.redirect("../list");
}


module.exports = {
    listExperience,
    showAddForm,
    addNewExperience,
    deleteExperienceById,
    getExperienceAPI
};