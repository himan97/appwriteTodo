import React from 'react'
import { CogIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';


const ProfileSettingButton = () => {
  return (
   <>
   <Link to="/settings" className='pl-2'> 
   <button className="flex justify-center items-center  rounded">
   <CogIcon className="w-6 h-6" />
   <span >settings</span>
   </button>
   </Link>
 
 </>
      
    
  
  )
}

export default ProfileSettingButton