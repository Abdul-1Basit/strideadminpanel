import React from "react";
import Typography from "../../../Components/Typography";
import CustomButton from "../../../Components/CustomButton";
import { Upload, Input,Select,Radio,message,notification} from "antd";
//import imgg from './../../../Assets/passionFruit.png'
import SpinnerComponent from "../../../Components/SpinnerComponent";
import * as Yup from 'yup'
import union from './../../../Assets/Union.png'
//import moment from "moment";
import { Formik, Form } from 'formik';
import { apiPostRequest } from "../../../Helpers/axiosRequests";
import { endpoints } from "../../../Helpers/dbConfig";

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import imgg from './../../../Assets/uzer.jpg'
import Wrapper from "../../../Components/Wrapper";
const { Option } = Select;

const CloneUser=(props)=>{
  
  const[addingUser,setAddingUser]=React.useState(false)
 //const [userData,setUserData]=React.useContext(UserContext)
 const[fileList,setFileList]=React.useState([]);
const[uploading,setUploading]=React.useState(false);
 const [imageurl,setImageUrl]=React.useState(props.activeCategory.avatar)

 const [imageName,setImageName]=React.useState(props.activeCategory.profileImage)
 const [userType,setUserType]=React.useState(props.activeCategory.roleId??2);
const [status,setStatus]=React.useState(props.activeCategory.isActive??1)
const [userTypeError,setUserTypeError]=React.useState('')
React.useEffect(()=>{

},[props.activeCategory])
const handleUpload =async () => {
  // const { fileList } = this.state;
  if(fileList.length<1){
    alert('no file attached')
    return
  }
  
   const formData = new FormData();
   fileList.forEach(file => {
     formData.append('file', file);
   });
  //  this.setState({
  //    uploading: true,
  //  });
   setUploading(true)
  
  try{
  const response= await apiPostRequest(endpoints.userImageUpload,formData)

  if(response.status===200){
       message.success('Uploaded successfully!');
       setImageUrl(response.data.data.url)
    console.log('data is',response.data)   
  setImageName(response.data.data.imageName)
    setFileList([])
   }
  }catch(error) {
 
    
  message.error('Error: '+error.response.data.message)
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
  const updateUser=async(values)=>{
    setAddingUser(true)

  if(!props.activeCategory.profileImage&& !fileList){
        alert('Please add image!')
        setAddingUser(false)

        return
      }
      
      const formData = new FormData();
    fileList&& fileList.map(file=>formData.append("file",file))
        try{
  const response=await apiPostRequest(endpoints.addUser,{
    "email":values.emailAddress,
    "firstName":values.firstName,
    "lastName":values.lastName,
    "phone":'123456789',
    "roleId":userType,
    "isActive":status,
    "profileImage":imageName,

  "password":values.password,
  });

  if(response.status===200){
    setAddingUser(false)

    props.successMessage(props.setCloneModal,'add',values)
      return;
  
  }
  
    }
    catch(error){
      setAddingUser(false)

      notification.error({
        message: `Failed to add`,
        description:
          `error: ${error.response.data.message}`,
        placement:'topRight',
        duration:0,onClose: function(){ 
          props.setCloneModal(false)
        }});
    
    }
        
  }
  
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i} 
  >{i.toString(36) + i}</Option>);
}
 
    return(
        <div style={{display:'flex',flexDirection:'column',backgroundColor:'#fff',paddingRight:12,paddingLeft:12,border:0 ,width:'100%'   }}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:24,marginBottom:49,width:'100%'}}>
         <div><Typography alignment='left' title="Add user" fontFamily='Gilroy-Bold' color='#0F172A' type='Heading'/>
         </div>
         <div>
         <img src={union} alt='Close icon' onClick={()=>props.setCloneModal(false)} style={{width:20,height:20}}/>
         </div>
           </div>
 
       
