import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/resident/Landing'
import Events from './pages/resident/Events'
import EventDetail from './pages/resident/EventDetail'
import SignUp from './pages/resident/SignUp'
import Confirmed from './pages/resident/Confirmed'
import CancelPin from './pages/resident/CancelPin'
import Dashboard from './pages/staff/Dashboard'
import Roster from './pages/staff/Roster'
import EditEvent from './pages/staff/EditEvent'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/events/:id/signup" element={<SignUp />} />
        <Route path="/events/:id/confirmed" element={<Confirmed />} />
        <Route path="/events/:id/cancel" element={<CancelPin />} />
        <Route path="/staff" element={<Dashboard />} />
        <Route path="/staff/events/:id" element={<Roster />} />
        <Route path="/staff/events/:id/edit" element={<EditEvent />} />
      </Routes>
    </BrowserRouter>
  )
}
