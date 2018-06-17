const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First demo todo'
}, {
    _id: new ObjectID(),
    text: 'Sexond test todo'
}];

beforeEach((done) => {
    Todo.remove({})
    .then(() => {
        return Todo.insertMany(todos);        
    })
    .then(() => done());
});

describe('POST /todos',() => {
    it('should create a new todo', (done) =>{
        var text = 'Test todo text1';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err,res) => {
            if(err){
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should NOT create a new todo with invalin data', (done) =>{
        
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res) => {
            if(err){
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /todos',() => {
    it('should create a new todo', (done) =>{
        
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id',() => {
    it('should return todo', (done) =>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 with valid id', (done) =>{
        request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 with non-valid id', (done) =>{
        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done);
    });

});