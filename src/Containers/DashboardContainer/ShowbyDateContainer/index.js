import React from "react";
import { Menu,Dropdown } from "antd";
import Typography from "../../../Components/Typography";
import {AiOutlineCalendar,AiOutlineDown} from 'react-icons/ai'

const ShowbyDateContainer=(props)=>{
    const [selectedIndex,setSelectedIndex]=React.useState('1')
    const menu = (
<Menu activeKey={selectedIndex} onClick={(e)=>{
    e.key==='1'?props.setOrderBy(7):(e.key==='2'?props.setOrderBy(30):props.setOrderBy(365));
    setSelectedIndex(e.key)
    
}} >
<Menu.Item key={'1'}>Last 7 Days</Menu.Item>
<Menu.Item key={'2'}>Last Month</Menu.Item>
<Menu.Item key={'3'}>Last Year</Menu.Item>
</Menu> 
      );
      const getSelectedValue=(val)=>{
          switch(val){
              case '2':
                  return<Typography type='label' color='#334155'fontFamily={'Gilroy-SemiBold'}  title='Last Month'/>
              case '3':
                  return<Typography type='label' color='#334155'fontFamily={'Gilroy-SemiBold'}  title='Last Year'/>
               default:
                   return<Typography type='label' color='#334155'fontFamily={'Gilroy-SemiBold'}  title='Last 7 Days'/>
                     

          }
      }
    return(
        <div style={{flexDirection:'row',display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:36,paddingBottom:28}}>
<Typography type='Heading' color='#0F172A'  title='Dashboard'/>
    <Dropdown overlay={menu} style={{backgroundColor:'transparent',border:'1px solid #E2E8F0'}}>
    <div style={{border:'1px solid #E2E8F0',
width:'100%',
maxWidth: 164,
height: 40,
boxSizing: 'border-box',
borderRadius: 5,display:'flex',alignItems:'center',justifyContent:'center'}}>

{getSelectedValue(selectedIndex)}
<AiOutlineCalendar color="#334155" size={20} style={{marginLeft:14.5,marginRight:8.5}}/>
<AiOutlineDown color='#334155' size={15}/>
</div>
</Dropdown>
</div>
    )
}
export default ShowbyDateContainer;