import React from "react"
import Task from "../Task"
import classes from "./index.module.css"

declare global {
  interface KeyframeAnimationOptions {
    pseudoElement?: string
  }
}
const Index = () => {
  const underlineRef = React.createRef<HTMLDivElement>()

  const runUnderlineAnimation = (translation: number) => {
    underlineRef.current.animate(
      [{ transform: `translateX(${translation}%)` }],
      {
        easing: "cubic-bezier( 1, 0.01, 1, 0.95 )",
        pseudoElement: "::after",
        duration: 200,
        fill: "forwards",
      }
    )
  }
  const onInProgressClicked = () => {
    runUnderlineAnimation(0)
  }
  const onCompletedClicked = () => {
    runUnderlineAnimation(100)
  }
  return (
    <>
      <div className={classes.root}>
        <div className={classes.controls} ref={underlineRef}>
          <h4 onClick={onInProgressClicked}>In Progress</h4>
          <h4 onClick={onCompletedClicked}>Completed</h4>
        </div>
        <div className={classes.tasks}>
          <Task title="Do something noice" />
        </div>
      </div>
    </>
  )
}

export default Index
