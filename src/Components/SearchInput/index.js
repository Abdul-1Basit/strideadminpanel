import React from 'react'
import searchIcon from './../../Assets/Vector.jpg'
import { UserContext } from './../../Containers/UserContext/Context'
const SearchInput=(props)=>{
    const [userData,setUserData]=React.useContext(UserContext)
const setQuery=(e)=>
{
// if(e.target.value!==''){
    setUserData({...userData,
        changedQuery:true,
        topSearchQuery:e.target.value,
     
    })
// }
}
    return(
        <div style={{border:'1px solid #E2E8F0',height:'100%',maxHeight:40,width:'100%',maxWidth:460,boxSizing:'border-box',borderRadius:8,padding:10,backgroundColor:'#fff',display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
            <input type={'text'} placeholder={props.value} value={userData.topSearchQuery} //onChange={props.onChange} 
            onChange={(e)=>{setQuery(e)}}
            // onFocus={()=>{  setUserData({...userData,
    
            //     changedQuery:true
            // })}}
            style={{border:0,//color:'#94A3BB',
            outline:'none',width:'100%',maxWidth:460}}/>
            <img src={searchIcon} style={{width:16,height:16,}} alt='Search Icon'/>
        </div>
    )
}
export default SearchInput;