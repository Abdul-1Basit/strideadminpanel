import React from 'react';
import Styles from './Styles';
import { Button,Dropdown,Menu,Radio,message,Upload,notification } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Typography from '../../../Components/Typography';
import CustomButton from './../../../Components/CustomButton'
import { apiPostRequest } from '../../../Helpers/axiosRequests';
import {endpoints} from './../../../Helpers/dbConfig'
import SpinnerComponent from '../../../Components/SpinnerComponent';
import { UserContext } from '../../UserContext/Context';
import Wrapper from '../../../Components/Wrapper';
 const EditProfile=(props)=>{
     const[updatingProfile,setUpdatingProfile]=React.useState(false)
    const [userData,setUserData]=React.useContext(UserContext)
    const[fileList,setFileList]=React.useState([]);
   const[uploading,setUploading]=React.useState(false);
    const [imageurl,SetImageurl]=React.useState(null)
    const [firstName,setFirstName]=React.useState(userData.firstName??'');
    const [lastName,setlastName]=React.useState(userData.lastName??'')
    const [errorFirstName,setErrorFirstName]=React.useState('');
    const [errorLastName,setErrorLastName]=React.useState('')

   const handleUpload =async () => {
   if(fileList.length<1){
     alert('no file attached')
     return
   }
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file);
    });
    setUploading(true)

try{
  const response= await apiPostRequest(endpoints.adminProfilePictureUrl,formData)
  

if(response.status===200){
        message.success('Uploaded successfully!');
     SetImageurl(response.data.data.avatar)
     console.log(response.data.data.avatar)   
     setUserData({...userData,firstName:response.data.data.firstName,lastName:response.data.data.lastName,avatar:response.data.data.avatar})
     console.log(userData)
     setFileList([])
    }
}catch(error) {
  if(error.toString().includes('503'))
     {
      message.error('Server is Down');

     }
        message.error('upload failed.'+error);
      }
      finally {
    
setUploading(false)
}
  };

  const uploadProps = {
 
    onRemove: file => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        return {
          fileList: newFileList,
        };
    },
    beforeUpload: file => {
        setFileList ([...fileList, file])
      return false;
    },
    fileList,
  };

  React.useEffect(()=>{

  },[userData.avatar,imageurl])



