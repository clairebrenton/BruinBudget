import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Header.css'
import { useAuth } from '../../context/UserAuthContext'
const Header = () => {
   const { logout } = useAuth()
   const navigate = useNavigate()
   const userlogout = async () => {
  
      try {
        await logout()
          navigate("/")
        } catch (error) {
    console.log(error)
        }
    
      }


   let activeStyle = {
      textDecoration: "underline",
   };
   return (
      <header className='header'>
         <div >

            <Link
               className="logo"
               to="/HomeTest"

            >
               $pend$mart
            </Link>
         </div>
         <nav className='link'>
            <ul className='ul'>
               <li>
               </li>
               
               <li>
                  <NavLink
                     className="active"
                     to="/HomeTest"
                     style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                     }
                  >
                     Home
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     className="active"
                     to="/Calc"
                     style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                     }
                  >
                     Calculator
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     className="active"
                     to="/Plans"
                     style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                     }
                  >
                     Plans
                  </NavLink>
               </li>
               
               
               
               <li> 
                  <button
                     className="active  button"
                   onClick={userlogout}
                   >
                     logout
                  </button>

               </li>

            </ul>
         </nav>
      </header>
   )
}
export default Header


