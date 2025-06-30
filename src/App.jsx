import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import HomePage from '@/components/pages/HomePage'
import MeetingRoomPage from '@/components/pages/MeetingRoomPage'
import PreMeetingLobbyPage from '@/components/pages/PreMeetingLobbyPage'
import SettingsPage from '@/components/pages/SettingsPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-slate-100">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="lobby/:roomCode" element={<PreMeetingLobbyPage />} />
            <Route path="meeting/:roomCode" element={<MeetingRoomPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </BrowserRouter>
  )
}

export default App