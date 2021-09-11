import {connect} from "react-redux";
import {mapStateToProps, mapDispatchToProps} from "./mapping";
import Calculator from "../react/Calculator";

const Container = connect(mapStateToProps, mapDispatchToProps)(Calculator);

export {Container};