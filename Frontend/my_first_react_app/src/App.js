
import React from "react";

import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import Signup from "./screens/Signup";
import Result from "./screens/Result";
function App(){
  return (
    <div>
      <center>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/result' element={<Result/>}/>
          </Routes>
        </BrowserRouter>
      </center>
    </div>
  )
}
export default App