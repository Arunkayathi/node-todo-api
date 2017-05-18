// const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');
const assert=require('assert');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    assert.equal(err,null);
    console.log('Successfully connected to Mongodb');
    // db.collection('Todos').insertOne({
    //     text:'Something to do',
    //     completed:false
    // },(err,result)=>{
    //     assert.equal(err,null);
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });
    db.collection('users').insertOne({
        name:'Arun',
        age:25,
        location:'Denton'
    },(err,result)=>{
        assert.equal(err,null);
        console.log(JSON.stringify(result.ops,undefined,2));
    })
    db.close();
});
