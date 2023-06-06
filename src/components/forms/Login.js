import React, {  useState } from 'react'
import './Signup.css'
import { useAuth } from '../../context/UserAuthContext'
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const { UserLogin } = useAuth()
  const [err, setError] = useState("")
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const UserHandler = (e) => {
    const { name, value } = e.target;
    setUser((pre) => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  const SubmitHandler = async (e) => {
    e.preventDefault()
    const { email, password } = user
    if (email == "" || password == "") {
      setInterval(() => {
        setError("")
      }, 5000)
      return setError("Please fill all the fields")
    }
    try {
      await UserLogin(email, password)
      navigate("/HomeTest")
    } catch (error) {

      if (error.code == "auth/user-not-found") {
        setInterval(() => {
          setError("")
        }, 5000)
        return setError("User Not Found")
      }
      else if (error.code == "auth/wrong-password") {
        setInterval(() => {
          setError("")
        }, 5000)
        return setError("Wrong Password")
      }
      else {
        setInterval(() => {
          setError("")
        }, 5000)
        return setError(`${error.message}`)
      }
    }

  }
  return (
    <>
    <div className="forms-title">Welcome to&nbsp;<span class="colored-word">BruinBudget!</span> </div>
    
    <div className="forms-smallerr">
     
    </div>
    <div className="forms-smaller">
      BruinBudget is a budgeting app that helps you keep track of your expenses, set financial goals, and provide a breakdown on where your money is going. 
    </div>
    <div className="forms-smaller4">
      You can create an account below or demo the app without one by clicking on the button below! 
    </div>
    <div className='box-forms'>
      {

        err && <p className='error-forms'>{err}</p>

      }
      
      <form onSubmit={SubmitHandler} className="form-forms">
        
        <h2>Login</h2>
  

        <div className="inputfield-forms">
          <input type="email" placeholder="Email" value={user.email} name='email' onChange={UserHandler} />
        </div>

        <div className="inputfield-forms">
          <input type="password" placeholder="Password" value={user.password} name='password' onChange={UserHandler} />
        </div>

        <div className="inputfield-forms">
          <input type="submit" value="login" />
        </div>
        <p className="forget-forms">Don't have an account?   <Link to={"signup"} className="link">{"signup"}</Link></p>
        <p className="forget-forms"><Link onClick={() => { window.location.href = "/hometest"; }} className="link">Demo the App Without an Account Here</Link>
        </p>
      </form>

    </div>
</>
  )
}

export default Login