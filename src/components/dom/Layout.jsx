// src/components/dom/Layout.jsx
import { Suspense } from 'react'

const Layout = ({ children }) => {
  return (
    <>
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </div>
      <div style={{
        position: 'fixed',
        bottom: '4rem',
        left: '6rem',
        color: '#ffffff',
        fontFamily: 'Montserrat',
        fontSize: '5rem',
        fontWeight: '900',  // You can adjust this from 100 to 900
        letterSpacing: '0.1em',
        zIndex: 1000,
        pointerEvents: 'none',
      }}>
        /EARTH OUT OF JOINT
      </div>
    </>
  )
}

export default Layout