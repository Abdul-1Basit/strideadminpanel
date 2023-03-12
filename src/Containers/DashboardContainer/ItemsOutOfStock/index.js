import React from "react";
import Typography from "../../../Components/Typography";
import { endpoints } from "../../../Helpers/dbConfig";
import { apiGetRequest } from "../../../Helpers/axiosRequests";
import SpinnerComponent from "../../../Components/SpinnerComponent";
import { NoData } from "../../../Components/ReusableItems";
const ItemsOutOfStock=(props)=>{
    const [listOfItemsStock,setListOfItemsStock]=React.useState(props.listOfItemsStock??null)


const [arr,setArr]=React.useState(null);
const getProductCategories=async()=>{try{
  const res=await apiGetRequest(endpoints.productCategoryListingUrlAll)
  if(res.status===200){
      setArr(res.data.data)
      return
  }
  throw new Error('Failed to get categories list!')
}catch(err){
console.log(err)

}}
React.useEffect(()=>{

    setListOfItemsStock(props.listOfItemsStock)
    getProductCategories()
},[props.listOfItemsStock])
    return(
        <div style={{paddingTop:24,flexDirection:'column',display:'flex',alignItems:'flex-start',justifyContent:'flex-start',marginBottom:8}} >
    <Typography type='Heading' color='#0F172A'  title='Items out of stock'/>
    <br/>
    <div style={{width:'100%'}} >
  
<table style={{border:0,borderRadius:'8px 8px 0px 0px',boxShadow:'0px 2px 0px rgba(0, 0, 0, 0.1)',width:'100%'}} border='0'>
    <thead>
  <tr  style={{backgroundColor:'#E2E8F0',padidngLeft:20,paddingRight:20,flexWrap:'wrap'}}>  
      <th style={{textAlign:'left',paddingLeft:20,paddingTop:14,paddingBottom:14,border:0}}>
          <Typography type='label'  color='#0F172A'fontFamily={'Gilroy-SemiBold'}  title='Product Id'/>
      </th>
      <th style={{textAlign:'left',paddingRight:20,paddingLeft:20,paddingTop:14,paddingBottom:14,border:0}}>
       
    <Typography type='label' color='#0F172A' fontFamily={'Gilroy-SemiBold'} title='Name'/>
    </th> <th style={{textAlign:'left', paddingRight:20,paddingTop:14,paddingBottom:14,border:0}}>
     <Typography type='label' color='#0F172A' fontFamily={'Gilroy-SemiBold'} title='Category'/>
    </th>
   </tr>
   </thead>
   <tbody>
   {listOfItemsStock?
   
  (listOfItemsStock.length<1?<NoData/>

   :
   listOfItemsStock.map((item,index)=>{return(
       <tr key={index} style={{backgroundColor:'#fff',flexWrap:'wrap'}}>
       <td  style={{paddingLeft:30,paddingTop:14,paddingBottom:14,border:0}}>
    <Typography type='label' color='#0F172A' fontFamily='Gilroy-Medium'  title={item.productId}/></td>
    
    <td style={{paddingLeft:20,paddingRight:20,paddingTop:14,paddingBottom:14,border:0}}>
    <Typography type='label' color='#0F172A' fontFamily='Gilroy-Medium' title={(item.productItemName).substr(0,14)}/></td>
    
    <td  style={{paddingRight:0,paddingTop:14,paddingBottom:14,border:0}}>
    <Typography type='label' color='#0F172A' fontFamily='Gilroy-Medium' title={(arr&& arr.find((itm,ind)=>itm.id===item.productCategoryId)?arr.find((itm,ind)=>itm.id===item.productCategoryId).name:'Not Found')?? 'Not found'}/></td>
       </tr>
   )})):<div style={{display:'flex',flex:1,alignItems:'center',justifyContent:'center'}}>
   <SpinnerComponent size='medium'/>
   </div>
}</tbody>

  </table>
</div>
    </div>
    )
}
export default ItemsOutOfStock