import { useState } from 'react'
import Nav from './components/Nav.jsx'
import ReportOverview from './pages/ReportOverview/ReportOverview.jsx'
import MarkersDetail from './pages/MarkersDetail/MarkersDetail.jsx'
import FacetsDetail from './pages/FacetsDetail/FacetsDetail.jsx'
import TranscriptDetail from './pages/TranscriptDetail/TranscriptDetail.jsx'
import styles from './App.module.css'

const SESSION = { sessionId: '9423', playerName: 'barry', drillName: 'Snipe Hunt' }

export default function App() {
  const [view, setView] = useState('overview')
  return (
    <div className={styles.app}>
      <Nav view={view} onNavigate={setView} onBack={() => {}} playerName={SESSION.playerName} sessionId={SESSION.sessionId} />
      {view === 'overview' && <ReportOverview session={SESSION} onNavigate={setView} />}
      {view === 'markers' && <MarkersDetail session={SESSION} />}
      {view === 'facets' && <FacetsDetail session={SESSION} />}
      {view === 'transcript' && <TranscriptDetail session={SESSION} />}
    </div>
  )
}
