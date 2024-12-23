import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState, useEffect } from "react";
import { yellowImg } from "../utils";
import * as THREE from "three";
import ModelView from "./ModelView";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";


const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iphone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  });

  // camera control for model view;
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  //model
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  useEffect(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width ">
        <h1 className="section-heading" id="heading">
          Take a closer look
        </h1>
        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
            <canvas
              className=" fixed top-0 bottom-0 left-0 right-0 overflow-hidden"
              eventSource={document.getElementById("root")}
            >
              {<View.Port />}
            </canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item,i) => (
                  <li key={i} 
                  className="w-6 h-6 rounded-full mx-2 cursor-pointer" 
                  style={{backgroundColor:item.color[0]}}
                  onClick={() => setModel(item)}>
                  </li>
                ))}
              </ul>
              <button className="size-btn-container">
                {sizes.map(({label,value})=>(
                  <span key={label} className="size-btn"
                  style={{backgroundColor: size === value? 'white' : 'transparent',
                    color: size === value? 'black' : 'white' }}
                    onClick={()=>setSize(value)}>
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
