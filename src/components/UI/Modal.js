import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

const Overlay = (props) => {
  return <div className={styles.modal}>{props.children}</div>;
};

const Modal = (props) => {
  const portalElement = document.getElementById("overlays");
  return (<Fragment>
      {ReactDOM.createPortal(<Backdrop onClose ={props.onClose}/>, portalElement)};
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalElement)};
  </Fragment>);
};

export default Modal;
