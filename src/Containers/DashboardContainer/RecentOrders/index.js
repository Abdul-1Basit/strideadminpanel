import React from 'react'
import Typography from '../../../Components/Typography';
import SpinnerComponent from '../../../Components/SpinnerComponent';
import { getOrderStatus } from "../../../Components/ReusableItems";
import {Row,Col} from 'antd'
import { NoData } from '../../../Components/ReusableItems';
const RecentOrders=(props)=>{

    const [listOfRecentOrders,setListOfRecentOrders]=React.useState(props.listOfRecentOrders??null)
  
    React.useEffect(()=>{
       
setListOfRecentOrders(props.listOfRecentOrders)

    },[props.listOfRecentOrders])
    return(
        <div style={{width:'100%',paddingTop:24,flexDirection:'column',display:'flex',alignItems:'flex-start',justifyContent:'flex-start',marginBottom:8}} >
    <Typography type='Heading' color='#0F172A'  title='Recent Orders'/>
    <br/>
    <div style={{width:'100%'}} >
  
<table style={{border:0,borderRadius:'8px 8px 0px 0px',boxShadow:'0px 2px 0px rgba(0, 0, 0, 0.1)', width:'100%'}} border='0'>
 <thead>
  <tr  style={{backgroundColor:'#E2E8F0',paddingLeft:20,paddingRight:20,flexWrap:'wrap',}}>  
      <th style={{textAlign:'left',paddingTop:14,paddingLeft:20,paddingBottom:14,border:0, alignItems:'flex-start',justifyContent:'left'}}>
      <Row >
            <Col xs={0} sm={0} md={24} lg={24} xl={24} xxl={24} >
          <Typography type='label'alignment='center' color='#0F172A' fontFamily={'Gilroy-SemiBold'}  title='Order Id'/>
          </Col></Row>
      </th>
      <th style={{textAlign:'left',paddingTop:14,paddingBottom:14,border:0,justifyContent:'left'}}>
    <Typography type='label' color='#0F172A' fontFamily={'Gilroy-SemiBold'}  title='Customer'/>
    </th> <th style={{textAlign:'left',paddingTop:14,paddingBottom:14,border:0}}>
  
     <Typography type='label' color='#0F172A' fontFamily={'Gilroy-SemiBold'}  title='No of Items'/>
    </th> <th style={{textAlign:'left',paddingTop:14,paddingBottom:14,border:0,justifyContent:'left'}}>
      
    <Typography type='label' color='#0F172A'fontFamily={'Gilroy-SemiBold'}  title='Order Value'/>
    </th>
    <th style={{textAlign:'left',paddingTop:14,paddingBottom:14,border:0,justifyContent:'left'}}>
     <Typography type='label' color='#0F172A'fontFamily={'Gilroy-SemiBold'}  title='Status'/>
    </th>
   </tr></thead>
   <tbody >
   {listOfRecentOrders?
  (listOfRecentOrders.length===0?<NoData/>:
    listOfRecentOrders.map((item,index)=>{
        
       return(
       <tr key={index} style={{backgroundColor:'#fff',flexWrap:'wrap'}}>
       <td  style={{textAlign:'left',paddingLeft:20,paddingTop:14,paddingBottom:14,border:0}}
       ><Row >
            <Col xs={0} sm={0} md={24} lg={24} xl={24} xxl={24} >
<Typography type='label' color='#0F172A' fontFamily='Gilroy-Medium' title={item.orderId}/></Col>
    </Row></td>
    <td style={{textAlign:'left',paddingTop:14,paddingBottom:14,border:0}}>
    <Typography type='label' alignment='center' color='#0F172A' fontFamily='Gilroy-Medium' title={item.orderUserName===""?'Not Available':item.orderUserName}/></td>
    
    <td  style={{textAlign:'left',paddingTop:14,paddingBottom:14,border:0}} >
         <Typography type='label' color='#0F172A'fontFamily='Gilroy-Medium'  title={item.noOfItems??'24'}/></td>
    
    <td  style={{textAlign:'left',paddingTop:14,paddingBottom:14,border:0}}><Typography type='label' color='#0F172A' fontFamily='Gilroy-Medium' title={'$'+parseFloat(item.orderTotalPayable).toFixed(2)}/></td>

    <td style={{textAlign:'left',paddingTop:14,paddingBottom:14,border:0,paddingRight:20,}}>
     
            {getOrderStatus(item.orderStatus)}
    </td>
       </tr>
   )} )): 
<SpinnerComponent size='medium'/>}</tbody>

  </table>
</div>
    </div>
)}
export default RecentOrders;