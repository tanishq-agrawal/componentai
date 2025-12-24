import React, { useEffect, useState } from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NoPage from './pages/NoPage'

const App = () => {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home theme={theme} setTheme={setTheme} />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
