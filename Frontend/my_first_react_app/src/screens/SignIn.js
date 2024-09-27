import React from 'react'
import { Link} from "react-router-dom";
import './hdesign.css'
  // var navigation = useNavigate();
  // function storeinfo(event){
  //   let x = document.getElementById("email").value;
  //   let y = document.getElementById("pwd").value;
  //   var info = {
  //     "name" : x,
  //     "email" : y
  //   }
  //   console.log("Email is: ",x,"Password is: ",y)
  //   if(x!=null && y!=null){
  //     navigation("/result");
  //   }
  function SignIn(){
    return (
      <div>
          <center>
              <form className='signinpage' action = "https://localhost:4000" request = "POST">
                  <label className='design'>Email : </label>
                  <input id="email" type="text" placeholder='Enter email' className='inputs' name='emailid_of_customer'></input>
                  <br/>
                  <br/>
                  <label className='design'>Password : </label>
                  <input  id="pwd" type="password" placeholder='Enter password' className='inputs' name='password_of_customer'></input>
                  <br/>
                  <br/>
                  <button >Submit</button>
                  <br/>
                  <br/>
                  <Link className='Link' to='/signup'>SignUp</Link>
              </form>
          </center>
      </div>
    )
  }
  


export default SignIn