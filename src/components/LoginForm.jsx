import React, { useEffect, useRef, useState } from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useUserContext } from '../context/userContext';
const LoginForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const {
    user,
    loginUser,
    isLoading,
    signInWithGoogle,
    signInWithGithub,
    signInWithFacebook,
    signInWithTwitter,
  } = useUserContext();

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate, user]);

  const handleCheck = () => {
    if (isChecked === false) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      if (email !== '' && password !== '') {
        toast.loading('Waiting...', {
          duration: 4000,
          className: 'bg-warning text-light',
        });
        loginUser(email, password);
        toast.success('Successfully login', {
          duration: 4000,
          icon: '✅',
          position: 'top-center',
          className: 'bg-success text-light',
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Invalid credentials.', {
        duration: 4000,
        icon: '❌',
        position: 'bottom-center',
        className: 'bg-danger text-light',
      });
      navigate('/login');
    }
  };

  return (
    <>
      {isLoading ? (
        <MDBContainer className='text-center mt-5'>
          <MDBSpinner color='primary'>
            <span className='visually-hidden text-center'>Loading...</span>
          </MDBSpinner>
        </MDBContainer>
      ) : (
        <MDBContainer className='mt-4 text-center'>
          <h2 className='fw-bold'>Login</h2>
          <MDBRow className='justify-content-center'>
            <MDBCol
              lg={6}
              md={8}
              sm={10}
              className='bg-light p-5 col-11 shadow-3-strong'>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  className='mb-4'
                  type='email'
                  id='form2Example1'
                  label='Email address'
                  ref={emailRef}
                />
                <MDBInput
                  className='mb-4'
                  type='password'
                  id='form2Example2'
                  label='Password'
                  autoComplete='current-password'
                  ref={passwordRef}
                />

                <MDBRow className='mb-4'>
                  <MDBCol
                    lg={6}
                    md={6}
                    sm={6}
                    className='col-12 hstack justify-content-center'>
                    <MDBCheckbox
                      id='form2Example3'
                      label='Remember me'
                      checked={isChecked}
                      onChange={handleCheck}
                    />
                  </MDBCol>
                  <MDBCol lg={6} md={6} sm={6} className='col-12'>
                    <Link to='/resetpassword'>Forgot password?</Link>
                  </MDBCol>
                </MDBRow>

                {isChecked ? (
                  <MDBBtn type='submit' className='mb-4'>
                    Login
                  </MDBBtn>
                ) : (
                  <MDBBtn type='submit' className='mb-4' disabled>
                    Login
                  </MDBBtn>
                )}

                <div className='text-center'>
                  <p>
                    Not a member? <Link to='/register'>Register</Link>
                  </p>
                  <p>or sign in with:</p>

                  <MDBBtn floating color='secondary' className='mx-1'>
                    <MDBIcon fab icon='google' onClick={signInWithGoogle} />
                  </MDBBtn>

                  <MDBBtn floating color='secondary' className='mx-1'>
                    <MDBIcon fab icon='github' onClick={signInWithGithub} />
                  </MDBBtn>

                  <MDBBtn floating color='secondary' className='mx-1'>
                    <MDBIcon
                      fab
                      icon='facebook-f'
                      onClick={signInWithFacebook}
                    />
                  </MDBBtn>

                  <MDBBtn floating color='secondary' className='mx-1'>
                    <MDBIcon fab icon='twitter' onClick={signInWithTwitter} />
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )}
    </>
  );
};

export default LoginForm;
