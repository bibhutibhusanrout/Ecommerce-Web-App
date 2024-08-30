import React, { useState } from 'react'
import "./CSS/login.css"

export default function Login() {

  const [state, setstate] = useState("Login")
  // const [formData, setformData] = useState({
  //   username:"",
  //   password:"",
  //   email:""
  // })

  const [nameset, setnameset] = useState();
  const [passwordset, setpasswordset] = useState();
  const [emailset, setemailset] = useState();

  const login = async ()=>{
    console.log("login")
    let responsedata;
    await fetch("https://fullstack-ecommerce-app-gw43.onrender.com/login",{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        email:emailset,
        password:passwordset
      })
    }).then((res)=>res.json()).then((data)=>responsedata=data)
    if(responsedata.success){
      localStorage.setItem('auth-token',responsedata.token);
      window.location.replace("/");
    }
    else{
      alert(responsedata.errors);
    }
  }
  
  const signup = async ()=>{
    console.log("signup")
    let responsedata;
    await fetch("https://fullstack-ecommerce-app-gw43.onrender.com/signup",{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        username:nameset,
        email:emailset,
        password:passwordset
      })
    }).then((res)=>res.json()).then((data)=>responsedata=data)
    if(responsedata.success){
      localStorage.setItem('auth-token',responsedata.token);
      window.location.replace("/");
    }
    else{
      alert(responsedata.errors);
    }
  }

  return (
    <div className='login'>
      <div className="login-container">
        <h1>{state}</h1>
        <div className="login-fields">
          {state === "Sign Up" ? <input onChange={(e)=>{setnameset(e.target.value)}} type="text" placeholder='Your Name' /> : null}
          <input onChange={(e)=>{setemailset(e.target.value)}} type="Email" placeholder='Email Address' />
          <input onChange={(e)=>{setpasswordset(e.target.value)}} type="Password" placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>

        {state === "Sign Up" ? <p className='login-login'>Already have an Account? <span onClick={()=>setstate("Login")}>Login here</span></p> : <p className='login-login'>Create an account?<span onClick={()=>setstate("Sign Up")}>Click here</span></p>}

        <div className="login-agree">
          <input type="checkbox" name='' id='' />
          <p>by continueing , i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}
