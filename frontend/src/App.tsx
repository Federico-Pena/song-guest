import './App.css'
import 'toastify-js/src/toastify.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SinglePlayerPage from './pages/SinglePlayerPage.tsx'
import MultiplayerPage from './pages/MultiplayerPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import RoomPage from './pages/RoomPage.tsx'
import { GameProvider } from './context/GameContext.tsx'
import { CountdownProvider } from './context/CountdownContext.tsx'
import { Navigation } from './components/Navigation/Navigation.tsx'
import { LoaderProvider } from './context/LoaderContext.tsx'
import { ToastProvider } from './context/ToastContext.tsx'
import { UserProvider } from './context/UserContext.tsx'

function App() {
  return (
    <Router>
      <LoaderProvider>
        <ToastProvider>
          <UserProvider>
            <CountdownProvider>
              <GameProvider>
                <div className="App">
                  <div className="background"></div>
                  <Navigation />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                      path="/single-player"
                      element={<SinglePlayerPage />}
                    />
                    <Route path="/multiplayer" element={<MultiplayerPage />} />
                    <Route path="/multiplayer/:id" element={<RoomPage />} />
                  </Routes>
                </div>
              </GameProvider>
            </CountdownProvider>
          </UserProvider>
        </ToastProvider>
      </LoaderProvider>
    </Router>
  )
}

export default App

/* const clear = (() => {
  const defined = (v) => v !== null && v !== undefined
  const timeout = setInterval(() => {
    const ad = [...document.querySelectorAll('.ad-showing')][0]
    if (defined(ad)) {
      const video = document.querySelector('video')
      if (video && defined(video)) {
        video.currentTime = video.duration
      }
    }
  }, 500)
  return function () {
    clearTimeout(timeout)
  }
})() */
