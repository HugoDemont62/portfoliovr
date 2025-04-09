import './App.css'
import DeviceDetector from './components/DeviceDetector'
import {Analytics} from "@vercel/analytics/react"

function App() {
    return (
        <>
            <DeviceDetector/>
            <Analytics/>
        </>
    )
}

export default App
