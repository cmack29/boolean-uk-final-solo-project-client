import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";

export default function CreateWorkouts(props) {

    const { authenticatedUser, workouts, setWorkouts } = props

    const navigate = useNavigate()

    const { apiUrl } = require('../utils/constants');

    console.log("Workouts on the create page: ", workouts)

    useEffect(() => {
        if (!authenticatedUser) {
            navigate('/')
        }
    }, [])

    const [date, setDate] = useState(new Date().toDateString())
    const [description, setDescription] = useState("")
    const [difficulty, setDifficulty] = useState("")

    const handleDate = (event) => {
        event.preventDefault()

        setDate(event.target.value)
    }

    const handleDescription = (event) => {
        event.preventDefault()

        setDescription(event.target.value)
    }

    const handleDifficulty = (event) => {
        event.preventDefault()

        setDifficulty(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const theDate = new Date(date)

        const workoutToCreate = {
            date: theDate.toISOString(),
            description,
            difficulty
        }

        console.log("workoutToCreate: ", workoutToCreate)

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(workoutToCreate)
        }

        fetch(`${apiUrl}/workouts`, fetchOptions)
        .then((res) => res.json())
        .then((newWorkout) => {
            const workoutToadd = {
                ...newWorkout
            }
            console.log("New Workout", newWorkout)
            setWorkouts([...workouts, workoutToadd])
            navigate(`/securepage`)
        })
    }

    return(
        <>
                <div className="homepage create-form-container">
        <form className="create-form " onSubmit={handleSubmit}>
        <h1>Create Workout</h1>
            <input 
            onChange={handleDate}
            id=""
            name=""
            type="datetime-local"
            value={date}
            />
            <input 
            onChange={handleDescription}
            id=""
            name=""
            type="text"
            value={description}
            placeholder="Description"
            />
            <input 
            onChange={handleDifficulty}
            id=""
            name=""
            type="text"
            value={difficulty}
            placeholder={difficulty}
            />
            <button type="submit" className="add-workout-button">Add Workout</button>
        </form>
        </div>
        </>
    )
}