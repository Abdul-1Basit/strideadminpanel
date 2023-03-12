import React from 'react'
import { Spin } from 'antd';
const SpinnerComponent=(props)=>{
    return(
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}><Spin size={props.size}/></div>
    )
}
export default SpinnerComponent