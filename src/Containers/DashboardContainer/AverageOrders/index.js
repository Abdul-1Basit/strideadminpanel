import React from "react";
import Chart from "react-apexcharts";
import Typography from "../../../Components/Typography";
import SpinnerComponent from "../../../Components/SpinnerComponent";
import {BsArrowUpShort,BsArrowDownShort} from 'react-icons/bs'

const AverageOrders=(props)=>{

  const [listOfOrders,setListOfOrders]=React.useState(props.listOfOrders??null)

const [seriesName,setSeriesName]=React.useState(null)

const [series,setSeries]=React.useState([])
const getData=()=>{
  if(!props.listOfOrders){
    return[]
  }
  let temp=[];
  let data=[]
 
 temp=(props.listOfOrders.ordersGraphData.map((item,index)=>(item.period.toString().length>3?item.period.toString().substr(0,3):item.period.toString())))
 setSeriesName(temp)
data=props.listOfOrders.ordersGraphData.map((item,index)=>item.total)
let d=[{
 name:'years',
  data:data
}]
setSeries(d)
}
const options = {
    chart: {      
      toolbar: {
        show: false,
        height:200

      },
      type: "area",
      height: 370,
      width: 200,
      zoom: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 8,
        endingShape: "rounded",
        
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width:50,
            height: 150,
       
          }
        }
      }
    ],
    stroke: {
      curve: "smooth",
      colors: ["#E1552F"],
      width: 0.0
    },
    fill: {
      colors: ["#10B981"],
      opacity: 1
    },
    xaxis: {
   
      categories:seriesName
    },
    yaxis: {
 
      labels: {
  show: true,
        maxHeight:200,
        height:'100%',
        style: {
          colors: [],
          fontSize: '12px',
          marginTop:10,
        },
      },
    },
    tooltip: {
      enabled: false
    },    legend: {
      show: false
    },
    toolbar: {
      show: false,
    }
  };
 
React.useEffect(()=>{
setListOfOrders(props.listOfOrders)
 getData()
},[props.listOfOrders])

const getDifference=()=>{
  if(!listOfOrders)
  {
    return '0';
  }
  else{
    const {avgOrders,previousAvgOrders}=listOfOrders
    console.log('avgOrders[0].avgOrders && previousAvgOrders[0].previousAvgOrders'+avgOrders[0].avgOrders +' --'+ previousAvgOrders[0].previousAvgOrders)

     if(avgOrders[0].avgOrders && !previousAvgOrders[0].previousAvgOrders){
      return <>
      <BsArrowUpShort color="#10B981" style={{fontSize:25}}/>
      <Typography alignment='left' type='navMenuItem'fontFamily='Gilroy-Medium' color='#10B981'  title={'100%'}/>
      </>
    }

    else if(!avgOrders[0].avgOrders && previousAvgOrders[0].previousAvgOrders){
      return<> <BsArrowDownShort color="red" style={{fontSize:25}} />
      <Typography alignment='left' type='navMenuItem'fontFamily='Gilroy-Medium' color='red'  title={'100%'}/>
      </> 
    }
    else
    {
      
   let reslt=((parseFloat(listOfOrders.previousAvgOrders[0].previousAvgOrders)).toFixed(2)-(parseFloat(listOfOrders.avgOrders[0].avgOrders)).toFixed(2));
  reslt=reslt/(parseFloat(listOfOrders.previousAvgOrders[0].previousAvgOrders)).toFixed(2);
  reslt*=100;  
   
  console.log('result is '+reslt)
   if(isNaN(reslt))
   {
     return   <Typography alignment='left' type='navMenuItem'fontFamily='Gilroy-Medium' color='#10B981'  title={'0'}/>
   
   
   }
   else if(reslt>=0)
   {
     return <>
     <BsArrowUpShort color="#10B981" style={{fontSize:25}}/>
     <Typography alignment='left' type='navMenuItem'fontFamily='Gilroy-Medium' color='#10B981'  title={parseFloat(reslt).toFixed(2)+'%'}/>
     </>
   }
   else{
     return(
     <>
   <BsArrowDownShort color="red" style={{fontSize:25}} />
     <Typography alignment='left' type='navMenuItem'fontFamily='Gilroy-Medium' color='red'  title={parseFloat(reslt).toFixed(2)*-1+'%'}/>
     </>)
   }
  }
  }
  }
  
      return(<div className="chartCard">
<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
<div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'space-between'}}>


<Typography alignment='left' type='cardHeading' color='#0F172A'   title='Average Orders'/>
<Typography alignment='left' type='navMenuItem' color='#64748B'  fontFamily='Gilroy-Medium'  title={listOfOrders? isNaN(parseFloat(listOfOrders.avgOrders[0].avgOrders).toFixed(2))?'0':(parseFloat(listOfOrders.avgOrders[0].avgOrders).toFixed(2)):'0'}/>

</div>
<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
  
  {getDifference()}
    
</div>

</div>

<div style={{
        display: "flex",
        alignItems: 'baseline',
        justifyContent: 'right'
      }}
    >
      {!props.listOfOrders?      <SpinnerComponent size='medium' />:
      (props.listOfOrders.length<1?    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
           
      <Typography type='label' color='#0F172A' fontFamily='Gilroy-Medium' alignment="center"  title={'0'}/>
  
     </div>:    <Chart
        series={series??[]}
        options={options}
        type="bar"
        width="200"
        height={160}
        
      />)
}
   
    </div> 
     </div>)
}
export default AverageOrders;