const projectModel = require("./model");

const listProject = async(request,response) => {
    let projectData = await projectModel.getProject();
    if(!projectData.length){
        await projectModel.initializeProject();
        projectData = projectModel.getProject();
    }
    response.render("projects/list",{project : projectData});
};


const getProjectAPI = async(request,response) => {
    let projectList = await projectModel.getProject();
    response.json(projectList);
}


const showAddForm = async(request,response) => {
    response.render("projects/add");
}; 


const addNewProject = async(request,response) =>{
    let result = await projectModel.addProject(
        request.body.name,
        request.body.summary,
        request.body.technology,
        request.body.status,
        request.body.timespan
    );

    console.log(result);
    response.redirect("../list"); //we are on projects/add/submit so we have to go back to list
};



const deleteProjectById = async(request,response) =>{
    let id = request.query.projId;
    await projectModel.deleteProject(id);
    console.log(id);
    response.redirect("../list");
};



module.exports = {
    listProject,
    showAddForm,
    addNewProject,
    deleteProjectById,
    getProjectAPI
}