import React from 'react'
import Styles from '../Styles'
import Typography from '../../../Components/Typography'
import { TimePicker,DatePicker,Radio ,notification} from 'antd';
import moment from 'moment';
import CustomButton from '../../../Components/CustomButton';
import  {apiPostRequest} from './../../../Helpers/axiosRequests'
import { endpoints } from '../../../Helpers/dbConfig';
const AssignmentModal=(props)=>{
   const [listOfErros,setListOfErrors]=React.useState({
     fullName:'',
     dateError:'',
     timeError:'',
     status:''
   })
   const[values,setValues]=React.useState({
    fullName:'',
    datee:'',
    time:'',
    
   })
    const [value, setValue] = React.useState(1);

   const findStatus=(val)=>{
     switch(val){
      
      case 2:
         return 'InProgress';
      case 3:
         return 'Delivered';
      case 4:
         return 'Cancelled';
         default:
          return 'Pending';
           

     }
   }
   const checkPast=(val)=>{
     let hr=parseInt( moment(val,'HH:mm').hours());
     let min=parseInt( moment(val,'HH:mm').minutes());
     let  currHr=parseInt( moment().hours())
     let currMin=parseInt( moment().minutes())
    // console.log('hr'+min+'  gethr'+currMin)
     if(hr<currHr){
       return true
     }
     else if(hr===currHr){
      if(min<currMin){
        return true
      }
     }
//console.log('returning false')
return false;
     //  if(min===0){
    //    return hr;
    //  }
    //  else if(hr===0){
    //    return min;
    //  }
    //  else{
    //    return hr*min;
    //  }
   }
    const onChange=(time, timeString)=> {
      if(moment(values.datee).isSame(moment(new Date()).format('DD/MM/YYYY')))
      {
    
if(checkPast(timeString))
{
 // console.log('timeee')
  setListOfErrors({...listOfErros,timeError:"Time can't be in past"})
return;
      }    
      }
     setListOfErrors({...listOfErros,timeError:""})
     setValues({...values,time:timeString})
      }
      
const onDateChange=(date, dateString) =>{
  // console.log(moment(new Date()).format('DD/MM/YYYY'))
  // console.log(dateString)
 

    setListOfErrors({...listOfErros,dateError:""})
    setValues({...values,datee:dateString})
  }
  const setName=(e)=>{
   setValues({...values,fullName:e.target.value})
  }

  const handleSubmit= async()=>{
    if(!setErrors()){
      return;
    }
   // console.log('date'+values.datee+' '+moment(values.datee,'DD/MM/YYYY').format('YYYY-MM-DD'))
    //return
  
    try{
const res=await apiPostRequest(endpoints.assignOrder,{
  
    "orderId":parseInt(props.activeOrder.orderId),
    "riderName":values.fullName,
    //"orderAssignedDateTime":moment(values.datee+'T'+values.time, "YYYY-MM-DDTHH:mm").utc()
     "date":moment(values.datee,'DD/MM/YYYY').format('YYYY-MM-DD'),
    "time":values.time+':00',//moment(values.time).format('HH:mm:ss'),
    "orderStatus":findStatus(value)
})

if(res.status===200){
  props.successMessage(props.setShowAssignmentModal,values)
  return
}

}
catch(error){
//else{
  console.log(error)
  notification.error({
    message: `Failed to Assign Order!`,
    description:
    `error: ${error.response}`,
        placement:'topRight',
    duration:3,onClose: function(){
   props.setShowAssignmentModal(false)
   }});
  }

  }
  const setErrors=()=>{
   // console.log(values)
    if(!values.fullName){
   //   console.log('fullname true')
      setListOfErrors({...listOfErros,fullName:'Name is required!'})
    return false
    }
    else if(!values.datee)
    {
      setListOfErrors({...listOfErros,fullName:'',dateError:'Date is required!'})
      return false
    }

    else if(!values.time)
    {
      setListOfErrors({...listOfErros,fullName:'',dateError:'',timeError:'Time is required!'})
      return false
    }
return true
  }
  const onRadioChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return(<div style={{width:'100%'}}>
        <div style={Styles.flexStartItems}>
        <Typography alignment='center' fontFamily='Gilroy-Medium' type='label' color={'#0F172A'}  title={'Name'}/>
        <input placeholder='Full Name' style={Styles.bigInput} onChange={(e)=>setName(e)} type="text"/>
        <Typography alignment='center' fontFamily='Gilroy-Medium' type='label' color={'red'}  title={listOfErros.fullName}/>

        </div>
     <div style={Styles.rowItems} >
            <div style={Styles.flexStartItems}>
        <Typography alignment='center' fontFamily='Gilroy-Medium' type='label' color={'#0F172A'}  title={'Date'}/>
        <DatePicker onChange={onDateChange} format={'DD/MM/YYYY'}
         disabledDate={(current) => {
          let customDate = moment().format('DD/MM/YYYY');
          return current && current < moment(customDate, 'DD/MM/YYYY');
        }}  style={Styles.smallInput} />
        <Typography alignment='center' fontFamily='Gilroy-Medium' type='label' color={'red'}  title={listOfErros.dateError}/>

        </div>
        
        <div style={Styles.flexStartItems}>
        <Typography alignment='center' fontFamily='Gilroy-Medium' type='label' color={'#0F172A'}  title={'Time'}/>
        <TimePicker onChange={onChange}  defaultValue={moment('00:00:00', 'HH:mm')} format={"HH:mm"} style={Styles.smallInput}/>
        <Typography alignment='center' fontFamily='Gilroy-Medium' type='label' color={'red'}  title={listOfErros.timeError}/>

        </div>
        </div>
        
       
    
        <div style={Styles.flexStartItems}>
        <Typography alignment='center' fontFamily='Gilroy-Medium' type='label' color={'#0F172A'}  title={'Status'}/>

        <Radio.Group onChange={onRadioChange} value={value}>
      <Radio value={1}>Pending</Radio>
      <Radio value={2}>In progress</Radio>
      <Radio value={3}>Delivered</Radio>
      <Radio value={4}>Cancelled</Radio>
    </Radio.Group>
    <Typography alignment='center' fontFamily='Gilroy-Medium' type='label' color={'#0F172A'}  title={listOfErros.status}/>

        </div> 

        <CustomButton large={true} onClick={()=>{handleSubmit()}}  title="Assign"  />

        
    </div>)
}
export default AssignmentModal;