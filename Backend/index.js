// // import './heck.html'
// var x = require('express')//importing module
// var paths = require('path')//importing module
// var bodyparse = require('body-parser')
// var app = x();//initialising express app 
// // x.urlencoded()
// app.use(x.json())
// const port = 4000;
// //action attribute specifies where to send form data when submitted
// app.listen(port,() => {
//     console.log('server running')
// })
// app.post("/",(requ,resu) => {
//     // resu.sendFile(paths.join(__dirname+"/heck.html")) just include the path module
//     var emailra=requ.body.custemail
//     // resu.send("it is "+emailra)
//     resu.json({
//         "name" : emailra
//     })
// })
// app.get("/",(requ,resu) => {
//     resu.send("email is "+requ.query.custemail)
//     // u don't need to import anything if we use get method and if we want to access query object
// })
import bodyParser from 'body-parser'
import Result from '../Frontend/my_first_react_app/src/screens/Result.js'
var bodyparse = require('body-parser')
app.use(bodyparse.urlencoded({extended : false}))
var exp = require('express')
// var entered_info = require('C:\Users\rahul\OneDrive\Desktop\MY PROJECT\Frontend\my_first_react_app\src\screens\SignIn.js')
var app = exp()
// var filing = require('./first.js')
app.listen(4000,() => {
    console.log('server is running')
})
app.post("/",(req,res) => {
    var emailid = req.body.email_of_customer
    var pwd = req.body.password_of_customer
    console.log(emailid)
    console.log(pwd)
    if(emailid!=undefined && pwd!=undefined)
        res.redirect(Result)
})
app.get("/",function(req,res){
    console.log("Email is " + req.query.custemail)
    res.send("hello " + filing)
})
// route paramaters
app.get("/mingle/:id/:id1/:id3",(req,res) => {
    console.log(req.params.id) //the required id(user entered info ) is in params object
    console.log(req.params.id1)
    console.log(req.params.id3)
})
// "test": "echo \"Error: no test specified\" && exit 1"
