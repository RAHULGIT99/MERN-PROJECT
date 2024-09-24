// import React from 'react'
// import SignIn from './SignIn'
// import Signup from './Signup'
// import './hdesign.css'
// import {Link} from 'react-router-dom'
// function Home() {
//   return (
//     <div className='main'>
//         <center>
//             <h1>Welcome to home page</h1>
//             <Link to='/signin' className='Link'>Signin</Link> {' '}
//             <Link to='/signup' className='Link'>SignUp</Link>
//         </center>
//     </div>
//   )
// }
// export default Home
import React from "react";
import {Link} from 'react-router-dom'
import './hdesign.css'
function Home(){
    return (
        <div>
            <h1>Welcome to home page</h1>
            <Link to='/signin' className="Link">SignIn</Link>
            <Link to='/signup' className="Link">Signup</Link>
        </div>
    )
}
export default Home