import React from 'react'

function Regsiter() {
    function handleregister(e){
        e.preventDefault();//Do not reload the screen after calling this fucntion
        console.log('hell');
    }
  return (
    <div>
        <form>
            <input type="email" placeholder='Enter ur email'></input>
            <button onClick={handleregister}>Click me</button>

        </form>
    </div>
  )
}

export default Regsiter