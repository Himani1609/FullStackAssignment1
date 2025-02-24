const mongoose = require("mongoose");

const db = require("../../db");

const ProjectSchema = new mongoose.Schema(
    {
        name: String,
        summary: String,
        technology: String,
        status: String,
        timespan: String
    }
);

const Project = mongoose.model("Project", ProjectSchema);

async function initializeProject(){
    const projectData = [
        {
            name: "GlamGuide",
            summary: "It is a product comparison app that allows users to compare beauty and fashion items across different brands to find the best options based on price, features, and reviews.",
            technology: "HTML,CSS,JavaScript",
            status: "Completed",
            timespan: "NOv 2024 - Dec2024"
        },
        {
            name: "QuizMatics",
            summary: "An interactive mathematics learning platform designed for teachers and students, featuring quizzes in categorized lessons.",
            technology: "ASP.NET Core,C#,Entity Framework,SQL Server",
            status: "In Progress",
            timespan: "Jan 2025 - Present"
        }
    ];
    await Project.insertMany(projectData);
}


async function getProject(){
    await db.connect();
    return await Project.find({});
}


async function addProject(name,summary,technology,status,timespan){
    await db.connect();
    let newProject = new Project({
        name: name,
        summary: summary,
        technology: technology,
        status: status,
        timespan: timespan
    });

    return await newProject.save();
}

async function deleteProject(id){
    await db.connect();
    let result = await Project.deleteOne({_id : id});
    console.log(result);
}

module.exports = {
    initializeProject,
    getProject,
    addProject,
    deleteProject
}
