import React from "react";
import {useNavigate,useLocation} from "react-router-dom";
function Verification(){
  var navigation = useNavigate();
  var location = useLocation();
  const data = location.state
  const email_of_cust = data.Email
  const name_of_cust = data.Name
  const password_of_cust = data.Password
  const age_of_cust = data.Age
  console.log(data)
  async function collectinfo(event){
    event.preventDefault();
    let otp_of_cust = document.getElementById("otp_of_customer").value;
    if(otp_of_cust!=null){
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // var info = {
      //   "Email" : email_of_cust,
      //   "Otp" : otp_of_cust
      // }
      var complete_info = {
        "Email" : email_of_cust,
        "Otp" : otp_of_cust,
        "Name" : name_of_cust,
        "Password" : password_of_cust,
        "Age" : age_of_cust 
      }
      const responsed = await fetch("http://localhost:4000/verify-otp", {
        method: "POST",
        body: JSON.stringify(complete_info),
        headers: myHeaders,
      })
      if(responsed.ok){
        const responsed_new = await responsed.json();
        console.log(responsed_new)
        if(responsed_new.reply==="true" && responsed_new.success==="OTP verified successfully"){
          console.log("Data added to database and otp verified")
          navigation("/signin")
        }
        else if(responsed_new.reply==="false"){
          console.log(responsed_new)
        }
        else{
          console.log(responsed_new)
        }
      }
      else{
        <h1>error</h1>
      }
      
    }
  }
  return(
    <div> 
      <center>
        <form className="signuppage">
          <label className="textinfo">Enter your OTP : </label>
          <input id="otp_of_customer" type="text" placeholder="Enter Your OTP"></input>  
          <button onClick={collectinfo}>Submit</button>
        </form>
      </center>
    </div>
  )
}
export default Verification