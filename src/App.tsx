import Threats from './pages/Threats'
import Report from './pages/Reports'
import { Routes, Route, HashRouter } from 'react-router'
import MainLayout from './pages/MainLayout'
import EventLog from './pages/EventLog'
function App() {
    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route path="/threats" element={<Threats />} />
                        <Route path="/events" element={<EventLog />} />
                        <Route path="/reports" element={<Report />} />
                    </Route>
                </Routes>
            </HashRouter>
        </div>
    )
}

export default App
