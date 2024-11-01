import React, { useRef, useEffect, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [Video, setVideo] = useState({
    isEnd: false,
    startPlaying: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [LoadedData, setLoadedData] = useState([]);

  const { isEnd, startPlaying, videoId, isLastVideo, isPlaying } = Video;

  useGSAP(() => {
    gsap.to('#slider' ,{
      transform:`translateX(${-100 * videoId}%)`,
      duration:2,
      ease:'power2.inOut'
    })

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({ ...pre, startPlaying: true, isPlaying: true }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (LoadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlaying && videoRef.current[videoId].play();
      }
    }
  }, [startPlaying, videoId, isPlaying, LoadedData]);

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      let anime = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress  = Math.ceil(anime.progress() * 100);

          if(progress != currentProgress){
            currentProgress = progress

            gsap.to(videoDivRef.current[videoId],{
              width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw'
            })

            gsap.to(span[videoId], {
              width:`${currentProgress}%`,
              backgroundColor:'white'
            })
          }
        },
        onComplete: () => {
          if(isPlaying){
            gsap.to(videoDivRef.current[videoId] , {
              width:'12px'
            })

            gsap.to(span[videoId] , {
              backgroundColor:'#afafaf'
            })
          }
        },
      });

      if(videoId === 0){
        anime.restart();
      }

      const animeUpdate  = ()=>{
        anime.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
      }
  
      if(isPlaying){
        gsap.ticker.add(animeUpdate);
      }else{
        gsap.ticker.remove(animeUpdate)
      }
    }
  }, [videoId, startPlaying]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }));
        break;
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      default:
        return Video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center overflow-hidden rounded-3xl bg-black">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  className={`${list.id === 2 && 'translate-x-44'}
                    pointer-events-none`}
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                  onEnded={()=> i !== 3 ? handleProcess('video-end',i) : handleProcess('video-last')}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute w-full h-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              ></span>
            </span>
          ))}
        </div>
        <button className="ml-4">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;