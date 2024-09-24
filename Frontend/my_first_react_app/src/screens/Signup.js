import React from "react";
function Signup(){
  function collectinfo(){
    let x = document.getElementById("name_of_customer").value;
    let y = document.getElementById("email_of_customer").value;
    let z = document.getElementById("age_of_customer").value;
    let w = document.getElementById("dob_of_customer").value;
    console.log("Name: ",x,"Email: ",y,"age: ",z,"dob: ",w)
  }
  return(
    <div> 
      <center>
        <div className="signuppage">
          <label className="textinfo">Name : </label>
          <input id="name_of_customer" type="text" placeholder="Enter name"></input>
          <br/>
          <br/>
          <br/>
          <label className="textinfo">Email : </label>
          <input id="email_of_customer" type="email" placeholder="Enter email"></input>
          <br/>
          <br/>
          <br/>
          <label className="textinfo">Age :</label>
          <input id="age_of_customer" type="number" placeholder="Enter age"></input>
          <br/>
          <br/>
          <br/>
          <label className="textinfo">Dob : </label>
          <input id="dob_of_customer" type="date" placeholder="Enter DOB"></input>
          <br/>
          <br/>
          <br/>
          <button onClick={collectinfo}>Submit</button>
        </div>
      </center>
    </div>
  )
}
export default Signup