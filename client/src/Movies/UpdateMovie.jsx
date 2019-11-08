import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UpdateMovie(props) {
    const [movie, setMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: [],
    })

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => {
                throw (err)
            })
    }, [props.match.params.id])

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleStars = (e) => {
        setMovie({
            ...movie,
            stars: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.history.push('/')
            })
            .catch(err => {
                throw (err)
            })
    }



    return (
        <>
            <h1>Update movie</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name='title' placeholder='Enter new title' value={movie.title} onChange={handleChange} />
                <input type="text" name='director' placeholder='Enter new director' value={movie.director} onChange={handleChange} />
                <input type="text" name='metascore' placeholder='Enter new metascore' value={movie.metascore} onChange={handleChange} />
                {/* <input type="text" name='stars' placeholder='Update Actors/Actresses' value={movie.stars} onChange={e => handleStars(e, movie)} /> */}

                <button type='submit'>Save</button>
            </form>
        </>
    )
}

export default UpdateMovie