import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import SecurePage from './pages/SecurePage';
import CreateWorkouts from './pages/CreateWorkouts';
import EditWorkouts from './pages/EditWorkouts';
import Confirmation from './pages/Confirmation';
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { apiUrl } from './utils/constants';
import jwt from "jsonwebtoken"

function App() {

  const navigate = useNavigate()

  const [authenticatedUser, setAuthenticatedUser] = useState(null)
  const [workouts, setWorkouts] = useState([])
  const [userData, setUserData] = useState([])

  function fetchauthenticatedUser() {
    fetch(`${apiUrl}/signup`)
      .then((res) => res.json())
      .then((authenticatedUserData) => {
        setAuthenticatedUser(authenticatedUserData)
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token) {
      const decodedToken = jwt.decode(token)
      console.log("decoded token: ", decodedToken)
      setUserData({
        id: decodedToken.id,
        userName: decodedToken.userName,
        role: decodedToken.role
      })
      setAuthenticatedUser(token)
      navigate(`/securepage`)
    }
  }, [])

  function fetchWorkouts() {
    fetch(`${apiUrl}/workouts`)
    .then((res) => res.json())
    .then((workoutsData) => {
      console.log("Workouts: ", workoutsData)
      setWorkouts(workoutsData)
    })
  }

  useEffect(() => {
    fetchWorkouts()
  }, [])

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage
       setAuthenticatedUser={setAuthenticatedUser}
       setUserData={setUserData} />}
       />
      <Route path="/securepage" element={<SecurePage
       userData={userData}
       authenticatedUser={authenticatedUser}  
       workouts={workouts}
       setAuthenticatedUser={setAuthenticatedUser}
       setUserData={setUserData}/>} 
       />
      <Route path="/create-workouts" element={<CreateWorkouts
       authenticatedUser={authenticatedUser}
       workouts={workouts} 
       setWorkouts={setWorkouts} />} 
       />
       <Route path="/edit-workout/:workoutId" element={<EditWorkouts 
       authenticatedUser={authenticatedUser}
       workouts={workouts} 
       setWorkouts={setWorkouts} />} 
       />
       <Route path="/confirmation/:workoutId" element={<Confirmation 
       userData={userData}
       authenticatedUser={authenticatedUser}  
       workouts={workouts}
       setAuthenticatedUser={setAuthenticatedUser} />} />
    </Routes>
    <br />
    <footer className="footer">
      <p>A C-Mack Production</p>
    </footer>
    </>

  );
}

export default App;

