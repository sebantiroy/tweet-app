import React from 'react'
import Login from './Login'
import { ToastContainer, toast } from 'react-toastify';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

export default function SignIn() {
  return (
    <Row className="mb-3">
    <Col sm="4" > </Col>
 <Col sm="4" >
   <Card className="text-center">
     <CardTitle class="justify-center"></CardTitle>
     <Login/>
   </Card>
 </Col>
 </Row>
  )
}
