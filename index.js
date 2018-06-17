// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var blogSchema = new Schema({
//   title:  String,
//   author: String,
//   body:   String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }
// });

// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

// const Todo = mongoose.model('Todo', { 
//     text: String ,
//     completed: Boolean ,
//     completedAt: Date ,
// });

// var newTodo = new Todo({ 
//     text: 'Zildjian1', 
//     completed: true 
// });

// newTodo.save().then((doc) => console.log(doc));