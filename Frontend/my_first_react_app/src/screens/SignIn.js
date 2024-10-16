import React from 'react'
import {Link,useNavigate} from "react-router-dom";
import './hdesign.css'
  function SignIn(){
    var navigation = useNavigate();
    async function storeinfo(event){
      event.preventDefault();
      let x = document.getElementById("email").value;
      let y = document.getElementById("pwd").value;
      var info = {
        "email" : x,
        "password" : y
      }
      console.log("Email is: ",x,"Password is: ",y)
      var x_ty = typeof x;
      if(x_ty=="string"){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const responsed = await fetch("http://localhost:4000/signin", {
          method: "POST",
          body: JSON.stringify(info),
          headers: myHeaders,
        })
        if(responsed.ok){
          const responsed_new = await responsed.json();
          console.log(responsed_new)
          if(responsed_new.reply!=="true"){
            console.log(responsed_new.to_be_displayed)
          }
          else{
            navigation("/result")
          }
        }
        else{
          console.log("no response from the server")
        }
        
      }
      else{
        console.log(x_ty)
        if(x_ty!=="string"){
          console.log("please enter correct email format")
        }
      }
  }
    return (
      <div>
          <center>
              <form className='signinpage' >
                  <label className='design'>Email : </label>
                  <input id="email" type="email" placeholder='Enter email' className='inputs' name='emailid_of_customer' required></input>
                  <br/>
                  <br/>
                  <label className='design'>Password : </label>
                  <input  id="pwd" type="password" placeholder='Enter password' className='inputs' name='password_of_customer' required></input>
                  <br/>
                  <br/>
                  <button onClick={storeinfo}>Submit</button>
                  <br/>
                  <br/>
                  <Link className='Link' to='/signup'>SignUp</Link>
              </form>
          </center>
      </div>
    )
  }
  


export default SignIn