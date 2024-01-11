import React from 'react'
import Div from '../Div'
import { ClickTypes } from '../types'

const Maybe = (props: ClickTypes) => {
  const onClick = props?.onClick
  const onRightClick = props?.onRightClick

  return (
    <Div Cell {...{ onClick, onRightClick }}>
      <div className="Flag-Container">
        <div className="Flag-Pole"></div>
        <div className="Flag-Area">
          <div className="Flag-Triangle"></div>
          <div className="Flag-Maybe"><b>?</b></div>
        </div>
      </div>
    </Div>
  )
}

export default Maybe