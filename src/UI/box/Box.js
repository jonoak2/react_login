import React from 'react'
import classes from './Box.module.css'
const Box = (props) => {
    return (
        <div onClick={props.onClick} className={classes.box + " "+props.className}>
            {props.children}
        </div>
    )
}

export default Box
