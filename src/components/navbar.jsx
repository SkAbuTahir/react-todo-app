import React from 'react'

const navbar = () => {
  return (
    <nav className="flex px-6 py-4 justify-between text-white" style={{backgroundColor: "#2f226e"}}>
        <div className="logo font-bold">TODO-APP</div>
        
        <ul className="flex  gap-7">
            <li className='hover:font-bold transition-all duration-150' >Home</li>
            <li className='hover:font-bold transition-all duration-150'>YourTasks</li>
        </ul>
    </nav>
  )
}

export default navbar
