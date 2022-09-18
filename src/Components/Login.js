import React,{ useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Link } from 'react-router-dom';


import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { RiLoginBoxLine } from "react-icons/ri";

import styles from "./styles/SignInModule.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import base_url from "./bootApi";
export default function Login() {
  const [resData, setResData] = useState(null);

  let navigate = useNavigate();


    useEffect(()=>{
        document.title="Login user"
    },[])
    const[LoginRequest,setLoginRequest]=useState({});
    const handleForm=(e)=>
    {
      e.preventDefault(); 
       postSignInInfo(JSON.stringify(LoginRequest));
      
    };
   
    const postSignInInfo=(data)=>
    {
        axios.post(`${base_url}/login`,data,{
            headers: {
            'Content-Type': 'application/json',
            
            }

          }).then(
            (response)=>
            {
                console.log(response);
                showSuccessMessage(response.data.message);
                console.log(response);
                console.log("success");
                localStorage.setItem("psnUserId", response.data.id);
                localStorage.setItem("psnUsername", response.data.username);
                localStorage.setItem("psnUserEmail", response.data.email);
  
                localStorage.setItem("psnToken", response.data.jwt);
                navigate("/newsfeed");
                
                
                
                
            },
            (error)=>
            {
                console.log(error);
                console.log("error");
                showWarningToast(error.response.data.message);
            }
        );

    };
    function showSuccessMessage(inputMessage) {
      toast.success(inputMessage, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    function showWarningToast(inputMessage) {
      toast.warn(inputMessage, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("toast");
    }
    return (
      <Container style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width:'500vw'
      }}>
        <ToastContainer/>
            <Form onSubmit={handleForm}
            
              className={styles.formContainer}
            //   style={{
            // //     width: '30%',
            // //    display: 'flex',
            // //   flexdirection: 'column',
            // //  justifycontent: 'center',
            //   }}
            >
              <Row className="mb-5 text-center">
                <h1 className="text-success">Sign In</h1>
              </Row>
              <Row className="mb-3">
                <FormGroup as={Col} md="12" >
                  <Label for="username">Username</Label>
                  <Input required type="text" id="username" placeholder="username"
                  
                    onChange={(e)=>{setLoginRequest({...LoginRequest,username: e.target.value});}}/>
                  
                  
                </FormGroup>
              </Row>
              <Row className="mb-3">
                <FormGroup as={Col} md="12">
                <Label for="password">Password</Label>
          <Input required type="password" id="password" placeholder="password"
          onChange={(e)=>{setLoginRequest({...LoginRequest,password: e.target.value});}}/>
  
                  
                </FormGroup>
              </Row>
              <Button color="success">
                Sign In <RiLoginBoxLine />
              </Button>
               <b>Don't have an account.</b>
               <Row>
              <a href="/registration"> Register here</a> </Row>
            </Form>
          
        
      </Container>
    );
  }