<Formik
       initialValues={{
        firstName:props.activeCategory.firstName,
        lastName:props.activeCategory.lastName,
      //  avatar: "https://mashghol.com/savoz-backend/src/public/uploads/users/imgPlaceholder.png"
        emailAddress: props.activeCategory.email,

   
        password:props.activeCategory.password??'',
       }}
       validationSchema={Yup.object().shape({


        firstName:Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('First Name is required!'),
        lastName:Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Last Name is required!'),
        emailAddress:Yup.string().email().min(5, 'Too Short!').max(100, 'Too Long!').required('Email Address is required!'),
       password:Yup.string().min(8, 'Too Short!').max(16, 'Too Long!').required('Password is required!'),
        
        })}
       onSubmit={(values)=>updateUser(values)}
       enableReinitialize
       
     >
       {({ errors, isSubmitting,touched, values,  handleChange,
         handleBlur,
         handleSubmit }) => (
          <Form> <Wrapper type="flexCol" pR={12} pL={12} >

<div style={{display:'flex',width:'100%',flexDirection:'column',alignItems:'center',paddingLeft:12,paddingRight:12,}}>        
     <Wrapper type='colCenteral'>
   <img src={imageurl.toString()??imgg}  alt='UserImage' style={{width:156,height:156,borderRadius:'50%'}}/>
  <div style={{marginTop:-35,marginLeft:80,display:'flex',}}>
   <Upload  {...uploadProps} progress={{ strokeWidth: 2, showInfo: false }} onChange={()=>handleUpload()}>
       {uploading?<SpinnerComponent  size={'small'}/>:
 <img src={'/editImageIcon.png'} alt='Edit Icon' style={{width:32,height:32,borderRadius:'50%',
}} 

/>
}</Upload></div>
 </Wrapper>


    
   {/**First and Last Name*/}
 
 <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
 <div className="fieldDiv" style={{width:'100%'}}>
   
   <Wrapper type="rowStart" marginBottom={8}> 
            <Typography alignment='left' title="First name" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>

            <Typography alignment='left' title="*" fontFamily='Gilroy-Medium' color='#E1552F' type='label'/>

      </Wrapper>
      <input type={'text'}  
      name="firstName"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.firstName} 
                            className='inputStyle'
 />
{errors.firstName&&touched.firstName? <Typography alignment='left' title={errors.firstName} fontFamily='Gilroy-Medium' color='red' type='label'/>:''}
</div>
   <div className="fieldDiv" style={{width:'100%'}}>
   
   <Wrapper type="rowStart" marginBottom={8}> 
            <Typography alignment='left' title="Last name" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>

            <Typography alignment='left' title="*" fontFamily='Gilroy-Medium' color='#E1552F' type='label'/>

      </Wrapper>
      <input type={'text'} 
      name="lastName"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.lastName} 
     
                       className='inputStyle'
 />
         {errors.lastName&&touched.lastName? <Typography alignment='left' title={errors.lastName} fontFamily='Gilroy-Medium' color='red' type='label'/>:''}

   </div>

</div>
   {/**Role */}
   <div className="fieldDiv" style={{width:'100%'}}>
   
   <Wrapper type="rowStart" marginBottom={8}> 
            <Typography alignment='left' title="Role" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>

            <Typography alignment='left' title="*" fontFamily='Gilroy-Medium' color='#E1552F' type='label'/>

      </Wrapper>
    
      <Select
    showSearch
    placeholder="Select Role"
    optionFilterProp="children"
    size="large"
    defaultValue={userType}
    onChange={(val)=>{
    if(userTypeError){
      setUserTypeError(false)
    }
      setUserType(val)
    }}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    className="selectStyle"
  >
    <Option value={2}>Admin</Option>
    <Option value={3}>User</Option>
  </Select>
      {userTypeError&& <Typography alignment='left' title={'User Role is required!'} fontFamily='Gilroy-Medium' color='red' type='label'/>}


   </div>

     {/**Email     */}
     <div className="fieldDiv" style={{width:'100%'}}>
   
   <Wrapper type="rowStart" marginBottom={8}> 
            <Typography alignment='left' title="Email" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>

            <Typography alignment='left' title="*" fontFamily='Gilroy-Medium' color='#E1552F' type='label'/>

      </Wrapper>
        <input type={'email'}
name="emailAddress"
onChange={handleChange}
onBlur={handleBlur}
value={values.emailAddress} 

                       className='inputStyle'
 />
   {errors.emailAddress&&touched.emailAddress? <Typography alignment='left' title={errors.emailAddress} fontFamily='Gilroy-Medium' color='red' type='label'/>:''}


   </div>

   {/**Password     */}
   <div className="fieldDiv" style={{width:'100%'}}>
   
   <Wrapper type="rowStart" marginBottom={8}> 
            <Typography alignment='left' title="Password" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>

            <Typography alignment='left' title="*" fontFamily='Gilroy-Medium' color='#E1552F' type='label'/>

</Wrapper>   
      <Input.Password
  name="password"
   onChange={handleChange}
   onBlur={handleBlur}
   value={values.password} 
  
      size="large"
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                       className='inputStyle'

    />

     {errors.password&&touched.password? <Typography alignment='left' title={errors.password} fontFamily='Gilroy-Medium' color='red' type='label'/>:''}
 

   </div>
         {/**User Status */}
         <div className="fieldDiv" style={{width:'100%'}}>
   
   <Wrapper type="rowStart" marginBottom={8}> 
            <Typography alignment='left' title="Status" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>
      </Wrapper>
      <Radio.Group onChange={e=>{setStatus(e.target.value)}} defaultValue={props.activeCategory.isActive??1}
>
   <Radio value={1}><Typography alignment='left' title="Active" fontFamily='Gilroy-Medium' color='#64748B' type='label'/>
     </Radio>
   <Radio value={0}><Typography alignment='left' title="Inactive" fontFamily='Gilroy-Medium' color='#64748B' type='label'/>
    </Radio>
 </Radio.Group>

      {/* {statusError&& <Typography alignment='left' title={"Status is required!"} fontFamily='Gilroy-Medium' color='red' type='label'/>} */}

   </div>
     
       
     {/**Add User Button */}
     <div className="modalButtonStyle" style={{width:'100%'}}>
 {addingUser? <SpinnerComponent size={'small'}/> :<CustomButton large={true} onClick={()=>handleSubmit()} title="Add"  />// onClick={navigateToDashboard}
   }
</div>
   </div>
 </Wrapper>
  </Form>)}</Formik>

    </div>)
}

export default CloneUser