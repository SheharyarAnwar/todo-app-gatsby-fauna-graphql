import React from "react"
import classes from "./index.module.css"
export interface TaskProps {
  title: string
}

const Index: React.FC<TaskProps> = ({ title }) => {
  const beforeRef = React.createRef<HTMLSpanElement>()
  const afterRef = React.createRef<HTMLSpanElement>()
  const onCheckClicked = () => {
    runCheckedAnimation()
  }
  const runCheckedAnimation = () => {
    const iterableElements = Array.from([beforeRef.current, afterRef.current])
    iterableElements.forEach((el, i) => {
      el.animate([{ width: "100%", height: "100%" }], {
        duration: 200,
        pseudoElement: "::after",
        delay: i * 200,
        fill: "forwards",
      })
    })
  }
  return (
    <div className={classes.root}>
      <p>{title}</p>
      <div onClick={onCheckClicked} className={classes.check}>
        <span className={classes.before} ref={beforeRef} />
        <span className={classes.after} ref={afterRef} />
      </div>
    </div>
  )
}

export default Index
