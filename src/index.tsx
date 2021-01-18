import React, { useEffect } from "react"
import netlifyIdentity from "netlify-identity-widget"
import { NetlifyWidget } from "./Interfaces"

declare global {
  interface Window {
    netlifyIdentity: NetlifyWidget
  }
}
const Index = ({ children }) => {
  useEffect(() => {
    window.netlifyIdentity = netlifyIdentity
    netlifyIdentity.init()
  }, [])
  return <>{children}</>
}

export default Index
