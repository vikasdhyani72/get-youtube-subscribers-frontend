import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SubscriberList from './components/SubscriberList'

const App = () => {
  return (
    <Router basename="/get-youtube-subscribers-frontend">
      <Routes>
        <Route path="/" element={<SubscriberList />} />
      </Routes>
    </Router>
  )
}

export default App
