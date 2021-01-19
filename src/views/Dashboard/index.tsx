import React, { useContext } from "react"
import Header from "../../Components/Header"
import { RouteComponentProps } from "@reach/router"
import classes from "./index.module.css"
import { GlobalContext } from "../.."
import Tasklist from "../../Components/TaskList/index"
interface DasboardProps extends RouteComponentProps {}
const Index: React.FC<DasboardProps> = () => {
  const context = useContext(GlobalContext)
  return (
    <>
      <Header text="Logout" />
      <div className={classes.content}>
        <p className={classes.welcome}>Welcome</p>
        <p className={classes.name}>{context.user?.user_metadata.full_name}</p>
        <Tasklist />
      </div>
    </>
  )
}

export default Index
