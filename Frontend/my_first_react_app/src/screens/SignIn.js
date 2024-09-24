import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import './hdesign.css'
function SignIn() {
  var navigation = useNavigate();
  function storeinfo(event){
    let x = document.getElementById("email").value;
    let y = document.getElementById("pwd").value;
    console.log("Email is: ",x,"Password is: ",y)
    if(x!=null && y!=null){
      navigation("/result");
    }
  }
  return (
    <div>
        <center>
            <div className='signinpage'>
                <label className='design'>Email : </label>
                <input id="email" type="text" placeholder='Enter email' className='inputs'></input>
                <br/>
                <br/>
                <label className='design'>Password : </label>
                <input  id="pwd" type="password" placeholder='Enter password' className='inputs'></input>
                <br/>
                <br/>
                <button onClick={storeinfo}>Submit</button>
                <br/>
                <br/>
                <Link className='Link' to='/signup'>SignUp</Link>
                
            </div>
        </center>
    </div>
  )
}

export default SignIn