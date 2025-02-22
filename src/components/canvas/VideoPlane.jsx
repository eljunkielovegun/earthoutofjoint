// src/components/canvas/VideoPlane.jsx
import { useEffect, useState, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const VideoPlane = ({ videoUrl, position = [0, 0, 0] }) => {
  const [video] = useState(() => {
    const vid = document.createElement('video')
    vid.src = videoUrl
    vid.crossOrigin = 'anonymous'
    vid.loop = true
    vid.muted = true
    vid.playsInline = true
    vid.preload = 'auto'
    vid.setAttribute('playsinline', '')
    vid.setAttribute('webkit-playsinline', '')
    return vid
  })

  const texture = useMemo(() => {
    const videoTexture = new THREE.VideoTexture(video)
    videoTexture.minFilter = THREE.LinearFilter
    videoTexture.magFilter = THREE.LinearFilter
    videoTexture.format = THREE.RGBAFormat
    return videoTexture
  }, [video])

  useFrame(() => {
    if (video.paused) {
      video.play().catch(() => {})
    }
  })

  useEffect(() => {
    const playVideo = async () => {
      try {
        await video.play()
      } catch (error) {
        console.warn('Initial video play failed, will retry in render loop:', error)
      }
    }

    video.load()
    playVideo()

    return () => {
      video.pause()
      video.src = ''
      texture.dispose()
    }
  }, [video, texture])

  const height = 3
  const width = (height * 9) / 16

  return (
    <group position={position}>
      {/* Main video display */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial 
          map={texture}
          emissive={"white"}
          emissiveMap={texture}
          emissiveIntensity={3}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Light-spreading planes */}
      {/* Back glow */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[width * 2, height * 3]} />
        <meshBasicMaterial 
          map={texture}
          transparent={true}
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point light that follows video brightness */}
      <pointLight 
        intensity={2} 
        distance={10}
        decay={2}
      >
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial 
            map={texture}
            transparent={true}
            opacity={0.2}
          />
        </mesh>
      </pointLight>
    </group>
  )
}

export default VideoPlane