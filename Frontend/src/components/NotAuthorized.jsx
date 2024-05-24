import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

function NotAuthorized() {
    const { currentColor } = useStateContext();
  return (
    <div className='w-full h-full flex justify-center items-center' style={{ minHeight: "400px" }}>
        <span className='text-xl text-bold' style={{color: currentColor}}>
            Your are not authorized to access this page.
        </span>
    </div>
  )
}

export default NotAuthorized