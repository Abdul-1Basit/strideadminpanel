import React from 'react'
import Typography from '../../../Components/Typography'
import union from './../../../Assets/Union.png'

import {  TableStyling, theme } from "./../../../Constants";
import imgg from './../../../Assets/passionFruit.png'
import { tableIcons } from "./../../../Components/CustomTable/TableIcons";
import MaterialTable from "material-table";
import { MuiThemeProvider } from '@material-ui/core';
import {returnTypo} from './Constants'
import { Tooltip } from 'antd';

const SummaryModal=(props)=>{
    const [order,setOrder]=React.useState(props.activeOrder??{})
    React.useEffect(()=>{

        setOrder(props.activeOrder)
    },[props.activeOrder])
    return(<div style={{display:'flex',width:'100%',flexDirection:'column',padding:'10px 5px 10px 5px'}}>
        <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row',marginBottom:20}}>
        <div>
        <Typography alignment='center' fontFamily='Gilroy-Bold' type='navMenuItem' color={'#334155'}  title={"Order# "+order.orderId}/>
        </div>
        <div>
       <Tooltip title="Close" placement='topRight'>
         <img src={union} alt='Close icon' onClick={()=>props.setShowSummary(false)} style={{width:15,height:15}}/> 
       
        </Tooltip> </div>
        </div>
        {/**Product List */}
        <MuiThemeProvider theme={theme}>
    
    <div style={{alignItems:'center',justifyContent:'center',display:'flex',width:'100%',flex:1,backgroundColor:'#E5E5E5',marginBottom:20}}>
  
  
  
           <div style={{width:'100%', backgroundColor: "#FFF" }}>
          {order.products && <MaterialTable
    icons={tableIcons}
    style={{backgroundColor:'#FFF',boxShadow:'none',}}
    columns={[
        {
          title: "Image",
          field: "productItemThumbnail",
          headerStyle: TableStyling.columnStyle,
          render:rowData=><img src={rowData.productItemThumbnail??imgg} alt={rowData.subCategoryId+' image'} style={TableStyling.avatarStyle}/>
          
        },
        {
            title: "Sku",
            field: "productItemSKU",
            headerStyle: TableStyling.columnStyle,
            render:rowData=>returnTypo(rowData.productItemSKU)
          },
          {
              title: "Name",
              field: "productItemName",
              headerStyle: TableStyling.columnStyle,
              render:rowData=>returnTypo(rowData.productItemName)
            },
            
          {
            title: "Size",
            field: "productItemSize",
            headerStyle: TableStyling.columnStyle,
            render:rowData=>returnTypo(rowData.productItemSize)
          },
          
          {
            title: "Color",
            field: "productItemColor",
            headerStyle: TableStyling.columnStyle,
            render:rowData=>returnTypo(rowData.productItemColor)
          },
          
          {
            title: "Quantity",
            field: "productQuantity",
            headerStyle: TableStyling.columnStyle,
            render:rowData=>returnTypo(rowData.productQuantity)
          },
          
          {
            title: "Amount",
            field: "productUnitPrice",
            headerStyle: TableStyling.columnStyle,
            render:rowData=>returnTypo('$'+ (parseFloat(rowData.productUnitPrice)).toFixed(2))
          },
          
    ]}
        data={order.products}
    
        options={{  toolbar:false,
            rowStyle: {
              search:true,
              marginTop: 2,
              backgroundColor: "#fff",
              height:56,color:'#0F172A',
     
            },selection:false, 
             headerStyle: {
                backgroundColor: "#E2E8F0",
                borderTopLeftRadius: 8,
                textAlign:'left',
                alignItems:'flex-start',
              },
             sorting:true,
               pageSizeOptions:[5,10],
             paging:true}}
        title=""
      />}
               </div></div>
               </MuiThemeProvider>
               {/**Total Bill */}
<div style={{flexDirection:"column",display:'flex',alignItems:'flex-end',justifyContent:'right',width:'100%'}}>
  <table style={{border:0}}>
<tbody>
  <tr ><td style={{textAlign:'right',paddingRight:20}}>  <Typography alignment='center' fontFamily='Gilroy-Bold' type='navMenuItem' color={'#334155'}  title={"Sub Total"}/>
      </td>
      
      <td style={{textAlign:'right',paddingLeft:20}}>     <Typography alignment='center' fontFamily='Gilroy-Bold' type='navMenuItem' color={'#334155'}  title={'$'+parseFloat(order.orderTotalPrice).toFixed(2)??0}/>
</td></tr>
<tr><td style={{textAlign:'right',paddingRight:20}}>  <Typography alignment='center' fontFamily='Gilroy-Bold' type='navMenuItem' color={'#334155'}  title={"HST"}/>
      </td><td style={{textAlign:'right',paddingLeft:20}}>        <Typography alignment='center' fontFamily='Gilroy-Bold' type='navMenuItem' color={'#334155'}  title={order.orderTotalTax??0}/>
   </td></tr>
   <tr><td style={{textAlign:'right',paddingRight:20}}>   <Typography alignment='center' fontFamily='Gilroy-Bold' type='navMenuItem' color={'#334155'}  title={"Discount Coupon"}/>
          </td><td style={{textAlign:'right',paddingLeft:20}}>           <Typography alignment='center' fontFamily='Gilroy-Bold' type='navMenuItem' color={'#334155'}  title={'$'+parseFloat(order.orderTotalDiscount).toFixed(2)??0}/>
        </td></tr>
        <tr><td style={{textAlign:'right',paddingRight:20}}>      <Typography alignment='center' fontFamily='Gilroy-Bold' type='navMenuItem' color={'#334155'}  title={"Total"}/>
        </td><td style={{textAlign:'right',paddingLeft:20}}>           <Typography alignment='center' fontFamily='Gilroy-Bold' type='navMenuItem' color={'#334155'}  title={'$'+parseFloat(order.orderTotalPayable).toFixed(2)??0}/>
      </td></tr>
  </tbody>  </table>
</div>
    </div>
         )
}
export default SummaryModal;