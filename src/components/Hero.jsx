import React, { useEffect, useState } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';


const Hero = () => {
  const [VideoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  )

  const handleVideoSrcSet = ()=>{
    if(window.innerWidth < 760){
      setVideoSrc(smallHeroVideo)
    }else{
      setVideoSrc(heroVideo)
    }
  }

  useEffect(()=>{
    window.addEventListener('resize',handleVideoSrcSet)

    return () =>{ 
      window.removeEventListener('resize' , handleVideoSrcSet)
    }
  },[])


  return (
    
  )
}

export default Hero
