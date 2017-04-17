const {MongoClient,ObjectID}=require('mongodb');
const assert=require('assert');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    assert.equal(err,null);
    console.log("Successfully connected to mongodb server");
    var projection={'text':1,completed:1,_id:0}
    var query={'completed':false};
    var cursor1=db.collection('Todos').find().count();
    console.log(cursor1);
    var cursor1=db.collection('Todos').find(query).count().then((count)=>{
        console.log('TODOS count is '+count);
    });
    var cursor=db.collection('Todos').find(query);
    cursor.project(projection);

    cursor.forEach((doc)=>{
        console.log(doc);
    },(err)=>{
        assert.equal(err,null);
        return db.close();
    });

});
