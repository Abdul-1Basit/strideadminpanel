import React from "react";
const Typography=(props)=>{
    const typeOfTypoGraphy=[
        {
            type:'signInSignUpHeading',
            fontSize:32
        },
        {
            type:'Heading',
            fontSize:24,
        },
        
        {
            type:'cardHeading',
            fontSize:18,
        },
        {
            type:'navMenuItem',
            fontSize:16
        },
        {
            type:'label',
            fontSize:14
        },
        
        {
            type:'smallest',
            fontSize:12
        },
        
    ]
const spanStyle={flexWrap:'wrap',textAlign:props.alignment??'left',fontFamily:props.fontFamily??'Gilroy-Bold',color:props.color,fontSize:typeOfTypoGraphy.find(item=>item.type===props.type).fontSize??14}
    return(
        <span style={spanStyle}>
{props.title}
        </span>
    )
}

export default Typography;