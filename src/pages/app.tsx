import React, { useEffect } from "react"
import { Router } from "@reach/router"
import Dashboard from "../views/Dashboard"
import ProtectedRouteWrapper from "../Components/ProtectedRouteWrapper"
import { navigate } from "gatsby"
const App = () => {
  window && navigate("/app/dashboard")
  return (
    <Router basepath="/app">
      <ProtectedRouteWrapper path="/dashboard" component={<Dashboard />} />
    </Router>
  )
}

export default App
