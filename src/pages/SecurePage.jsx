import {useNavigate, Link, useParams} from "react-router-dom"
import { useEffect, useState } from "react";
import { apiUrl } from "../utils/constants";
import '../App.css';

export default function SecurePage (props) {

    const { authenticatedUser, workouts, userData, setAuthenticatedUser } = props

    const [workoutDifficulty, setWorkoutDifficulty] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if (!authenticatedUser) {
            navigate('/')
        }
    }, [])

    let filteredWorkout = workouts

    if (workoutDifficulty) {
        filteredWorkout = filteredWorkout.filter(
            (workout) => workout.difficulty === workoutDifficulty
        )
    }

    const signUpToWorkout = (id) => {
        fetch(`${apiUrl}/workouts/${userData.id}/${id}`, {
            method: "POST"
        })
        .then((res) => res.json())
        .then(signedUpUser => {
            console.log("Signed up user", signedUpUser)
                navigate(`/confirmation/${id}`)
        })
    }

    function logOut() {
        localStorage.removeItem("token")
        setAuthenticatedUser(null)
        navigate('/')
      }

    return(
        <>
        <div className="securepage">
        <header className="header-style">
        <h1 className="welcome-page-title">C-Mack's Gym</h1>
            <ul className="header">
            {userData.role === "ADMIN" &&
                <li>
                    <Link to="/create-workouts">Create Workout</Link>
                </li>}
            </ul>
            <div className="signout">
            {<button className="signout-button" onClick={logOut}>Sign out</button>}
            <h2>{userData.userName}</h2>
            </div>
        </header>
        <aside className="filter">
                <form className="filters-form">
                    <select
                    onChange={(e) => setWorkoutDifficulty(e.target.value)}
                    value={workoutDifficulty}>
                        <option value="">Select a difficulty</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                   </select>
                </form>
         </aside>
        <main className="secure-filter-and-workouts">
            <ul className="secure-form-grid">
            {filteredWorkout.map((workout, index) => {
                const { date, description, difficulty, id, users } = workout
                return(
                    <>
                    <li key={index}>
                    <h4>Date: {date}</h4>  
                    <h4>Difficlty: {difficulty}</h4>           
                    <p className="workouts">The Workout: {description}</p>
                    {userData.role === "ADMIN" && <button className="bouncy" onClick={() => navigate(`/edit-workout/${workout.id}`)}>Edit Workout</button>}
                    <button className="bouncy" onClick={() => signUpToWorkout(parseInt(id))}>Sign up!</button>
                    {userData.role === "ADMIN" && <ul className="users-on-workouts">
                        {users.map((user) => {
                            // {console.log("users sec ", workout.users)}
                            return(
                                <li key={user.user.id}>
                                    <h4>{user.user.userName}</h4>
                                </li>
                            )
                        })}
                    </ul>}
                </li>
                </>
                )
            })}
            </ul>
        </main>
        </div>
        </>
    )
}

// secure-form-grid auth-form-grid 

// {user.user.id}