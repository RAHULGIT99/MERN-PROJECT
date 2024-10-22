import React from "react";
import {useNavigate} from "react-router-dom";
function Signup(){
  // name,age,ph,email,pwd
  var navigation = useNavigate();
  async function collectinfo(event){
    event.preventDefault();
    let name_of_cust = document.getElementById("name_of_customer").value;
    let email_of_cust = document.getElementById("email_of_customer").value;
    let age_of_cust = document.getElementById("age_of_customer").value;
    let password_of_cust = document.getElementById("password_of_customer").value;
    if(name_of_cust!=null && email_of_cust!=null && age_of_cust!=null  && password_of_cust!=null){
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var info = {
        "Name": name_of_cust,
        "Age": age_of_cust,
        "Email": email_of_cust,
        "Password": password_of_cust
      }
      const responsed = await fetch("http://localhost:4000/generate-otp", {
        method: "POST",
        body: JSON.stringify(info),
        headers: myHeaders,
      })
      const responsed_new = await responsed.json();
      console.log(responsed_new)
      if(responsed.status===200){
        if(responsed_new==="Please enter another mail for registration because your currently entered mail is beign already regsitered"){
          console.log("Please enter another mail for registration because your currently entered mail is beign already regsitered")
        }
        else{
          navigation("/verification",{ state : info });
        }
      }
      else{
        console.log(responsed_new)
      }
      // if(responsed.ok){
      //   const responsed_new = await responsed.json();
      //   // console.log(responsed)
      //   console.log(responsed_new.reply)
      //   if(responsed_new.reply!=="true"){
      //     console.log(responsed_new.to_be_displayed)
      //   }
      //   else{
          // console.log(responsed_new.to_be_displayed)
          // navigation("/verification",{ state : info });
      }
      else{
        <h1>error</h1>
      }
      

  }
  return(
    <div> 
      <center>
        <form className="signuppage">
          <label className="textinfo">Name : </label>
            <input id="name_of_customer" type="text" placeholder="Enter name"></input>
              <br/>
                <br/>
                    <br/>
                    <label className="textinfo">Age :</label>
                    <input id="age_of_customer" type="number" placeholder="Enter age"></input>
                    <br/>
                  <br/>
                    <br/>
                      <label className="textinfo">Email : </label>
                      <input id="email_of_customer" type="email" placeholder="Enter email"></input>
                    <br/>
                  <br/>
                <br/>
                  <label className="textinfo">Password : </label>
                  <input id="password_of_customer" type="password" placeholder="Enter password"></input>
                <br/>
              <br/>
            <br/>
            <button onClick={collectinfo}>Submit</button>
        </form>
      </center>
    </div>
  )
}
export default Signup