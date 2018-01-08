 var    mongoose   = require("mongoose"),
        Campground = require("./models/campground"),
        Comment    = require("./models/comment")
        
 var data = [
         {
            name: "Cloud's Rest",
            image:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg",
            description: "blah blah blah"
         },
         {
            name: "Desert Mesa",
            image:"https://cdn.pixabay.com/photo/2017/06/17/03/17/gongga-snow-mountain-2411069_1280.jpg",
            description: "blah blah blah"
         },
         {
            name: "Canyon Floor",
            image:"https://cdn.pixabay.com/photo/2016/09/05/12/48/camping-1646504_1280.jpg",
            description: "blah blah blah"
         },
     ];
     
function seedDB(){       
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
            console.log("removed campground!");
            // add a few Campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added campground");
                        // create a comment
                        Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;