import React from 'react'
import { appleImg , bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  return (
    
<header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
    <nav className="w-full flex screen-max-width">
      <img src={appleImg} alt="Apple"
      width={14} height={18} />
      
    </nav>
</header>
  )
}
export default Navbar