const updateProfile= async()=>{
    if(!firstName){
setErrorFirstName('Required')
return
    }
    else if(!lastName){
        setErrorLastName('Required')
   return
    }
    setErrorFirstName('')
    setErrorLastName('')
const payLoad={
     "title":"Mr",
    "firstName":firstName,
    "lastName":lastName,
    "phone":userData.phone,
    "email":userData.email
}
try{
const response=await apiPostRequest(endpoints.adminProfileUpdate,payLoad);
if(response.status===200)
{
    notification.success({
        message: `Profile successfully updated!`,
        description:
          ``,
        placement:'topRight',
        duration:4, onClose: function(){
          props.setEditProfileModal(false)
         }
      });
      setUserData({...userData,firstName:response.data.data.firstName,lastName:response.data.data.lastName,avatar:response.data.data.avatar})

}
}catch(err){

    notification.error({
        message: `Failed to update profile!`,
        description:
          `${err}`,
        placement:'topRight',
        duration:4
      });
}
finally{
setUpdatingProfile(false)

}
  }
  const menu = (
    <Menu activeKey={(userData.roleId===3)?'2':'1'} 
    >
      <Menu.Item key="1" >Admin
      </Menu.Item>
      <Menu.Item key="2">User
      </Menu.Item>
      
      </Menu>
  );
    return(
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',border:0,backgroundColor:'#fff',paddingRight:24,paddingLeft:24,height:'100%'  ,width:'100%',maxWidth:486}}>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:24,marginBottom:49,width:'100%'}}>
      
      
      
      
      
      <div><Typography alignment='left' title="Edit Profile" fontFamily='Gilroy-Bold' color='#0F172A' type='Heading'/>
      </div>


      <div>
      <img src={'/Union.png'} alt='Close icon'  onClick={()=>{props.setEditProfileModal(false)}} style={{width:20,height:20}}/>

      </div>
        </div>
<div style={{display:'flex',width:'100%',flexDirection:'column',alignItems:'center',paddingLeft:24,paddingRight:24}}>        
        <div style={Styles.centerlizeColumn}>
      <img src={userData.avatar??'/userImage.png'}  alt='UserImage' style={{width:156,height:156,borderRadius:'50%'}}/>
     <div style={{marginTop:-35,marginLeft:80,display:'flex',}}>
      <Upload  {...uploadProps}showUploadList={false} onChange={()=>handleUpload()}>
          {uploading?<SpinnerComponent  size={'small'}/>:
    <img src={'/editImageIcon.png'} alt='Edit Icon' style={{width:32,height:32,borderRadius:'50%',
}} 

/>
}</Upload></div>
    </div>
      {/**First and Last Name     */}
    
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',width:'100%'}}>
    <div className="fieldDiv">
      <Wrapper type="rowStart" marginBottom={8} >
               <Typography alignment='left' title="First name" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>

               <Typography alignment='left' title="*" fontFamily='Gilroy-Medium' color='#E1552F' type='label'/>

         </Wrapper>
         <input type={'text'}  defaultValue={userData.firstName} onChange={(e)=>{
             setFirstName(e.target.value.trim())}}
             className="inputStyle" 
          />

 <Typography alignment='left' fontFamily='Gilroy-Medium' title={errorFirstName}color='red' type='smallest'/>

      </div>
      <div className="fieldDiv">
      <Wrapper type="rowStart" marginBottom={8} >
               <Typography alignment='left' title="Last name" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>

               <Typography alignment='left' title="*" fontFamily='Gilroy-Medium' color='#E1552F' type='label'/>

 </Wrapper>
         <input type={'text'} defaultValue={userData.lastName} onChange={(e)=>{
             setlastName(e.target.value.trim())}} className="inputStyle" 
             />
<Typography alignment='left' fontFamily='Gilroy-Medium' title={errorLastName}color='red' type='smallest'/>

       
      </div>
      </div>

      {/**Role */}
      <div className="fieldDiv" style={{width:'100%'}}>
      <Wrapper type="rowStart" marginBottom={8} >
               <Typography alignment='left' title="Role" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>

               <Typography alignment='left' title="*" fontFamily='Gilroy-Medium' color='#E1552F' type='label'/>

         </Wrapper>
       
         <Dropdown overlay={menu} disabled={true}
         >
      <Button disabled={true} style={{flexDirection:'row',
border: '1px solid #E2E8F0',height:46,width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <Typography alignment='left' title={(userData.roleId===3)?'User':'Admin'} fontFamily='Gilroy-Regular' color='#64748B' type='label'/>
<DownOutlined  //style={{paddingLeft:8}}
/>
      </Button>
    </Dropdown>

      </div>
    
        {/**Email     */}
    
        <div className="fieldDiv" style={{width:'100%'}}>
      <Wrapper type="rowStart" marginBottom={8} >
               <Typography alignment='left' title="Email" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>

               <Typography alignment='left' title="*" fontFamily='Gilroy-Medium' color='#E1552F' type='label'/>

         </Wrapper>
    <input type={'text'}
         disabled={true}
         value={userData.email}
         
         className="inputStyle" 
         />     
      </div>
   
      {/**Phone     */}
      <div className="fieldDiv" style={{width:'100%'}}>
      <Wrapper type="rowStart" marginBottom={8} >
               <Typography alignment='left' title="Phone number" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>

               <Typography alignment='left' title="*" fontFamily='Gilroy-Medium' color='#E1552F' type='label'/>

         </Wrapper>
         <input type={'text'}
         disabled={true}
         value={userData.phone}
         className="inputStyle" 
         />
      </div>
            {/**User Status */}
            <div className="fieldDiv" style={{width:'100%'}}>
      <Wrapper type="rowStart" marginBottom={8} >
               <Typography alignment='left' title="Status" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
         </Wrapper>
         <Radio.Group //onChange={e=>{setValue(e.target.value)}}
          disabled={true} value={userData.isActive?1:2}>
      <Radio value={1}><Typography alignment='left' title="Active" fontFamily='Gilroy-Medium' color='#64748B' type='label'/>
        </Radio>
      <Radio value={2}><Typography alignment='left' title="Inactive" fontFamily='Gilroy-Medium' color='#64748B' type='label'/>
       </Radio>
    </Radio.Group>

          
      </div>
          
        {/**Add Product Button */}
        <div  className="modalButtonStyle"style={{width:'100%'}} >
    {updatingProfile? <SpinnerComponent size={'small'}/> :<CustomButton large={true}  onClick={()=>updateProfile()} title="Update"  />// onClick={navigateToDashboard}
      }
</div>
      </div>
     
    </div>
    )
}

 export default EditProfile;