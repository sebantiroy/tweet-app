import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import axios from 'axios';
import base_url from './bootApi';
import Row from "react-bootstrap/Row";
export default function Registration() {
    useEffect(()=>{
        document.title="Register user"
    },[])
    const[SignupRequest,setSignupRequest]=useState({});
    const handleForm=(e)=>
    {
        
       console.log(SignupRequest);
       console.log(JSON.stringify(SignupRequest));
       postDatatoServer(JSON.stringify(SignupRequest));
       e.preventDefault();
    };
    const postDatatoServer=(data)=>
    {
        axios.post(`${base_url}/register`,data,{
            headers: {
            'Content-Type': 'application/json'
            }
          }).then(
            (response)=>
            {
                console.log(response);
                console.log("success");
            },
            (error)=>
            {
                console.log(error);
                console.log("error");
            }
        );

    };
  return (
    <Container
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
      width:'200vw',
      height: '200vh',
      
    }}
    >
    <Form onSubmit={handleForm} style={{width:'40%',flexdirection: 'column'}} >
    <Row className="mb-5 text-center">
                <h1 className="text-success">Sign In</h1>
              </Row>
    <Row>          
    <FormGroup>
      <Label for="firstName">First Name</Label>
      <Input type="text"  id="firstName" placeholder="with a placeholder" 
      onChange={(e)=>{setSignupRequest({...SignupRequest,firstName: e.target.value});}}
      
      />
    </FormGroup>
    </Row>
    <Row>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input type="text" id="lastName" placeholder="with a placeholder" 
          onChange={(e)=>{setSignupRequest({...SignupRequest,lastName: e.target.value});}}
          />
        </FormGroup>
        </Row>
        <Row>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email"  id="email" placeholder="with a placeholder" 
          onChange={(e)=>{setSignupRequest({...SignupRequest,email: e.target.value});}}
          
          />
        </FormGroup>
        </Row>
        <Row>
        <FormGroup>
          <Label for="username">username</Label>
          <Input type="text" id="username" placeholder="with a placeholder"
          onChange={(e)=>{setSignupRequest({...SignupRequest,username: e.target.value});}} />
        </FormGroup>
        </Row>
        <Row>
        <FormGroup>
          <Label for="password">password</Label>
          <Input type="password"  id="password" placeholder="with a placeholder" 
          onChange={(e)=>{setSignupRequest({...SignupRequest,password: e.target.value});}}/>
        </FormGroup>
        </Row>
        <Row>
        <FormGroup>
          <Label for="contactNumber">ContactNumber</Label>
          <Input type="text"  id="contactNumber" placeholder="with a placeholder" 
          onChange={(e)=>{setSignupRequest({...SignupRequest,contactNumber: e.target.value});}}/>
        </FormGroup>
        </Row>
        <Row>
            <Button color="success"> Register
            </Button>
            </Row>
        

        </Form>
        </Container>
    
  )
}
