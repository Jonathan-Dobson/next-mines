
import React from 'react'
import classesFrom from './functions/classesFromProps'

export default function classesFromProps(props) {
  const { children, style, onClick, onRightClick } = props
  return (
    <div {...style} className={classesFrom(props)}
      onClick={onClick ? onClick : undefined}
      onContextMenu={onRightClick ? onRightClick : (e) => { e.preventDefault() }}
    >{children}
    </div>
  )
}