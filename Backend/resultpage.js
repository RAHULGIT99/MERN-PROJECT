// import Result from '../Frontend/my_first_react_app/src/screens/Result.js'
var mongoose = require("mongoose")
var bodyparse = require('body-parser')
var cors = require('cors');
// const otpGenerator = require('otp-generator');
// const nodemailer = require('nodemailer');
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
    Email: {type: String, required: true},
    Password: {type: String, required: true}
});
const Todo = mongoose.model('Todo', TodoSchema);
const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    createdAt: { type: Date, expires: '5m', default: Date.now }
});
const OTP = mongoose.model('OTP', otpSchema);
app.listen(4000, () => {
    console.log('server is running')
})
app.get("/signin", function (req, res) {
    res.send("hello")
})
app.post("/signin", async (req, res) => {
    var reqbody = req.body
    console.log(reqbody)
    var response_value={}
    var k2 = await Todo.findOne({ Password: reqbody.password });
    var k1 = await Todo.findOne({ Email: reqbody.email });
    var k = await Todo.findOne({ Email: reqbody.email, Password: reqbody.password });
    console.log(k)
    if(k1==null){
        response_value = {
            "reply" : "false",
            "to_be_displayed" : "Please enter correct email"
        }
        
    }
    else if(k1!=null && k2==null){
        response_value = {
            "reply" : "false",
            "to_be_displayed" : "Please enter correct password for your email"
        }
    }   
    else{
        if(!k1.equals(k2)){
            response_value = {
                "reply" : "false",
                "to_be_displayed" : "Please enter correct password for your email"
            }
        }
        else{
            response_value = {
                "reply" : "true",
                "to_be_displayed" : "Logged in successfully"
            }
        }
    }
    console.log(response_value)
    res.json(response_value)
})
app.post("/signup", async (req, res) => {
    try {
        var resu="false"
        console.log(req.body)
        const todo = new Todo(req.body)
        console.log(todo)
        var response_value = {}
        var k1 = await Todo.findOne({ Email: req.body.Email });
        if(k1==null){
            await todo.save() 
            response_value = {
                "reply" : "true",
                "to_be_displayed" : "Siggned up successfully"
            }
        }
        else{
            response_value = {
                "reply" : "false",
                "to_be_displayed" : "Please enter another email for registering"
            }
        }    
    } 
    catch (error) {
        console.log(error)
    }
    finally{
        res.json(response_value)
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