const {MongoClient}=require('mongodb');
const  assert=require('assert');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
assert.equal(err,null);
console.log('Successfully connected to mongodb server');

var query={name:{$exists:true,$ne:null}};

var cursor=db.collection('users').find(query)
var markedForUpdate=[];
var previous={name:"Kayathi"};
cursor.forEach((doc)=>{
    if(doc.name===previous.name){
        markedForUpdate.push(doc._id);
        console.log(markedForUpdate)
    }
    
},(err)=>{
    assert.equal(err,null);
    var filter={"_id":{$in:markedForUpdate}};
    console.log(JSON.stringify(filter));
    var updateValue={$set:{name:'Sravya Reddy Kayathi'}};
    db.collection('users').findOneAndUpdate(filter,updateValue,{returnOriginal:false},(err,result)=>{
        console.log(result);
                console.log(markedForUpdate.length + " documents updated.");

    })
db.close();
});


});
