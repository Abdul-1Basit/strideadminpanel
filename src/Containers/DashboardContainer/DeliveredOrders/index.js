import React from "react";
import {RiTruckLine} from 'react-icons/ri'
import {Row,Col} from 'antd';
import Typography from "../../../Components/Typography";
import SpinnerComponent from "../../../Components/SpinnerComponent";
import { NoData } from "../../../Components/ReusableItems";
const DeliveredOrders=(props)=>{
  
    const [listOfDeliveredOrders,setListOfDeliveredOrders]=React.useState(props.listOfDeliveredOrders??null)
    React.useEffect(()=>{

setListOfDeliveredOrders(props.listOfDeliveredOrders)
    },[props.listOfDeliveredOrders])
    return(
        
        <div style={{paddingTop:24,flexDirection:'column',display:'flex',alignItems:'flex-start',justifyContent:'flex-start',marginBottom:8}} >
    <Typography type='Heading' color='#0F172A'  title='Delivered Orders'/>
    <br/>
    <div  style={{width:'100%'}}>
  
<table style={{border:0,borderRadius:'8px 8px 0px 0px',boxShadow:'0px 2px 0px rgba(0, 0, 0, 0.1)', width:'100%'}} border='0'>
 <thead>
  <tr  style={{backgroundColor:'#E2E8F0',paddingLeft:20,paddingRight:20,flexWrap:'wrap',justifyContent:'flex-start'}}>  
      <th style={{textAlign:'left',paddingLeft:20,paddingTop:14,paddingBottom:14,border:0}}>
      <Row>
           <Col xs={0} sm={24} md={24} lg={24} xl={24} xxl={24} >
 
          <Typography type='label'alignment='left' color='#0F172A'   fontFamily={'Gilroy-SemiBold'}  title='Order Id'/>
   </Col></Row>
      </th>
      <th style={{textAlign:'left',paddingRight:20,paddingTop:14,paddingBottom:14,border:0}}>
       
    <Typography type='label' color='#0F172A' fontFamily={'Gilroy-SemiBold'}  title='Customer'/>
    </th> <th style={{textAlign:'left',paddingRight:20,paddingTop:14,paddingBottom:14,border:0}}>
      
    <Typography type='label' color='#0F172A' fontFamily={'Gilroy-SemiBold'}  title='Order Value'/>
    </th>
    <th style={{textAlign:'left',paddingRight:20,paddingLeft:20,paddingTop:14,paddingBottom:14,border:0}}>
     <Typography type='label' color='#0F172A'  fontFamily={'Gilroy-SemiBold'} title='Delivery time'/>
    </th>
   </tr>
   </thead>
   <tbody>
   {
   listOfDeliveredOrders?
   (listOfDeliveredOrders.length===0?<NoData/>:listOfDeliveredOrders.map
   ((item,index)=>{
       return(
       <tr key={index} style={{backgroundColor:'#fff',flexWrap:'wrap'}}>
       <td  style={{textAlign:'left',paddingLeft:20,paddingRight:10,paddingTop:14,paddingBottom:14,border:0}}>
           <Row>
           <Col xs={0} sm={24} md={24} lg={24} xl={24} xxl={24} >
    <Typography type='label' color='#0F172A' fontFamily='Gilroy-Medium' title={item.orderId}/>
    </Col>
    </Row></td>
    
    <td style={{textAlign:'left',paddingRight:20,paddingTop:14,paddingBottom:14,border:0}}>
    <Typography type='label' color='#0F172A' fontFamily='Gilroy-Medium' title={item.orderUserName}/></td>
    
    
    <td  style={{textAlign:'left',paddingRight:20,paddingTop:14,paddingBottom:14,border:0}}>
    <Typography type='label' color='#0F172A' fontFamily='Gilroy-Medium' title={'$'+item.orderTotalPayable}/></td>

    <td style={{textAlign:'left',paddingRight:20,paddingTop:14,paddingBottom:14,border:0}}>
        { <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%',paddingTop:4,paddingBottom:4}}>
  <RiTruckLine color={item.status==='Pending'?'#FB923C':item.orderStatus==='Approved'?'#10B981':'#EF4444'} size={25} style={{marginRight:10}}/>
        <Typography alignment='center' fontFamily='Gilroy-Medium' type='label' color={item.orderStatus==='Pending'?'#FB923C':item.orderStatus==='Approved'?'#10B981':'#EF4444'}  title={'20 mins'}/></div>
    }
    </td>
       </tr>
   )})):<SpinnerComponent size='medium'/>
}
</tbody>
  </table>
</div>
    </div>
)}
export default DeliveredOrders