import { useState, useRef } from 'react';

function Login({login}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    


  return (
    <div className="App">
      <div>
        <p>Login</p>
        <label htmlFor='email'>Email</label>
        <input type="text" id='email' onChange={e => setEmail(e.target.value)} value={email} required></input>
        <br /><br />
        <label htmlFor='password'>Password</label>
        <input type="text" id='password' onChange={e => setPassword(e.target.value)} value={password} required></input>
        <br /><br />
        <button onClick={() => login(email, password)}>LOGIN</button>
        <br /><br />
      </div>
    </div>
  )
}

export default Login