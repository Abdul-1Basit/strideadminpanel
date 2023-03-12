import React from "react";
import {getStyles} from './Styles'
const Wrapper = (props) => {
  
  return <div style={getStyles(props)}>{props.children}</div>;
};
export default Wrapper;
