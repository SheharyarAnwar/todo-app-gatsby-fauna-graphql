import React from "react"
import classes from "./index.module.css"
const Index = () => {
  return (
    <div className={classes.root}>
      <div className={classes.logo}>Todooo</div>
      <div
        className={classes.register}
        onClick={() => window.netlifyIdentity.open()}
      >
        Login
      </div>
    </div>
  )
}

export default Index
