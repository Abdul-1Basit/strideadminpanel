import React from 'react';
import DropZoneComponent from './../../../../Components/DropZoneComponent'
import { message,notification } from 'antd';
import CustomButton from '../../../../Components/CustomButton';
import Typography from '../../../../Components/Typography';
import { apiPostRequest } from '../../../../Helpers/axiosRequests';
import { endpoints } from '../../../../Helpers/dbConfig';
import Wrapper from '../../../../Components/Wrapper';
const BulkEntry=(props)=>{
    const [fileList,setFileList]=React.useState(null)
  const [fileError,setFileError]=React.useState(false)
    const addBulk=async()=>{
    if(!fileList)
    {
      message.error('Please add a file')
      setFileError(true);
      return
    }
    let bodyFormData= new FormData();
    bodyFormData.append('file',fileList[0])
    try{
      const response=await apiPostRequest(endpoints.productBulkImport,bodyFormData);
       if(response.status===200){
       props.setAddModal(false)
      notification.success({
      message: response.data.message?response.data.message:"Products has been added",
      description:
        ""+response.data.data.msgForAlreadyExisitingProducts?response.data.data.msgForAlreadyExisitingProducts:response.data.data.msgWithBadDataProducts,
      placement:'topRight',
      duration:4,onClose: function(){ 
        props.tableRef.current && props.tableRef.current.onQueryChange()
  
      }});
          return;
      
      }
      
        }
        catch(error){
          console.log(error)
          console.log(error.response)
          notification.error({
            message: `Failed to add`,
            description:
           `error: ${(error.response.data.message||error.response.data)??`failed`}`,
              placement:'topRight',
            duration:2,onClose: function(){ 
            }});
        
        }}
      return(
       <Wrapper type="colStart">
            
           <div className="dropZoneDiv">
       <DropZoneComponent bulk={true} fileList={fileList} setFileList={setFileList}/>
           </div>
        {fileError &&  <Typography alignment='left' title="File is required" fontFamily='Gilroy-Medium' color='red' type='label'/>}
  
        {/**Add Product Button */}
        <Wrapper type="central" marginTop={56} marginBottom={50} w="100%">
        <CustomButton large={true} title="Add" onClick={addBulk}
         />
  </Wrapper>
          </Wrapper>
      )
  }
export default BulkEntry;  