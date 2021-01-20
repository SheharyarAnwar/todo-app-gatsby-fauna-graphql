import React, { useState } from "react"
import Task from "../Task"
import classes from "./index.module.css"
import Add from "../../Assets/Add.svg"
declare global {
  interface KeyframeAnimationOptions {
    pseudoElement?: string
  }
}
const Index = () => {
  const underlineRef = React.createRef<HTMLDivElement>()
  const wrapperRef = React.createRef<HTMLDivElement>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)

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
          <Task title="Do something noice" />
          <Task title="Do something noice" />
          <Task title="Do something noice" />
          <Task title="Do something noice" />
          <Task title="Do something noice" />
          <Task title="Do something noice" />
          <Task title="Do something noice" />
          <Task title="Do something noice" />
          <Task title="Do something noice" />
          <Task title="Do something noice" />
        </div>
        <div className={classes.add} onClick={() => setModalOpen(true)}>
          <Add width={15} />
        </div>
      </div>
      <div
        style={{ display: modalOpen ? "flex" : "none" }}
        className={classes.modalWrapper}
        ref={wrapperRef}
        onClick={e => {
          wrapperRef.current === (e.target as Node) && setModalOpen(false)
        }}
      >
        <div className={classes.modal}>
          <h4>Tilte</h4>
          <input placeholder="Click To Add Text" type="text"></input>
          <button className={classes.add}>
            <Add width={15} />
          </button>
        </div>
      </div>
    </>
  )
}

export default Index
