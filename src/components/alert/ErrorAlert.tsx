import React, { useState } from "react";
import { Alert } from "react-bootstrap";
// import styles from "./Alert.module.scss";

interface ErrorAlertProps {
  error: string
}

export const ErrorAlert: React.FC<ErrorAlertProps> = (props) => {
  const [show, setShow] = useState(true);
  return (
    show === true ?
    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>
        {props.error}
      </p>
    </Alert> :
    <></>
  )
}