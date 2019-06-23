const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Marks = new Schema({

    student: {
        type: String
    },
    subject:{
        type: String
    },

    name: {
        type: String

},
    mark:{

        type:String
    }},{
    collection: 'Marks'
});

module.exports = mongoose.model('Marks', Marks);