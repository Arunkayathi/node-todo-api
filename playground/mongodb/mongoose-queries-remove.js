const {ObjectID}=require('mongodb');
const {mongoose}=require("./../../server/db/mongoose");
const {Todo}=require("./../../server/models/todo.js");

Todo.findByIdAndRemove('592081e0b815b624a0d6aac2').then((todo)=>{
console.log(todo);
});
mongoose.connection.close();
