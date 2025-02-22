// src/App.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import Layout from './components/dom/Layout'
import VideoTriptych from './components/canvas/VideoTriptych'
import Gallery from './components/canvas/Gallery'

const App = () => {
  return (
    <Layout>
      <Canvas
        style={{
          width: '100%',
          height: '100%',
        }}
        gl={{ 
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000000']} />
        
        <PerspectiveCamera
          makeDefault
          position={[2, 2.1, 3.0]}
          fov={38} // Narrower FOV = more zoomed in
          near={0.1}
          far={100}
        />
        
        <Gallery />
        <VideoTriptych />
        
        <OrbitControls 
          makeDefault 
          target={[0, 1.8, -2]}
          maxPolarAngle={Math.PI * 0.6}
          minPolarAngle={0}
          maxDistance={8}
          minDistance={3}
          zoom0={5.0} // Initial zoom level
          zoomSpeed={1.5} // How fast zoom responds to mouse wheel
          maxZoom={4}
          minZoom={0.5}
        />
      </Canvas>
    </Layout>
  )
}

export default App