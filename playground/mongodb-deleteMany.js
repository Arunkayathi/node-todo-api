const {MongoClient}=require('mongodb');
const  assert=require('assert');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
assert.equal(err,null);
console.log('Successfully connected to mongodb server');

var query={name:{$exists:true,$ne:null}};

var cursor=db.collection('users').find(query)
var markedForRemoval=[];
var previous={name:" "};
cursor.forEach((doc)=>{
    if(doc.name===previous.name){
        markedForRemoval.push(doc._id);
        console.log(markedForRemoval)
    }
    previous=doc;
},(err)=>{
    assert.equal(err,null);
    var filter={"_id":{$in:markedForRemoval}};
    console.log(JSON.stringify(filter));
    db.collection('users').deleteMany(filter,(err,res)=>{
        //console.log(res);
                console.log(markedForRemoval.length + " documents removed.");

    })
db.close();
});


});
