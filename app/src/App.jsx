import { useState } from 'react'
import Nav from './components/Nav.jsx'
import SessionPicker from './pages/SessionPicker/SessionPicker.jsx'
import ReportOverview from './pages/ReportOverview/ReportOverview.jsx'
import MarkersDetail from './pages/MarkersDetail/MarkersDetail.jsx'
import FacetsDetail from './pages/FacetsDetail/FacetsDetail.jsx'
import TranscriptDetail from './pages/TranscriptDetail/TranscriptDetail.jsx'
import Reflections from './pages/Reflections/Reflections.jsx'
import styles from './App.module.css'

export default function App() {
  const [currentSession, setCurrentSession] = useState(null)
  const [view, setView] = useState('overview')

  if (!currentSession) {
    return <SessionPicker onSelectSession={s => { setCurrentSession(s); setView('overview') }} />
  }

  return (
    <div className={styles.app}>
      <Nav
        view={view}
        onNavigate={setView}
        onBack={() => setCurrentSession(null)}
        playerName={currentSession.playerName}
        sessionId={currentSession.sessionId}
      />
      {view === 'overview'   && <ReportOverview session={currentSession} onNavigate={setView} />}
      {view === 'markers'    && <MarkersDetail session={currentSession} />}
      {view === 'facets'     && <FacetsDetail session={currentSession} />}
      {view === 'transcript'  && <TranscriptDetail session={currentSession} />}
      {view === 'reflections' && <Reflections session={currentSession} />}
    </div>
  )
}
