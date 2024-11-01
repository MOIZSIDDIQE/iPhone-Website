import { Html, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Lights from './Lights';
import { Suspense } from 'react';
import Iphone from './Iphone';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationSize, size, item }) => {
  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <Lights />
      <OrbitControls
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationSize(controlRef.current.getAzimuthalAngle())}
      />

      <group ref={groupRef} name={`${index === 1 ? 'small' : 'large'}`} position={[0, 0, 0]}>
        <Suspense fallback={<Html><div>Loading</div></Html>}>
          <Iphone scale={index === 1 ? [15, 15, 15] : [17, 17, 17]} item={item} size={size} />
        </Suspense>
      </group>
    </Canvas>
  );
};

export default ModelView;
