// import Result from '../Frontend/my_first_react_app/src/screens/Result.js'
var bodyparse = require('body-parser')
var cors = require('cors');
var exp = require('express')
var app = exp()
app.use(cors());
// app.use(exp.json())
app.use(bodyparse.urlencoded({ extended: false }))
app.listen(4000, () => {
    console.log('server is running')
})
app.post("/", (req, res) => {
    var reqbody = req.body
    console.log(reqbody)
    res.send(reqbody.name)
})
app.get("/", function (req, res) {
    res.send("hello ")
})
// route paramaters
app.get("/mingle/:id/:id1/:id3", (req, res) => {
    console.log(req.params.id) //the required id(user entered info ) is in params object
    console.log(req.params.id1)
    console.log(req.params.id3)
})