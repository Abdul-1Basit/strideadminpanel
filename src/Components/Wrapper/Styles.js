const central = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const colCenteral = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  const rowEvenAlign = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  };
  const colStart = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };
  const rowStart={
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
 
  }
  const rowSpaced={
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
  }
  const flexCol={
    display: "flex",
    flexDirection: "column",
  }
  const rowEnd={display:'flex',flexDirection:'row',flex:1,alignItems:'flex-end',justifyContent:'flex-end'}
 export const getStyles = (props) => {
   let {type}=props;
 let selectedStyles={}
    switch (type) {
      case "colCenteral":
        selectedStyles= colCenteral;
        break;
      case "rowEvenAlign":
        selectedStyles= rowEvenAlign;
        break;
      case "colStart":
          selectedStyles= colStart;
          break;
      case "rowSpaced":
        selectedStyles= rowSpaced;
        break;
        
      case "rowStart":
        selectedStyles= rowStart;
        break;
        case "flexCol":
          selectedStyles=flexCol;
          break;
          case "rowEnd":
            selectedStyles=rowEnd;
            break;
      default:
          selectedStyles= central;
          break;
    }
    return {...selectedStyles,
      backgroundColor: props.backColor ?? "#fff",
      marginBottom:props.marginBottom??0,
      marginTop:props.marginTop??0,
      marginRight:props.marginRight??0,
      marginLeft:props.marginLeft??0,
      paddingBottom:props.pB??0,
      paddingTop:props.pT??0,
      paddingRight:props.pR??0,
      paddingLeft:props.pL??0,
      borderRadius:props.br??0,
       width:props.w??'auto',
       height:props.h??'auto',
       border:props.border??'0px',
       maxWidth:props.mW??'auto'

      }
  };