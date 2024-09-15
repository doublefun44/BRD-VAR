import express from "express";
import bodyParser from "body-parser";
import fs from "fs"
// import { connected } from "process";

const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true}))

let data
app.get("/", (req, res) => {
    res.render("index.ejs", {projects:data});
});

app.post("/post", (req, res) => {
    const projectName = req.body["projectName"];
    const requestedDate = req.body["requestDate"];  
    res.render("varside.ejs", {
        pName: projectName,
        rDate: requestedDate,
    })
    // try to log in the file record
    var projectList = {
        "project": projectName,
        "requested": requestedDate
    };
    var projectstring = JSON.stringify(projectList);
    fs.writeFile("project.json", projectstring, function(err, result) {
        if(err) console.log('error', err);
    });
    })

// after var input dates
app.post("/submit", (req, res) => {
    const varComitship = req.body["commitship"];
    const varComitdeli = req.body["commitdeliver"];
    const varReason = req.body["reasonOfVar"];
    // var projectList = {
    //     "comShip": varComitship,
        // };
    // var projectstring = JSON.stringify(projectList);
    // fs.writeFile("project.json", projectstring, function(err, result) {
    //     if(err) console.log('error', err);
    // });

    // read JSON data
    const jsonData = fs.readFileSync("./project.json", "utf8")
    data = JSON.parse(jsonData);
    data = {...data, "commitship": varComitship,"commitdeliver": varComitdeli,"reasons":varReason};
    
    var updatedProject = JSON.stringify(data)
   
//     let newData = {
//         "commitship": varComitship,
//         "commitdeliver": varComitdeli,
//     }
//     data.newdate = newData;
//     var updateJSON = JSON.stringify(data);
    fs.writeFile('project.json', updatedProject, err => {
    if(err) throw err;
    console.log("New data added");
});     

    // console.log(data)
    res.render("update.ejs", {
        projects: data
    })

})



app.listen((port), ()=> {
    console.log(`Server is running at port ${port}.`);
});