var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true})); //this is a standard line to use when npm installing body parser
app.set("view engine", "ejs");

var campgrounds = [
        {name: "Salmon Creek", image: "https://static.pexels.com/photos/618848/pexels-photo-618848.jpeg"},
        {name: "Granite Hill", image: "https://static.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg"},
        {name: "Mountain Goat's Rest", image: "https://static.pexels.com/photos/176381/pexels-photo-176381.jpeg"}
    ];
        

app.get("/", function(req, res){
    res.render("landing");
});



app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;  //this is to get 
    var image = req.body.image; // the data from the form
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(rew, res){
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server has started!"); 
});