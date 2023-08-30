// Import statements ->
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, {Suspense, useRef, useState} from 'react'
import * as three from 'three'
import {Environment, useGLTF} from "@react-three/drei"
import {EffectComposer, DepthOfField} from "@react-three/postprocessing";

// Box component ->
// eslint-disable-next-line react/prop-types
function Banana({ z }){
    const ref = useRef()
    const { nodes, materials } = useGLTF('/bananaFinal-v1-transformed.glb')
    const {viewport, camera} = useThree()
    const { width, height } = viewport.getCurrentViewport(
        camera, [0, 0, z]
    )
    const [data] = useState({
        x: three.MathUtils.randFloatSpread(2),
        y: three.MathUtils.randFloatSpread(height),
        rX: Math.random() * Math.PI,
        rY: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
    })

  // animation logic ->
  useFrame((state) => {
      ref.current.rotation.set((data.rX += 0.0001), (data.rY += 0.004), (data.rZ += 0.0005))
      ref.current.position.set(data.x * width, (data.y += 0.025), z )
      if(data.y > height){
          data.y = -height
      }
  })

  return(
      <mesh
          ref={ref}
          geometry={nodes.banana.geometry}
          material={materials.skin}
          // rotation={[-Math.PI / 2, 0, 0]}
          material-emissive="orange"/>
  )
}

export default function App({count = 100, depth = 80}) {
    return(
      <Canvas gl={{alpha: false}} camera={{near: 10, far: 110, fov: 30}}>
          <color attach="background" args={["#ffbf40"]}/>
          <spotLight position={[10, 10, 10]} intensity={1}/>
          <Suspense fallback={null}>
              <Banana scale={0.5}/>
              <Environment preset="sunset"/>
              {Array.from({length: count}, (_, i) =>
                  (<Banana key={i} z={-(i / count) * depth - 20}/>))}
              <EffectComposer>
                  <DepthOfField target={[0, 0, depth / 2]} focalLength={0.5} bokehScale={10} height={700}/>
              </EffectComposer>
          </Suspense>
      </Canvas>
    )
}