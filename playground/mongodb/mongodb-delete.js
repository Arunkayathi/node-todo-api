

const {MongoClient}=require('mongodb'),
        assert=require('assert');

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db)=>{

assert.equal(err,null);
    console.log('Successfully connected to TodoApp server');
    var query={completed:false};
    db.collection('Todos').findOneAndDelete(query).then((result)=>{
        console.log(result);
        db.close();
    })
});
