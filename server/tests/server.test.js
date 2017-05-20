const expect = require('expect'),
    request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID}=require('mongodb');
const todos=[{
    _id: new ObjectID(),
    text:"first test todo",

},{
    _id: new ObjectID(),
    text:"second test todo",
    completed:true,
    completedAt:333
}];
beforeEach((done)=>{
    Todo.remove({}).then(()=>{
    Todo.insertMany(todos);
}).then(()=>done());
});
describe('POST /todos',()=>{
    it('should create  a new todo',(done)=>{
        var text="This is my new todo";
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err)
            {
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(3);
                expect(todos[2].text).toBe(text);
                done();
            }).catch((e)=>done(e));
        });

    });
    it('should not create todo with invalid body data',(done)=>{
        request(app)
        .post('/todos')
        .send({
            text:" "
        })
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done();

            }).catch((e)=>done(e));
        });
    });
});

describe('GET /todos',()=>{
    it('Should get all todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
    })
    .end(done);
    });
});

describe('GET /todos/id',()=>{
    it('Should retrieve the correct todo',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('Should return a 404 if todo not found',(done)=>{
        var hexId=new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non object ids',(done)=>{
        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done);
    });
});

    describe('DELETE todos/:id',()=>{
        it("Should remove a todo",(done)=>{
            var hexId=todos[1]._id.toHexString();
            request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err,res)=>{
                if(err)
                return done(err);
                Todo.findByIdAndRemove(hexId).then((todo)=>{
                    expect(todo).toNotExist();
                    done();
                }).catch((e)=>done(e));
        });
    });
        it("Should return 404 if todo not found",(done)=>{
            var hexId=new ObjectID().toHexString();
            request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);


        });
        it("Should return 404 if object id is invalid",(done)=>{
            request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
        });
    });

describe('PATCH /todos/:id',()=>{

        it('Should update the todo',(done)=>{
        var id=todos[0]._id.toHexString();
        var text="updated text!!!!!!";
        request(app)
        .patch(`/todos/${id}`)
        .send({
            text,
            completed:true
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
        });

        it('should clear the completedAt when todo is not completed',(done)=>{
            var id=todos[1]._id.toHexString();
            var text="This is my second updated text !!!!";
            request(app)
            .patch(`/todos/${id}`)
            .send({
                text,
                completed:false
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
        });

});
