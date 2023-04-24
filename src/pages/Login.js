import { useState } from 'react';

/**
 * @name Login
 * @description initial login form
 * @param {*} props login, invalid 
 * @returns component
 */
function Login({login, invalid}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


  return (
    <div className="App">
      <div>
        <p>Login</p>
        {invalid && <p style={{color:"red"}}>invalid login, please try again</p>}
        <label htmlFor='email'>Email</label>
        <input type="email" id='email' onChange={e => setEmail(e.target.value)} value={email} required></input>
        <br /><br />
        <label htmlFor='password'>Password</label>
        <input type="password" id='password' onChange={e => setPassword(e.target.value)} value={password} required></input>
        <br /><br />
        <button onClick={() => login(email, password)}>LOGIN</button>
        <br /><br />
      </div>
    </div>
  )
}

export default Login