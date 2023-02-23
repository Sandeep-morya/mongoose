import { Route, Routes } from "react-router-dom"

import React from 'react'

import Notes from "./Pages/Notes"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Create from "./Pages/Create"
import Error from "./Pages/Error"
import PrivateRoute from "./Components/PrivateRoute"

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute>
                <Notes />
            </PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<PrivateRoute>
                <Create />
            </PrivateRoute>} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}

export default AllRoutes