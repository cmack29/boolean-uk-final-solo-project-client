import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { apiUrl } from "../utils/constants";
import jwt from "jsonwebtoken"
import '../App.css';

export default function HomePage(props) {

    const { setAuthenticatedUser, setUserData } = props

    const navigate = useNavigate()

    const [user, setUser] = useState({
        userName: "",
        password: ""
    })

    const handleSignUpSubmit = event => {
        event.preventDefault()

        const fetchOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...user }),
        }

        fetch(`${apiUrl}/signup`, fetchOptions)
        .then((res) => res.json())
        .then((token) => {
            if (token) {
                setAuthenticatedUser(token.token)
                localStorage.setItem("token", token.token)
                const decodedToken = jwt.decode(token.token)
                console.log("decoded token: ", decodedToken)
                setUserData({
                    ...decodedToken
                })
                navigate(`/securepage`)
            }
        })
    }

    const handleSignInSubmit = event => {
        event.preventDefault()

        const fetchOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...user }),
          }

          fetch(`${apiUrl}/signin`, fetchOptions)
          .then((res) => res.json())
          .then((token) => {
              if (token) {
                setAuthenticatedUser(token.token)
                localStorage.setItem("token", token.token)
                const decodedToken = jwt.decode(token.token)
                console.log("decoded token: ", decodedToken)
                setUserData({
                    ...decodedToken
                })
                console.log("decoded token sign in: ", decodedToken)
                navigate(`/securepage`)
            }
          })
    }

    const handleChange = event => {
        const name = event.target.name
        const value = event.target.value
        setUser({ ...user, [name]: value })
    }

    return(
        <div className="homepage">
        <h1 className="welcome-page-title">Welcome to C-Mack Gym!</h1>
        <ul className="auth-form-grid">
            <li>
        <form className="form-grid" onSubmit={handleSignUpSubmit}>
            <h3 className="welcome-page-title">Sign Up</h3>

            <input 
             type="userName" 
             id="userName" 
             name="userName"
             placeholder="Username"
             onChange={handleChange} />
 
            <input
             type="password"           
             id="password"
             name="password"
             placeholder="Password"
             onChange={handleChange} />
             <button type="submit" className="bouncy signin-buttons">Sign Up</button>
        </form>
        </li>
        <li>
        <form className="form-grid" onSubmit={handleSignInSubmit}>
            <h3 className="welcome-page-title">Sign In</h3>

            <input 
             type="userName" 
             id="userName" 
             name="userName"
             placeholder="Username"
             onChange={handleChange} />

            <input
             type="password"           
             id="password"
             name="password"
             placeholder="Password"
             onChange={handleChange} />
             <button type="submit" className="bouncy signin-buttons">Sign In</button>
        </form>
        </li>
        </ul>
        <div className="about-us">
        <h1>About us</h1>
        <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. 
            Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, 
            cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una 
            galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. 
            No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos 
            electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la 
            creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más 
            recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye 
            versiones de Lorem Ipsum.</p>
            </div>
        </div>
    )
}