// import Result from '../Frontend/my_first_react_app/src/screens/Result.js'
var mongoose = require("mongoose")
var bodyparse = require('body-parser')
var cors = require('cors');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
var exp = require('express');
var app = exp()
app.use(cors())
app.use(exp.json())
async function mongo() {
    const conn = await mongoose.connect("mongodb://localhost:27017/MyDatabase")
}
mongo();
//model is a way in which we will design our schema
const TodoSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true }
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
    var response_value = {}
    var k2 = await Todo.findOne({ Password: reqbody.password });
    var k1 = await Todo.findOne({ Email: reqbody.email });
    var k = await Todo.findOne({ Email: reqbody.email, Password: reqbody.password });
    console.log(k)
    if (k1 == null) {
        response_value = {
            "reply": "false",
            "to_be_displayed": "Please enter correct email"
        }
    }
    else if (k1 != null && k2 == null) {
        response_value = {
            "reply": "false",
            "to_be_displayed": "Please enter correct password for your email"
        }
    }
    else {
        if (!k1.equals(k2)) {
            response_value = {
                "reply": "false",
                "to_be_displayed": "Please enter correct password for your email"
            }
        }
        else {
            response_value = {
                "reply": "true",
                "to_be_displayed": "Logged in successfully"
            }
        }
    }
    console.log(response_value)
    res.json(response_value)
})
// app.post("/signup", async (req, res) => {
//     try {
//         console.log(req.body)
//         var complete_info_singnup = {
//             "Name" : req.body.Name,
//             "Age" : req.body.Age ,
//             "Email" : req.body.Email,
//             "Password" : req.body.Password,
//           }
//         const todo = new Todo(complete_info_singnup)
//         console.log(todo)
//         var response_value = {}
//         var k1 = await Todo.findOne({ Email: req.body.Email });
//         if (k1 == null) {
//             await todo.save()
//             response_value = {
//                 "reply": "true",
//                 "to_be_displayed": "Siggned up successfully"
//             }
//         }
//         else {
//             response_value = {
//                 "reply": "false",
//                 "to_be_displayed": "Please enter another email for registering"
//             }
//         }
//     }
//     catch (error) {
//         console.log(error)
//     }
//     finally {
//         res.json(response_value)
//     }

// })
app.post('/generate-otp', async (req, res) => {
    const email = req.body.Email;
    const success = { "s": 'OTP sent successfully' };
    const failure = { "f": "Error sending OTP" };
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP: ", otp);
    
    try {
        const k1 = await Todo.findOne({ Email: email }); // Find document by email
        console.log("The account is: ", k1);

        if (!k1) { // Check if k1 does not exist
            await OTP.create({ email, otp });
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ryashraj8218@gmail.com',
                    pass: 'tdij bgpf vrxl alue'
                }
            });

            await transporter.sendMail({
                from: 'ryashraj8218@gmail.com',
                to: email,
                subject: 'OTP Verification',
                text: `Your OTP for verification is: ${otp}`
            });

            res.status(200).json(success);
        } else {
            res.json("Please enter another email for registration because your currently entered email is already registered." );
        }
    } catch (error) {
        console.log("Error occurred:", error); // Log any errors
        res.status(500).json(failure);
    }
});

app.post('/receive-json', async (req, res) => {
    // Response object
    const response_of_endpoint = {
        "reply": "false",
        "to_be_displayed": "Please enter another email for registering",
        "success": "true"
    };
    console.log(req.body);
    // Ensure no response is sent prematurely
    setTimeout(() => {
        console.log("Sending delayed response...");
        res.json(response_of_endpoint);
    }, 6000); // 10 seconds delay
});


app.post('/verify-otp', async (req, res) => {
    const email = req.body.Email; 
    const otp = req.body.Otp; 
    console.log('Email:', email);
    console.log('OTP:', otp);
    try {
        const otpRecord = await OTP.findOne({ email: email, otp: otp });
        if (otpRecord) {
            const s = 'OTP verified successfully'
            try {
                console.log(req.body)
                var complete_info_singnup = {
                    "Name" : req.body.Name,
                    "Email" : req.body.Email,
                    "Password" : req.body.Password,
                  }
                const todo = new Todo(complete_info_singnup)
                console.log(todo)
                var response_value = {}
                var k1 = await Todo.findOne({ Email: req.body.Email });
                if (k1 == null) {
                    await todo.save()
                    response_value = {
                        "reply": "true",
                        "to_be_displayed": "Siggned up successfully",
                        "success" : s
                    }
                }
                else {
                    response_value = {
                        "reply": "false",
                        "to_be_displayed": "Please enter another email for registering",
                        "success" : s
                    }
                }
            }
            catch (error) {
                console.log(error)
            }
            finally {
                res.json(response_value)
            }
        } else {
            res.json('Invalid OTP');
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json('Error verifying OTP');
    }
});
app.get("/", function (req, res) {
    res.send("hello")
})
// route paramaters
app.get("/mingle/:id/:id1/:id3", (req, res) => {
    console.log(req.params.id) //the required id(user entered info ) is in params object
    console.log(req.params.id1)
    console.log(req.params.id3)
})