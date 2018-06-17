var mongoose = require('mongoose');

//ToDo model declaration
var Todo = mongoose.model('Todo', { 
    text: {
        type:String, 
        required: true,
        minLenght: 3,
        trim: true
    },
    completed: {
        type:Boolean,
        default: false
    },
    completedAt: {
        type:Date,
        default: null        
    }
});

module.exports = {
    Todo
}