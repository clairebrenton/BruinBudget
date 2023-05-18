
import { AuthErrorCodes } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../../context/UserAuthContext'
import './Signup.css'
import { db, auth } from '../../firebase.config';
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    where,
    query,
  } from "firebase/firestore";


const Signup = () => {
    const navigate = useNavigate()
    const { SignUp } = useAuth()
    const [err, setError] = useState("")
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        occupation: ""
    })
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
        const { email, password, confirmPassword, occupation, FullName } = user
        if (password == "" || confirmPassword == "" || email == "" || occupation == "" || FullName == "") {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Please fill all fields ")
        }
        else if (password !== confirmPassword) {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Password does not match")
        }
        else if (!password.length >= 6 || !confirmPassword.length >= 6) {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Password Must be Greater then 6 Length")
        }
        else {
            try {
                await SignUp(email, password)
                const userDocRef = await addDoc(collection(db, 'users'), {
                    email,
                    password,
                    occupation,
                  });
                alert("Welcome New User Created Successfully")
                navigate('/')
            } catch (err) {
                if (err.code === "auth/email-already-in-use") {
                    setInterval(() => {
                        setError("")
                    }, 5000)
                    setError("email already in use try another email")
                }
                else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {

                    setInterval(() => {
                        setError("")
                    }, 5000)
                    setError("Password Must be 6 charecter")
                }

                else {
                    setError(err.message)
                }
            }
        }
    }
    return (
<>
<div className="forms-title">Welcome to&nbsp;<span class="colored-word">BruinBudget!</span> </div>
    
    <div className="forms-smallerr">
      An app made by Claire Brenton
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
                <h2>Registration Form</h2>
                <div className="inputfield-forms">
                    <input type="text" placeholder="Email" value={user.email} name='email' onChange={UserHandler} />
                </div>
                <div className="inputfield-forms">
                    <input type="text" placeholder="Occupation" value={user.occupation} name='occupation' onChange={UserHandler} />
                </div>
                <div className="inputfield-forms">
                    <input type="password" placeholder="Password" value={user.password} name='password' onChange={UserHandler} />
                </div>
                <div className="inputfield-forms">
                    <input type="password" placeholder="Confirm Password" value={user.confirmPassword} name='confirmPassword' onChange={UserHandler} />
                </div>
                <div className="inputfield-forms">
                    <input type="submit" />
                </div>
                <p className="forget-forms">Already Have an account? <Link to={"/"} className="link">{"login"}</Link></p>
                <p className="forget-forms"><Link onClick={() => { window.location.href = "/hometest"; }} className="link">Demo the App Without an Account Here</Link>
        </p>
            </form>

        </div>
</>
    )
}

export default Signup