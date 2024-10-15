// import Result from '../Frontend/my_first_react_app/src/screens/Result.js'
var mongoose = require("mongoose")
var bodyparse = require('body-parser')
var cors = require('cors');
var exp = require('express');
var app = exp()
app.use(cors())
app.use(exp.json())
async function mongo(){
    const conn = await mongoose.connect("mongodb://localhost:27017/")
}
mongo();
//model is a way in which we will design our schema
const TodoSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Age: {type: Number, required: true},
    Phone_number: {type: Number, required: true},
    Email: {type: String, required: true},
    Password: {type: String, required: true}
});
const Todo = mongoose.model('Todo', TodoSchema);
app.listen(4000, () => {
    console.log('server is running')
})
app.get("/signin", function (req, res) {
    res.send("hello")
})
app.post("/signin", async (req, res) => {
    var reqbody = req.body.name
    var resu="false"
    var k = await Todo.findOne({reqbody})
    console.log(k)
    if(k){
        resu="true"
    }
    res.json(resu)
})
app.post("/signup", async (req, res) => {
    try {
        var resu="false"
        console.log(req.body)
        const todo = new Todo(req.body)
        console.log(todo)
        await todo.save() 
        resu="true";
    } 
    catch (error) {
        console.log(error)
    }
    finally{
        res.json(resu)
    }
   
})
app.get("/", function (req, res) {
    res.send("hello")
})
// route paramaters
app.get("/mingle/:id/:id1/:id3", (req, res) => {
    console.log(req.params.id) //the required id(user entered info ) is in params object
    console.log(req.params.id1)
    console.log(req.params.id3)
})