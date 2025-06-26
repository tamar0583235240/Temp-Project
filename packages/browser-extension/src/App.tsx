import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { OverlayPopup } from './components/overlayPopup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <OverlayPopup></OverlayPopup>
      </>
  )
}

export default App
