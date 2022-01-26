import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utils/constants";

export default function EditWorkouts(props) {

    const { authenticatedUser, workouts, setWorkouts } = props

    const navigate = useNavigate()

    useEffect(() => {
        if (!authenticatedUser) {
            navigate('/')
        }
    }, [])

    const { workoutId } = useParams()
    const foundWorkout = workouts.find((workout) => {

        return workout.id === parseInt(workoutId)
    })

    const [workoutToEdit, setWorkoutToEdit] = useState(foundWorkout)
    const [date, setDate] = useState(new Date().toDateString())
    const [description, setDescription] = useState(workoutToEdit.description)
    const [difficulty, setDifficulty] = useState(workoutToEdit.difficulty)

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

        const workoutToUpdate = {
            date: theDate,
            description,
            difficulty
        }

        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(workoutToUpdate)
        };

        fetch(`${apiUrl}/workouts/${workoutId}`, fetchOptions)
        .then((res) => res.json())
        .then((workoutUpdated) => {
            console.log("Updated Workout", workoutUpdated)

            const updatedWorkout = workouts.map((workout) => {
                console.log(" updated workout 3: ", workoutUpdated.data, workout)
                if (workoutUpdated.data.id === workout.id) {
                    console.log("Updated workout 2: ", workoutUpdated)
                    return workoutUpdated.data
                } else {
                    return workout
                }
            })
            console.log("Workout updated: ", updatedWorkout)

            setWorkouts(updatedWorkout)
            navigate(`/securepage`)
        })

    }

    const handleDelete = (event) => {

        const fetchOptions = {
             method: "DELETE",
             headers: {
                "authorization": localStorage.getItem("token")
             }
        }

        fetch(`${apiUrl}/workouts/${workoutId}`, fetchOptions)
        .then((res) => {
            console.log("res", res.status)
            if (res.status === 403) {
                navigate('/securepage')
                return;
            }
            const deletedWorkouts = workouts.filter((workout) => workout.id !== parseInt(workoutId))

            setWorkouts([...deletedWorkouts])
            navigate('/securepage')
        })
    }

    return(
        <div className="homepage create-form-container">
            <form className="create-form" onSubmit={handleSubmit}>
            <h2>Edit Workout</h2>
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
            />
            <input 
            onChange={handleDifficulty}
            id=""
            name=""
            type="text"
            value={difficulty}
            />
            <button type="submit" className="add-workout-button">Submit Updated Workout</button>
            <button className="add-workout-button" onClick={handleDelete}>Delete</button>
        </form>
        </div>
    )
}