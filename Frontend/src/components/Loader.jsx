import React from 'react'

function Loader() {
  return (
    <div className='absolute w-full h-full myLoader top-0 left-0 flex justify-center items-center bg-transparent pointer-events-none z-99'>
        <img src='/images/loader.gif' alt='loader' className='w-6' />
    </div>
  )
}

export default Loader