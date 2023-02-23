import React from 'react'
import Header from './Components/Navbar'
import AllRoutes from './Routes'

const App = () => {

  return (
    <div>
    <Header />
   <div className='app'>
        <AllRoutes />
   </div>
    </div>
  )
}

export default App