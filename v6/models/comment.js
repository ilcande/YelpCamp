var mongoose   = require("mongoose");

// we then need to create a Schema with text and author
var commentSchema = mongoose.Schema({
    text: String,
    author: "String"
});

module.exports = mongoose.model("Comment", commentSchema);