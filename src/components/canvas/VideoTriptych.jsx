// src/components/canvas/VideoTriptych.jsx
import VideoPlane from './VideoPlane'

const VideoTriptych = () => {
  const videoUrls = [
    '/videos/RAIN.mp4',
    '/videos/RIVER.mp4',
    '/videos/SKY.mp4'
  ]
  
  const spacing = 1.8     // Spacing between videos
  const height = 3        // Height of videos
  const elevation = 1     // Height off ground
  
  return (
    <group position={[0, 0, -2]}> {/* Centered and slightly forward in the room */}
      {videoUrls.map((url, index) => {
        const xPos = (index - 1) * spacing
        return (
          <VideoPlane
            key={index}
            videoUrl={url}
            position={[xPos, height/2 + elevation, 0]}
          />
        )
      })}
    </group>
  )
}

export default VideoTriptych