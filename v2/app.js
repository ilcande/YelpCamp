var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB     = require("./seeds")

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true})); //this is a standard line to use when npm installing body parser
app.set("view engine", "ejs");

// SCHEMA SETUP

// Campground.create(
//         {
//             name: "Granite Hill", 
//             image:"https://static.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg",
//             description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//         }, function(err, campground){
//             if(err){
//                 console.log(err);
//             } else {
//               console.log("NEWLY CREATED CAMPGROUND: ");
//               console.log(campground);
//             }
//         });

var campgrounds = [
        {name: "Salmon Creek", image: "https://static.pexels.com/photos/618848/pexels-photo-618848.jpeg"},
        {name: "Granite Hill", image: "https://static.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg"},
        {name: "Mountain Goat's Rest", image: "https://static.pexels.com/photos/176381/pexels-photo-176381.jpeg"}
    ];
        

app.get("/", function(req, res){
    res.render("landing");
});


// INDEX - shows all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all the campgrounds from the DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

// CREATE - add a campground to the DB
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;  //this is to get 
    var image = req.body.image; // the data from the form
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    // Create a new campground and save it to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// NEW - shows form to create a new campground
app.get("/campgrounds/new", function(rew, res){
    res.render("new.ejs");
});

// SHOW - shows more info about a campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           // render show template with that campground
    res.render("show", {campground: foundCampground});
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server has started!"); 
});