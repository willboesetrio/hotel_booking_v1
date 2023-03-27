import { useState, useRef} from 'react';

function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    //let [currentToken, setCurrentToken] = useState('');//store token in session storage, not state
    let [userEmail, setUserEmail] = useState('');
    let [userRole, setUserRole] = useState('');
    let [loggedIn, setLoggedIn] = useState(false);
    let [invalidLogin, setInvalidLogin] = useState(false);

    const postLogin = async() => {
        const postObject = {
          "email" : emailRef.current.value,
          "password" : passwordRef.current.value
        }
        const response = await fetch("http://localhost:8080/login", {
          method : "POST",
          //credentials: 'same-origin',//not the right credentials, but include does not work
          headers : {
            "Content-Type": "application/json",
          },
          body : JSON.stringify(postObject)
        })
        
        if(response.ok) {

        const myToken = await response.json();
        
        console.log(myToken.token);
        const user = JSON.parse(atob(myToken.token.split('.')[1]));
        console.log(user);
        sessionStorage.setItem("token", myToken.token)
        setLoggedIn(true); setUserEmail(user.sub); setUserRole(user.roles); setInvalidLogin(false);
        } else {
            console.log("INVALID LOGIN ATTEMPT")
            setInvalidLogin(true);
        }
      }


  return (
    <div className="App">
      <div>
        <p>Login</p>
        <label htmlFor='email'>Email</label>
        <input type="text" id='email' ref={emailRef} required></input>
        <br />
        <br />
        <label htmlFor='password'>Password</label>
        <input type="text" id='password' ref={passwordRef} required></input>
        <br />
        <br />
        <button onClick={postLogin}>LOGIN</button>
        <br />
        <br />
        {loggedIn && <div>
            <p>User is logged in as:</p>
          <p>Email: {userEmail}</p><p>Role: {userRole}</p>
          </div>
        }
        {invalidLogin && <div>
            <p>Invalid email or password</p></div>
        }
        
      </div>
    </div>
  )
}

export default Login