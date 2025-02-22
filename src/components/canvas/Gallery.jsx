// src/components/canvas/Gallery.jsx
import { useRef } from 'react'
import * as THREE from 'three'
import { Grid } from '@react-three/drei'

const Gallery = () => {
  const width = 8
  const height = 5
  const depth = 6

  // Even more reflective wall material
  const wallMaterial = {
    color: new THREE.Color('#400010'),
    metalness: 0.4,
    roughness: 0.3,
    envMapIntensity: 1
  }

  // More reflective floor material
  const floorMaterial = {
    color: new THREE.Color('#0a0a0a'),
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 1.2
  }

  return (
    <group>
      {/* Double-sided floor for better reflections */}
      <mesh rotation-x={-Math.PI / 2} position-y={0}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial {...floorMaterial} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Grid overlay */}
      <Grid 
        position={[0, 0.001, 0]} 
        args={[width, depth]} 
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#ffffff"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#ffffff"
        fadeDistance={depth}
        fadeStrength={3}
        infiniteGrid={false}
        followCamera={false}
      />

      {/* Walls with double-sided materials */}
      <mesh rotation-x={Math.PI / 2} position-y={height}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial {...wallMaterial} side={THREE.DoubleSide} />
      </mesh>

      <mesh position-z={-depth/2} position-y={height/2}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial {...wallMaterial} side={THREE.DoubleSide} />
      </mesh>

      <mesh position-x={width/2} position-y={height/2} rotation-y={-Math.PI / 2}>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial {...wallMaterial} side={THREE.DoubleSide} />
      </mesh>

      <mesh position-x={-width/2} position-y={height/2} rotation-y={Math.PI / 2}>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial {...wallMaterial} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export default Gallery