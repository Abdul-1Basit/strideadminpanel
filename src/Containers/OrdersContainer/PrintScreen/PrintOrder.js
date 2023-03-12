import React from 'react';
import Typography from '../../../Components/Typography';
import { apiGetRequest } from '../../../Helpers/axiosRequests';
import { endpoints } from '../../../Helpers/dbConfig';
import moment from 'moment';
import SpinnerComponent from '../../../Components/SpinnerComponent';
 const PrintOrder=React.forwardRef((props,ref)=>{
    const [orderId,setOrderId]=React.useState(props.orderId.invId??null)
      const [order,setOrder]=React.useState(props.activeOrder??null);
      const [customer,setCustomer]=React.useState(null);
      const [products,setProducts]=React.useState(null);
      const getData=async()=>{
        const resp=await apiGetRequest(endpoints.getBillingDetails+parseInt(orderId));
      const {customerDetails,orderProducts}=resp.data.data;

     setOrder(resp.data.data.order[0])
     setCustomer(customerDetails[0])
     setProducts(orderProducts)
      
      }
    
  React.useEffect(()=>{
    setOrderId(props.orderId.invId)
    if(orderId){
  getData()
  }
  },[props.orderId,orderId])
  
      return(order&&customer&&products?
      <div ref={ref}
       style={{width:'100%',height:'auto',backgroundColor:'#fff',borderRadius:4,paddingLeft:20,paddingRight:20}}>
      
        <div style={{alignItems:'center',justifyContent:'center',display:'flex',flexDirection:'row',padding:20}}>
        <img alt="savoz logo" src='/ss.png' style={{width:'100%',maxWidth:50,height:35,objectFit:'contain'}}/>
          <img alt="savozzz" src='/savozText.png' style={{width:'100%',maxWidth:150,height:35,objectFit:'contain'}}/></div> 
   {/**Header */}
   <div style={{border:'2px dashed #ececec',padding:15,backgroundColor:'#fff',  boxShadow:'4px 4px 0 #e4e4e4'
  }}>
   <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
  <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
  <Typography alignment='left' title="Customer name: " fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  <Typography alignment='left' title={order.orderUserName} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
  <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
  <Typography alignment='left' title="Order#: " fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  <Typography alignment='left' title={order.orderId} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
   </div>
   <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
  <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
  <Typography alignment='left' title="Customer email: " fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  <Typography alignment='left' title={customer.email} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
  <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
  <Typography alignment='left' title="Order date: " fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  <Typography alignment='left' title={order.orderAssignedDate? moment(order.orderAssignedDate).format("DD/MM/YYYY"):''} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
   </div>
   <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
  <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
  <Typography alignment='left' title="Postal code: " fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  <Typography alignment='left' title={order.orderUserName} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
  <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
  <Typography alignment='left' title="Order time: " fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  <Typography alignment='left' title={order.orderAssignedTime?moment(order.orderAssignedTime,'HH:mm:ss').format('HH:mm'):''} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
   </div>
   <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
  <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
  <Typography alignment='left' title="Contact#: " fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  <Typography alignment='left' title={customer.phone} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
  <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
  <Typography alignment='left' title="Time Slot: " fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  <Typography alignment='left' title={""} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
   </div>
   <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
  <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
  <Typography alignment='left' title="Delivery Address: " fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  <Typography alignment='left' title={customer.address} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
  <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}}>
  <Typography alignment='left' title="Instructions: " fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  <Typography alignment='left' title={""} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
   </div>
   </div>
   {/**Body */}
   <div>
     <br/>
     {/**List of products */}
     <div style={{}}>
  <table style={{width:'100%',}}>
    <thead>
      <tr style={{border:'2px dashed #ececec'}}>
        <th style={{textAlign:'left',padding:10,backgroundColor:'#f8f8f8',borderRight:'2px dashed #ececec'}}>
      <Typography alignment='left' title={"SKU"} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
      </th>
      <th style={{textAlign:'left',padding:10,backgroundColor:'#f8f8f8',borderRight:'2px dashed #ececec'}}>
      <Typography alignment='left' title={"Product Name"} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
      </th>
      <th style={{textAlign:'left',padding:10,backgroundColor:'#f8f8f8',borderRight:'2px dashed #ececec'}}>
      <Typography alignment='left' title={"Price"} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
      </th>
      <th style={{textAlign:'left',padding:10,backgroundColor:'#f8f8f8',borderRight:'2px dashed #ececec'}}>
      <Typography alignment='left' title={"QTY"} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
      </th>
      <th style={{textAlign:'left',padding:10,backgroundColor:'#f8f8f8'}}>
      <Typography alignment='left' title={"Amount"} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
      </th>
      </tr>
    </thead>
    <tbody>
      {products.map((item,index)=>{
        return(
          <tr key={index} style={{border:'2px dashed #ececec'}}>
            <td style={{padding:10,borderRight:'2px dashed #ececec'}}>
  
            <Typography alignment='left' title={item.productSKU} fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
            </td>
            
            <td style={{padding:10,borderRight:'2px dashed #ececec'}}>
            <Typography alignment='left' title={item.productName} fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
            </td>
            
            <td style={{padding:10,borderRight:'2px dashed #ececec'}}>
            <Typography alignment='left' title={'$'+item.unitPrice} fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
            </td>
            
            <td style={{padding:10,borderRight:'2px dashed #ececec'}}>
            <Typography alignment='left' title={item.quantity} fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
            </td>
  
            <td style={{padding:10}}>
              <Typography alignment='left' title={'$'+item.totalPrice} fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
            </td>
            
            </tr>
        )
      })}
      <tr >
        <td colSpan={2} style={{border:'0px',}}></td>
        <td colSpan={2} style={{padding:10,backgroundColor:'#f8f8f8',border:'2px dashed #ececec'}}>
        <Typography alignment='left' title="Sub Total:" fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  
        </td>
        <td style={{padding:10,backgroundColor:'#f8f8f8',borderRight:'2px dashed #ececec',borderBottom:'2px dashed #ececec',borderTop:'2px dashed #ececec',borderLeft:0}}>
        <Typography alignment='left' title={'$'+order.orderTotalPrice} fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  
          </td>
      </tr>
      <tr>
        <td colSpan={2} style={{border:'0px'}}></td>
   <td colSpan={2} style={{padding:10,backgroundColor:'#fff',border:'2px dashed #ececec'}}>
        <Typography alignment='left' title="Shipping Charges:" fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  
        </td>
        <td style={{padding:10,backgroundColor:'#fff',borderRight:'2px dashed #ececec',borderBottom:'2px dashed #ececec',borderTop:'2px dashed #ececec',borderLeft:0}}>
        <Typography alignment='left' title={'$'+order.orderDeliveryCharges} fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  
          </td>
      </tr>
      <tr>
        <td colSpan={2} style={{border:'0px'}}></td>
   <td colSpan={2} style={{padding:10,backgroundColor:'#fff',border:'2px dashed #ececec'}}>
        <Typography alignment='left' title="13% HST:" fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  
        </td>
        <td style={{padding:10,backgroundColor:'#fff',borderRight:'2px dashed #ececec',borderBottom:'2px dashed #ececec',borderTop:'2px dashed #ececec',borderLeft:0}}>
        <Typography alignment='left' title={'$'+order.orderTotalTax} fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  
          </td>
      </tr>
      <tr>
        <td colSpan={2} style={{border:'0px'}}></td>
   <td colSpan={2} style={{padding:10,backgroundColor:'#fff',border:'2px dashed #ececec'}}>
        <Typography alignment='left' title="Discount Coupon:" fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  
        </td>
        <td style={{padding:10,backgroundColor:'#fff',borderRight:'2px dashed #ececec',borderBottom:'2px dashed #ececec',borderTop:'2px dashed #ececec',borderLeft:0}}>
        <Typography alignment='left' title={'$'+order.orderTotalDiscount} fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  
          </td>
      </tr>
      <tr>
        <td colSpan={2} style={{border:'0px'}}></td>
        <td colSpan={2} style={{padding:10,backgroundColor:'#f8f8f8',border:'2px dashed #ececec'}}>
        <Typography alignment='left' title="Total:" fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  
        </td>
        <td style={{padding:10,backgroundColor:'#f8f8f8',borderRight:'2px dashed #ececec',borderBottom:'2px dashed #ececec',borderTop:'2px dashed #ececec',borderLeft:0}}>
        <Typography alignment='left' title={'$'+order.orderTotalPayable} fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  
          </td>
      </tr>
  
    </tbody>
  </table>
     </div>
     <br/>
     {/**Total */}
     {/* <div style={{display:'flex',alignItems:'flex-end',justifyContent:'right',flexDirection:'column'}}>
       
       <div style={{textAlign:'left',border:'2px dashed #ececec'}}>
    <div style={{display:'flex',flexDirection:'row'}}>
     <div style={{padding:10,backgroundColor:'#f8f8f8',borderBottom:'2px dashed #ececec'}}>
  <Typography alignment='left' title="Sub Total:" fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
  <div style={{padding:10,backgroundColor:'#f8f8f8',borderBottom:'2px dashed #ececec',}}>
  <Typography alignment='left' title={'$'+order.orderTotalPrice} fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  
  </div>
  </div>
  <div style={{display:'flex',flexDirection:'row'}}>
  <div style={{padding:10,backgroundColor:'#fff'}}>
  <Typography alignment='left' title="Shipping Charges:" fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
  <div style={{padding:10,backgroundColor:'#fff'}}>
  <Typography alignment='left' title={'$'+order.orderDeliveryCharges} fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  
  </div>
  </div>
  <div style={{display:'flex',flexDirection:'row'}}>
  <div style={{padding:10,backgroundColor:'#fff'}}>
  <Typography alignment='left' title="13% HST:" fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
  <div style={{padding:10,backgroundColor:'#fff'}}>
  <Typography alignment='left' title={'$'+order.orderTotalTax} fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  </div>
  </div>
  <div style={{display:'flex',flexDirection:'row'}}>
  <div style={{padding:10,backgroundColor:'#fff'}}>
  <Typography alignment='left' title="Discount Coupon:" fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
  <div style={{padding:10,backgroundColor:'#fff'}}>
  <Typography alignment='left' title={'$'+order.orderTotalDiscount} fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  </div>
  </div>
  <div style={{display:'flex',flexDirection:'row'}}>
     <div style={{padding:10,backgroundColor:'#f8f8f8'}}>
  <Typography alignment='left' title="Total:" fontFamily='Gilroy-Bold' color='#0F172A' type='label'/>
  </div>
  <div style={{padding:10,backgroundColor:'#f8f8f8'}}>
  <Typography alignment='left' title={'$'+order.orderTotalPayable} fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
  
  </div>
  </div>
  </div>
     </div> */}
   </div>
      </div>:<div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <SpinnerComponent size='large'/>
      </div>)
  });
  export default PrintOrder;