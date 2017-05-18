const {ObjectID}=require('mongodb');
const {mongoose}=require("./../../server/db/mongoose");
const {Todo}=require("./../../server/models/todo.js");

var id = '691e18fd1666af103030fe04';
if(!ObjectID.isValid(id)){
    return console.log("Id not valid");
}
// Todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log('Todos',todos);
// });
//
// Todo.findOne({
//     _id:id
// }).then((todo)=>console.log('todo',todo));

Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log("Id not found");
    }
console.log('todo by id',todo);
}).catch((e)=>{
    console.log(e);
});
