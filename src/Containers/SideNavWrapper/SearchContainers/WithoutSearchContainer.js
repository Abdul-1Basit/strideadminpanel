import React from 'react';
import {Dropdown,Modal,notification ,Spin,Menu} from 'antd'
import ViewProfile from '../../ProfileContainer/ViewProfile';
import EditProfile from "../../ProfileContainer/EditProfile";
import { GiHamburgerMenu } from "react-icons/gi";
import Wrapper from "../../../Components/Wrapper";
import { LoadingOutlined, } from '@ant-design/icons';
import profileImage from './../../../Assets/uzer.jpg';
import bellIcon from '../../../Assets/bellIcon.jpg';
import usflag from '../../../Assets/usaFlag.png'
import { MdLogout} from "react-icons/md";
import { UserContext } from '../../UserContext/Context';
import { useNavigate } from "react-router-dom";

const { SubMenu } = Menu;

const WithoutSearchContainer=(props)=>{
    const [userData]=React.useContext(UserContext)
    const [viewProfileModal,setViewProfileModal]=React.useState(false)
const [editProfileModal,setEditProfileModal]=React.useState(false)
    const navigate=useNavigate();
    const openEditProfile=()=>{
        setViewProfileModal(false);
        setEditProfileModal(true)
    }
    const logOut=()=>{
        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    notification.success({
    message: `Please wait....!`,
    
    description:
      `Logging out`,
    placement:'topRight',
    style:{
    },
    duration:2,onClose: function(){
        localStorage.removeItem('token');
    navigate('/Signin')
    
    },
    
    icon:<Spin indicator={antIcon} />,
    
    }
    
    );
    }
 
       
      const menuWhole=<Menu>
      <Menu.Item key="1">

<SubMenu style={{textAlign:'left'}} title="Language">

<Menu.Item >          <img src={usflag}alt='flag'style={{marginRight:8,}}/> English

</Menu.Item>

</SubMenu>
     </Menu.Item>
     <Menu.Divider />

<Menu.Item key="2">
<div onClick={()=>{logOut()}} className="menuItemDiv">
Logout
<MdLogout size={18}/>
</div>
</Menu.Item>
 </Menu>
    return(
    <div style={{width:'100%'}}>
             <div  className="profileModalDiv">
        <Modal
          visible={viewProfileModal}
          title=""
         onCancel={()=>setViewProfileModal(false)}
         closable={false}
   
      
         className="ModalStyle"
         footer={null}
          >
<ViewProfile  {...{setViewProfileModal,openEditProfile}}/>
          </Modal>   
          
        <Modal
          visible={editProfileModal}
          title=""
     
         onCancel={()=>setEditProfileModal(false)}
         closable={false}
         className="ModalStyle"
         footer={null}>
<EditProfile setEditProfileModal={setEditProfileModal}/>
          </Modal>    
          
          </div>
          <Wrapper type='rowSpaced' pT={12} pB={12} pL={40} pR={40} backColor='#fff'>
   
    <div style={{width:'100%'}}></div>
    <Wrapper type="rowEvenAlign"> 
    <img src={bellIcon} className="bellIcon" alt='Bell Icon'/>

    <div onClick={()=>setViewProfileModal(true)} className='userInfoDiv'>
    <span style={{marginRight:9,width:90}}>{userData.firstName+' '+userData.lastName}</span> 
    <img src={userData.avatar??profileImage} alt='profileLogo' className="profilImage"/>
    </div> 

    <Dropdown  overlay={menuWhole}>
        <GiHamburgerMenu style={{marginLeft:20}}size={25}/>
    </Dropdown>
  
    </Wrapper>
   
    </Wrapper>
    
    </div>)
}
export default WithoutSearchContainer;