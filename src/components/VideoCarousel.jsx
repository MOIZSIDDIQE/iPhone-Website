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

};

export default VideoCarousel;
