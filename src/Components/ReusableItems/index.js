import React from "react";
import Typography from "../Typography";

export const getOrderStatus=(statu)=>{
    switch(statu){
        case 'Pending':
            return (<div style={{backgroundColor:'#FFEDD5',radius:5,width:'100%',height:'auto',maxWidth:101,paddingTop:4,paddingBottom:4,display:'flex',alignItems:'center',justifyContent:'center'}}>
<Typography alignment='center' fontFamily='Gilroy-Medium' type='label' color={'#E1552F'}  title={'Pending'}/>

            </div>);
        case 'InProgress':
            return (<div style={{backgroundColor:'#DBEAFE',radius:5,width:'100%',height:'auto',maxWidth:101,paddingTop:4,paddingBottom:4,display:'flex',alignItems:'center',justifyContent:'center'}}>
<Typography alignment='center' fontFamily='Gilroy-Medium' type='label' color={'#3B82F6'}  title={'In Progress'}/>

            </div>);
            
        case 'Delivered':
            return (<div style={{backgroundColor:'#D1FAE5',radius:5,width:'100%',height:'auto',maxWidth:101,paddingTop:4,paddingBottom:4,display:'flex',alignItems:'center',justifyContent:'center'}}>
<Typography alignment='center' fontFamily='Gilroy-Medium' type='label' color={'#10B981'}  title={'Delivered'}/>

            </div>);

default:
    return (<div style={{backgroundColor:'#FEE2E2',radius:5,width:'100%',height:'auto',maxWidth:101,paddingTop:4,paddingBottom:4,display:'flex',alignItems:'center',justifyContent:'center'}}>
    <Typography alignment='center' fontFamily='Gilroy-Medium' type='label' color={'#EF4444'}  title={'Cancelled'}/>
    
                </div>);
    
    }
}
export const NoData=()=>{
    return(
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
       
    <Typography type='label' color='#0F172A' fontFamily='Gilroy-Medium' alignment="center"  title={'No data available'}/>

   </div>)
}