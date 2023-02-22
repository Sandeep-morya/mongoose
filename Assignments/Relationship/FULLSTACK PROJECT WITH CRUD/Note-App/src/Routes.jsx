import {Route,Routes} from "react-router-dom"

import React from 'react'

import Notes from "./Pages/Notes"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Create from "./Pages/Create"
import Error from "./Pages/Error"

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Notes/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    )
}

export default AllRoutes