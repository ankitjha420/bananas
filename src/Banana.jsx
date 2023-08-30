import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Banana(props) {
    const { nodes, materials } = useGLTF('/bananaFinal-v1-transformed.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.banana.geometry}
                material={materials.skin}
                rotation={[-Math.PI / 2, 0, 0]}
                material-emissive="orange"/>
        </group>
    )
}

useGLTF.preload('../BananaFinal-v1-transformed.glb')