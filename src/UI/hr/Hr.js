import React from 'react'
import classes from './Hr.module.css'

const Hr = (props) => {
    return (
        <hr className={classes.hr+" "+props.className}/>    
    )
}

export default Hr

