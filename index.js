// import the modules/packages by using require
const express = require("express");
const path = require("path");
const sessions = require("express-session");
const dotenv = require("dotenv");

// load all the environment variables from .env file
dotenv.config();

// initializing the express environment
// express is already a package/module and we are getting everything in app const(like a json object)
const app = express();

// either use the default port or 8888
const port = process.env.PORT || "8888";

// we are communicating that this is the path where all the views are kept 
// setting up the path location for views to our template engine folder(views)
app.set("views",path.join(__dirname,"views"));

// conveying that we are using pug as our template engine
app.set("view engine","pug");


// generally, app.use(path,middleware)
// middleware are helper functions to handle requests and responses
// we use middleware for manipulation of data, error handling, authetication

// here, app.use() just uses one thing inside
// this extended: true means we want the url to be extended json object
// using the express.urlencoded and set the extended: true to see the extended version of url  
app.use(express.urlencoded({extended : true}));

// we want the response to be in json object
// using extended.json() middleware to parse/change the incoming response in json
app.use(express.json());

// providing the path to the static files
// using express.static() middleware to set/declare the path of the static files(i.e. styles.css, script.js etc.) as "public"
app.use(express.static(path.join(__dirname,"public")));



// using sessions middleware and defining the secret and name 
// setting the saveUnitialized and resave to false so that cookies are not stored everytime when the user logs in 
// whenever there is change, only then it is saved for operational efficiency
app.use(sessions({
    secret: process.env.SESSIONSECRET,
    name: "MyUniqueSessionId",
    saveUninitialized: false,
    resave: false,
    cookie: {}
}));


// mounting the page routes
// app.use(path,route mounting)
// everthing in the require goes under the path defined
// route mounting all the routes defined in components/routes(of their respective folders) to their designated path

app.use("/admin",require("./components/admin/routes"));
app.use("/experiences", require("./components/experience/routes"));
app.use("/projects", require("./components/project/routes.js"));



// setting up the server to listen to the port to handle request and response
app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`);
});


app.get("/", async(request, response) => {
    console.log(request.session);
    if(request.session.loggedIn){
        response.render("admin/admin", {username: request.session.user});
    }else{
        response.redirect("/admin/login");
    }
});
