import {useNavigate} from "react-router-dom"
import {useEffect} from "react";
import '../App.css';

export default function Confirmation(props) {

    const { authenticatedUser, workouts, userData, setAuthenticatedUser } = props

    const navigate = useNavigate()


    useEffect(() => {
        if (!authenticatedUser) {
            navigate('/')
        }
    }, [])

    function logOut() {
        localStorage.removeItem("token")
        setAuthenticatedUser(null)
        navigate('/')
      }

    function returnToSecure() {
        navigate('/securepage')
    }
    console.log("data", userData)

    return(
                <div className="homepage">
        <header className="header-style">
        <h1 className="welcome-page-title">C-Mack's Gym</h1>
            <div className="signout">
            {<button className="signout-button" onClick={logOut}>Sign out</button>}
            <h2>{userData.userName}</h2>
            </div>
        </header>
        <main className="confirmation-page">
            <h2>Thank you {userData.userName}, you're booked in for this workout .</h2>
            <h2>{workouts.date}</h2>
            <button onClick={returnToSecure}>Return to the main page here</button>
        </main>
        </div>
    )
}