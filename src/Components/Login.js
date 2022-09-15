import React,{ useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Link } from 'react-router-dom';

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

import { RiLoginBoxLine } from "react-icons/ri";

import styles from "./styles/SignInModule.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import base_url from "./bootApi";
export default function Login() {
  const [resData, setResData] = useState(null);

  let navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
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
                //console.log(response);
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
                showWarningToast("Wrong username or password");
            }
        );

    };
    function showWarningToast(inputMessage) {
      toast.warn("Invalid email or password", {
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
      }}
      >
        <ToastContainer />
        <Formik
          validationSchema={schema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values, {setSubmitting}) => {
            postSignInInfo(values);
            setSubmitting(false);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isInValid,
            errors,
          }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
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
                <Form.Group as={Col} md="12" controlId="signInEmail" >
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"

                    onChange={(e)=>{setLoginRequest({...LoginRequest,username: e.target.value});}}
                    
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter username
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="signInPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={(e)=>{setLoginRequest({...LoginRequest,password: e.target.value});}}
                
                  />
  
                  <Form.Control.Feedback type="invalid">
                    Please enter your password
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button type="submit" variant="success" onClick={handleForm}>
                Sign In <RiLoginBoxLine />
              </Button>
               <b>Don't have an account.</b>
               <Row>
              <a href="/registration"> Register here</a> </Row>
            </Form>
          )}
        </Formik>
        
      </Container>
    );
  }