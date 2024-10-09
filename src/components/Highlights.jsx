import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { rightImg, watchImg } from '../utils'
import VideoCarousel from './VideoCarousel'

const Highlights = () => {
  useGSAP(()=>{
    gsap.to('#title',{opacity:1,y:0})
    gsap.to('.link', {opacity:1 ,y:0})
  },[])

  return (
    <section id='highlights' className="w-screen h-full overflow-hidden common-padding bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex  items-end justify-between">
          <h1 id='title' className='section-heading'>
            Get the Highlights
          </h1>
        </div>
      <VideoCarousel/>
      </div>
    </section>
  )
}

export default Highlights
