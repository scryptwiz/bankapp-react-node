import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { Link,useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

const Signup = () => {
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = React.useState(false);

    const errMsg = useSelector(state=>state.msg)

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };
    const dispatch = useDispatch();    
    const navigate = useNavigate();
    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: ''
    }
    const onSubmit = values => {
        setLoader(true)
        axios.post('http://localhost:5000/api/signup', values)
        .then(res=> {
            setLoader(false)
            let { message, status } = res.data
            dispatch({type:"SET_MSG", payload:{msg:message, status:status}})
            console.log(res.data);
            if (res.data.status === true) {
                navigate('/')
            } 
        })
        .catch(err=>{
            setLoader(false)
            let { message, status } = err
            dispatch({type:"SET_MSG", payload:{msg:message, status:status}})
        })
    }
    const validationSchema = Yup.object({
        firstname: Yup.string().required('Field Required'),
        lastname: Yup.string().required('Field Required'),
        email: Yup.string().email('Invalid Email Format').required('Field Required'),
        password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password field must contain 1 uppercase, 1 lowercase, 1 number, 1 special characters and must be up to 8 characters or more").required('Field Required!'),
        confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Field Required')
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
  return (
    <>
        <div className='flex h-screen items-center justify-center'>
            <div className='flex h-full 2xl:w-4/5 w-full'>
                <div className='w-full h-full overflow-y-auto flex flex-col justify-between px-10'>
                    {/* logo */}
                    <div className='py-7 w-full'>
                        <h4 className='text-gray-700 text-2xl font-medium tracking-widest animate__animated  animate__jackInTheBox animate__slow'>Kbank</h4>
                    </div>
                    {/* Form */}
                    <form autoComplete='off' className='xl:w-3/12 md:w-3/6 w-full mx-auto animate__animated  animate__zoomInRight animate__slow' onSubmit={formik.handleSubmit}>
                        <div>
                            <h4 className='mb-7 font-medium text-3xl text-gray-700 pl-1 tracking-wide'>Signup</h4>
                        </div>
                        {/* Firstname */}
                        <div className='mb-4'>
                            { formik.touched.firstname && formik.errors.firstname ? <><TextField fullWidth id="outlined-basic" error helperText={ formik.errors.firstname } name="firstname" onChange={formik.handleChange} value={formik.values.firstname} label="Firstname" size='small' required variant="outlined" onBlur={formik.handleBlur} aria-describedby="component-error-text"/> </> : <TextField fullWidth id="outlined-basic" name="firstname" onChange={formik.handleChange} value={formik.values.firstname} label="Firstname" size='small' required variant="outlined" onBlur={formik.handleBlur}/> }
                        </div>
                        {/* Lastname */}
                        <div className='mb-4'>
                            { formik.touched.lastname && formik.errors.lastname ? <><TextField fullWidth id="outlined-basic" name="lastname" error helperText={ formik.errors.lastname } onChange={formik.handleChange} value={formik.values.lastname} label="Lastname" size='small' required variant="outlined" onBlur={formik.handleBlur} aria-describedby="component-error-text"/> </> : <TextField fullWidth id="outlined-basic" name="lastname" onChange={formik.handleChange} value={formik.values.lastname} label="Lastname" size='small' required variant="outlined" onBlur={formik.handleBlur}/> }
                        </div>
                        {/* Email */}
                        <div className='mb-4'>
                            { formik.touched.email && formik.errors.email ? <><TextField fullWidth id="outlined-basic" name="email" onChange={formik.handleChange} value={formik.values.email} error helperText={ formik.errors.email } label="E-mail" size='small' required variant="outlined" onBlur={formik.handleBlur} aria-describedby="component-error-text"/></> : <TextField fullWidth id="outlined-basic" name="email" onChange={formik.handleChange} value={formik.values.email} label="E-mail" size='small' required variant="outlined" onBlur={formik.handleBlur}/> }
                        </div>
                        {/* Password */}
                        <div className='mb-4'>
                            { formik.touched.password && formik.errors.password ? <><TextField fullWidth id="outlined-basic" name="password" onChange={formik.handleChange} type='password' value={formik.values.password} error helperText={ formik.errors.password } label="Password" size='small' required variant="outlined" onBlur={formik.handleBlur} aria-describedby="component-error-text"/> </> : <TextField fullWidth id="outlined-basic" name="password" onChange={formik.handleChange} value={formik.values.password} type='password' label="Password" size='small' required variant="outlined" onBlur={formik.handleBlur}/> }
                        </div>
                        {/* confirm password */}
                        <div className='mb-4'>
                            { formik.touched.confirmpassword && formik.errors.confirmpassword ? <><TextField fullWidth id="outlined-basic" name="confirmpassword" onChange={formik.handleChange} value={formik.values.confirmpassword} type='password' error helperText={ formik.errors.confirmpassword } label="Confirm Password" size='small' required variant="outlined" onBlur={formik.handleBlur} aria-describedby="component-error-text"/> </> : <TextField fullWidth id="outlined-basic" name="confirmpassword" onChange={formik.handleChange} value={formik.values.confirmpassword} type='password' label="Confirm Password" size='small' required variant="outlined" onBlur={formik.handleBlur}/> }
                        </div>
                        {/* Signup button */}
                        <div className='mb-5'>
                            { loader ? 
                                <button disabled type="button" className="text-white bg-blue-500 font-medium rounded text-sm px-5 py-2.5 text-center flex justify-center items-center w-full">
                                    <svg role="status" className="inline w-4 h-4 mr-3 text-center text-white animate-spin" viewBox="0 0 100 101" fill="none">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                    </svg>
                                    Loading...
                                </button> : 
                                <Button variant="contained" size='large' type='submit' name='submit' onClick={handleClick} fullWidth>SignUp</Button>
                            }
                            
                        </div>
                        {/* Snackbar */}
                        {!errMsg.status?<Stack spacing={2} sx={{ width: '100%' }}>
                            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                    {errMsg.msg}
                                </Alert>
                            </Snackbar>
                        </Stack>:<Stack spacing={2} sx={{ width: '100%' }}>
                            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    {errMsg.msg}
                                </Alert>
                            </Snackbar>
                        </Stack>}
                        {/* Signin option */}
                        <div>
                            <p className='text-sm text-gray-600 text-center tracking-wider'>Have an account? <Link to="/" className='underline text-blue-600 font-medium'>Signin</Link></p>
                        </div>
                    </form>
                    <div className='py-5 flex justify-between'>
                        <p className='text-xs tracking-widest md:block hidden'>@ Copyright 2022</p>
                        <nav>
                            <Link to='#' className='text-blue-600 text-xs'>Terms</Link>
                            <Link to='#' className='text-blue-600 ml-3 md:ml-5 md:text-sm text-xs'>Privacy</Link>
                            <Link to='#' className='text-blue-600 ml-3 md:ml-5 md:text-sm text-xs'>Security</Link>
                            <Link to='#' className='text-blue-600 ml-3 md:ml-5 md:text-sm text-xs'>Get in Touch</Link>
                        </nav>
                    </div>
                </div>
                {/* <div className='md:w-6/12 h-full md:block hidden' id='rights_bg'></div> */}
            </div>
        </div>
    </>
  )
}

export default Signup