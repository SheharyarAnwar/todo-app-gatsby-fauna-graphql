import React, { useEffect, useLayoutEffect, useState } from "react"
import netlifyIdentity from "netlify-identity-widget"
import { NetlifyWidget } from "./Interfaces"
import { navigate } from "gatsby"
import { ApolloProvider } from "@apollo/client"
import { createApolloClientWithTokenContext } from "./Apollo/client"
import { Provider } from "react-redux"
import store from "../src/Store/index"
export const GlobalContext = React.createContext<GlobalContextValues | null>(
  null
)
declare global {
  interface Window {
    netlifyIdentity: NetlifyWidget
  }
}
interface GlobalContextValues {
  user: netlifyIdentity.User | null
}

const Index = ({ children }) => {
  const [user, setUser] = useState<netlifyIdentity.User>(null)
  useEffect(() => {
    window.netlifyIdentity = netlifyIdentity
    netlifyIdentity.init()
    setUser(window.netlifyIdentity.currentUser())
    window.netlifyIdentity.on("logout", () => {
      window.netlifyIdentity.close()
      setUser(null)
      navigate("/")
    })
    window.netlifyIdentity.on("login", () => {
      window.netlifyIdentity.close()
      setUser(window.netlifyIdentity.currentUser())
      navigate("/app")
    })
  }, [])
  return (
    <>
      <ApolloProvider
        client={createApolloClientWithTokenContext(user?.token?.access_token)}
      >
        <Provider store={store}>
          <GlobalContext.Provider value={{ user: user }}>
            {children}
          </GlobalContext.Provider>
        </Provider>
      </ApolloProvider>
    </>
  )
}

export default Index
