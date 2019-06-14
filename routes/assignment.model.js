const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Assignment = new Schema({
    deadline: {
        type: String
    },
    name: {
        type: String
    },
    subject: {
        type: String
    },
    lecturer: {
        type: String
    },
    student: {
        type: String
    },
    filename:{
        type:String
    },
    uploadedate:{
        type:String
    }
},{
    collection: 'Assignment'
});

module.exports = mongoose.model('Assignment', Assignment);