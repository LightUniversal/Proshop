import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ varient, children}) => {
  return (
    <Alert variant={varient}>
        {children}
    </Alert>
  )
};
// adding default props to a component
Message.defaultProps = {
    variant: "info"
};

export default Message
