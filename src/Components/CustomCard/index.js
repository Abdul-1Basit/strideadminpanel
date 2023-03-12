import React from 'react';
import Styles from './Styles';
const CustomCard=(props)=>{
    return(
        <div style={Styles.cardStyle}>
{props.children}
        </div>
    )
}

export default CustomCard;