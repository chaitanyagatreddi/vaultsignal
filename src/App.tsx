import Threats from './pages/Threats'
import Report from './pages/Reports'
import { Routes, Route, HashRouter, Navigate } from 'react-router'
import MainLayout from './pages/MainLayout'
import EventLog from './pages/EventLog'
import OnboardingDeck from './pages/components/OnboardingDeck'

function App() {
    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<OnboardingDeck />} />
                        <Route path="threats" element={<Threats />} />
                        <Route path="events" element={<EventLog />} />
                        <Route path="reports" element={<Report />} />
                    </Route>
                    {/* Encoded hashes like #%2F otherwise match nothing → blank page */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </HashRouter>
        </div>
    )
}

export default App
