const mongoose = require("mongoose");


// bringing db.js file (because of the connection string to the database)
const db = require("../../db");


// craeting the schema on how our document will look in a json object
const ExperienceSchema = new mongoose.Schema(
    {
        title: String,
        company: String,
        location: String,
        startYear: Number,
        endYear: Number,
        description: String

    }
);


// creating model so that it creates Experiences collection in database in mongodb atlas on the basis of ExperienceSchema
const Experience = mongoose.model("Experience", ExperienceSchema);


// forming a function initializeExperience which will create the collection with these initial data/enteries when the collection doesn't have any data/entry
async function initializeExperience(){
    const experienceData = [
        {
            title: "Math Instructor",
            company: "Mathnasium - Math Learning Centre",
            location: "North york Centre, Toronto, Ontario",
            startYear: 2024,
            endYear: 2025,
            description: "Teaching Mathematics to students of various age groups, preparing lesson plans, and providing personalized tutoring."

        },
        {
            title: "Trained Graduate Teacher (TGT) - Mathematics",
            company: "Partap Public School",
            location: "Ludhiana, Punjab, India",
            startYear: 2022,
            endYear: 2023,
            description: "Taught Mathematics to high school students, prepared teaching materials, and assisted students with their learning progress."

        }
    ];

    await Experience.insertMany(experienceData);

}


// forming function getExperience to get all the experience data
async function getExperience(){
    await db.connect();
    return await Experience.find({});
}


// forming an addExperience function to add experience data
async function addExperience(title,company,location,startYear,endYear,description){
    await db.connect();
    let newExperience = new Experience({
        title: title,
        company: company,
        location: location,
        startYear: startYear,
        endYear: endYear,
        description: description
    });

    let result = await newExperience.save();
    console.log(result);
}


// forming a deleteExperience function to delete experience by id
async function deleteExperience(id){
    await db.connect();
    let result = await Experience.deleteOne({_id : id});
    console.log(result);
}


// export all the functions to access them outside
module.exports = {
    initializeExperience,
    getExperience,
    addExperience,
    deleteExperience
}