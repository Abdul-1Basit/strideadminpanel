import React from "react";
import Chart from "react-apexcharts";
import Typography from "../../../Components/Typography";
import {BsArrowUpShort,BsArrowDownShort} from 'react-icons/bs'
import SpinnerComponent from "../../../Components/SpinnerComponent";
const NewCustomers=(props)=>{
  const [listOfNewCustomers,setListOfCustomers]=React.useState(props.listOfNewCustomers??null)

  const [series,setSeries]=React.useState([])
  const options = {
    chart: {
  
      toolbar: {
        show: false,
      },
      type: "area",
      height: 350,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width:130,
            height: 130
          }
        }
      }
    ],
    stroke: {
      curve: "smooth",
      colors: ["#E1552F"],
      width: 0.6
    },
    fill: {
      colors: ["#E1552F"],
      opacity: 0.24,
      type: "solid"
    },
    xaxis: {
      labels: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },   
  };
const getDifference=()=>{
if(!listOfNewCustomers)
{
  return '0';
}
else{
  if( !listOfNewCustomers.previousSpanEmployees[0].previouseEmployees || !listOfNewCustomers.employees[0].newEmployees)
  {
    return "0"
  }
  else
  {
    
 let reslt=((parseFloat(listOfNewCustomers.previousSpanEmployees[0].previouseEmployees)).toFixed(2)-(parseFloat(listOfNewCustomers.employees[0].newEmployees)).toFixed(2));
reslt=reslt/(parseFloat(listOfNewCustomers.employees[0].newEmployees)).toFixed(2);
reslt*=100;  
reslt= reslt.toFixed(2);
if(reslt>=0)
{
  return <>
  <BsArrowUpShort color="#10B981" style={{fontSize:25}}/>
  <Typography alignment='left' type='navMenuItem'fontFamily='Gilroy-Medium' color='#10B981'  title={reslt+'%'}/>
  </>
}
else{
  return(
  <>
<BsArrowDownShort color="red" style={{fontSize:25}} />
  <Typography alignment='left' type='navMenuItem'fontFamily='Gilroy-Medium' color='red'  title={reslt+'%'}/>
  </>)
}}
}
}
const pushToSeries=()=>{
  if(!listOfNewCustomers||listOfNewCustomers.employeesGraphData){
    return
  }
  let newarr=[]
  for(let i=0;i<listOfNewCustomers.employeesGraphData.length;i++)
{
  newarr.push(listOfNewCustomers.employeesGraphData[i].total)
}
setSeries(newarr)
}
  React.useEffect(()=>{
pushToSeries()
    setListOfCustomers(props.listOfNewCustomers)
  },[
    props.listOfNewCustomers
  ])
    return(<div className="chartCard">
<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
<div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'space-between'}}>


<Typography alignment='left' type='cardHeading' color='#0F172A'  fontFamily='Gilroy-Bold'  title='New Customers'/>

<Typography alignment='left' type='navMenuItem' color='#64748B'  fontFamily='Gilroy-Medium'  title={//listOfNewCustomers.employees[0].newEmployees?? 
  '0'}/>

</div>
<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
<Typography alignment='left' type='navMenuItem' color='#10B981'fontFamily='Gilroy-Medium'   title={"0"}/> 
  
</div>

</div>

<div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {!listOfNewCustomers?
      <SpinnerComponent size='medium' />:
      (
      //   listOfNewCustomers.employeesGraphData.length<1?
      //   <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
           
      //   <Typography type='label' color='#0F172A' fontFamily='Gilroy-Medium' alignment="center"  title={'0'}/>
    
      //  </div>:
       <Chart
        series={series??[]}
        options={options}
        type="area"
        width="200"
      />
      )
      }
    </div> 
     </div>)
}
export default NewCustomers;