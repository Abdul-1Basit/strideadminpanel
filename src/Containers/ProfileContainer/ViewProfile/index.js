import React from 'react';
import Styles from './Styles';
import { Button,Dropdown,Menu,Radio } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Typography from '../../../Components/Typography';
import CustomButton from '../../../Components/CustomButton'
import { UserContext } from '../../UserContext/Context';
import Wrapper from '../../../Components/Wrapper';
 const ViewProfile=(props)=>{

   const [userData]=React.useContext(UserContext)
   const [userType,setUserType]=React.useState((userData.roleId===3)?'User':'Admin')

   const menu = (
    <Menu activeKey={(userData.roleId===3)?'2':'1'} onClick={e=>{setUserType(e==='1'?'Admin':'User')}} >
      <Menu.Item key="1" >Admin
      </Menu.Item>
      <Menu.Item key="2">User
      </Menu.Item>
      
      </Menu>
  );

  return(
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',border:0,backgroundColor:'#fff',paddingRight:24,paddingLeft:24,height:'100%'  ,width:'100%',maxWidth:486}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:24,marginBottom:49,width:'100%'}}>
      <div><Typography alignment='left' title="Profile" fontFamily='Gilroy-Bold' color='#0F172A' type='Heading'/>
      </div>
      <div>
      <img src={'/Union.png'} alt='Close icon'  onClick={()=>{props.setViewProfileModal(false)}} style={{width:20,height:20}}/>

      </div>
        </div>
<div style={{display:'flex',width:'100%',flexDirection:'column',alignItems:'center',paddingLeft:24,paddingRight:24}}>        
        <div style={Styles.centerlizeColumn}>
      <img src={userData.avatar?? '/userImage.png'}  alt='UserImage' style={{width:156,height:156,borderRadius:'50%'}}/>
    <img src={'/editImageIcon.png'} alt='Edit Icon' style={{width:32,height:32,borderRadius:'50%',
marginTop:-35,marginLeft:80}}/>
    </div>
      {/**First and Last Name     */}
    
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',width:'100%'}}>
    <div className="fieldDiv">
      <Wrapper type="rowStart" marginBottom={8} >
               <Typography alignment='left' title="First name" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>

               <Typography alignment='left' title="*" fontFamily='Gilroy-Medium' color='#E1552F' type='label'/>

         </Wrapper>
         <input type={'text'} disabled={true} 
         
         value={userData.firstName??''}
         className="inputStyle" />
      </div>     
      <div className="fieldDiv">
      <Wrapper type="rowStart" marginBottom={8} >
               <Typography alignment='left' title="Last name" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>

               <Typography alignment='left' title="*" fontFamily='Gilroy-Medium' color='#E1552F' type='label'/>

         </Wrapper>
         <input type={'text'} disabled={true}
         
         value={userData.lastName??''}
         className="inputStyle" />
         
      </div>
      </div>

      {/**Role */}
      <div className="fieldDiv"  style={{width:'100%'}}>
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
      <div className="fieldDiv"  style={{width:'100%'}}>
      <Wrapper type="rowStart" marginBottom={8} >
               <Typography alignment='left' title="Phone number" fontFamily='Gilroy-Medium' color='#0F172A' type='label'/>

               <Typography alignment='left' title="*" fontFamily='Gilroy-Medium' color='#E1552F' type='label'/>

         </Wrapper>
         <input type={'text'}
         disabled={true}
         value={userData.phone}
        className="inputStyle"/>     
      </div>
            {/**User Status */}
            <div className="fieldDiv"  style={{width:'100%'}}>
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
        <div className='modalButtonStyle'  style={{width:'100%'}}>
      <CustomButton large={true} title="Edit" onClick={()=>{props.openEditProfile() }}
       />
</div>
      </div>
    </div>
    )
}

 export default ViewProfile;