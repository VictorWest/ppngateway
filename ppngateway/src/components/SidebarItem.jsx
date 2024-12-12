import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
export default function SidebarItem({icon, title, link}) {
    const [isActive, setIsActive] = useState(false)
    const location = useLocation()
    useEffect(() => {
        if(location.pathname === link){
            setIsActive(true)
        }else{
            setIsActive(false)
        }
    }, [location, link])
  return (
    <Link to={link} className={`flex items-center gap-3 p-3 
        bg-[#131728] text-[#B8BBC7] text-xl cursor-pointer transition-all border-l-4
            ${isActive && ' border-[#BA77FF] text-white bg-[#33343f]'} 
            ${!isActive && 'hover:bg-[#0f1220] border-transparent'}
        `}>
        {<i className={`${icon} ${isActive && 'text-[#BA77FF]'} text-base`}></i>}
      {title}
    </Link>
  )
}
