import React, { useEffect, useRef, useState } from 'react';
import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
  MDBContainer,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import { toast } from 'react-hot-toast';

const RegistrationForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const {
    user,
    registerUser,
    isLoading,
    isError,
    signInWithGoogle,
    signInWithGithub,
    signInWithFacebook,
    signInWithTwitter,
  } = useUserContext();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
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
    const name = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
    };
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      if (email !== '' && name !== '' && password !== '') {
        toast.loading('Waiting...', {
          duration: 4000,
          className: 'bg-warning text-light',
        });
        registerUser(email, name, password);
        toast.success('Success', {
          duration: 4000,
          icon: '✅',
          position: 'top-center',
          className: 'bg-success text-light',
        });
        navigate('/login');
      }
    } catch (error) {
      toast.error(isError, {
        duration: 4000,
        icon: '❌',
        position: 'bottom-center',
        className: 'bg-danger text-light',
      });
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
        <MDBContainer className='text-center'>
          <h2 className='text-center fw-bold'>Register</h2>
          <MDBRow className='justify-content-center'>
            <MDBCol
              lg={6}
              md={6}
              sm={10}
              className='bg-light p-5 col-11 shadow-3-strong'>
              <form onSubmit={handleSubmit}>
                <MDBRow className='mb-4'>
                  <MDBCol>
                    <MDBInput
                      label='First name'
                      id='firstName'
                      name='firstName'
                      type={'text'}
                      ref={firstNameRef}
                      required
                    />
                  </MDBCol>
                  <MDBCol>
                    <MDBInput
                      id='lastName'
                      label='Last name'
                      name='lastName'
                      type={'text'}
                      ref={lastNameRef}
                      required
                    />
                  </MDBCol>
                </MDBRow>
                <MDBInput
                  className='mb-4'
                  id='email'
                  label='Email address'
                  name='email'
                  type={'email'}
                  ref={emailRef}
                  required
                />
                <MDBInput
                  className='mb-4'
                  id='form3Example4'
                  label='Password'
                  name='password'
                  type={'password'}
                  autoComplete='current-password'
                  ref={passwordRef}
                  required
                />

                <MDBCheckbox
                  wrapperClass='d-flex justify-content-center mb-4'
                  id='form3Example5'
                  label='Subscribe to our newsletter'
                  checked={isChecked}
                  onChange={handleCheck}
                />

                {isChecked ? (
                  <MDBBtn type='submit' className='mb-4'>
                    Sign up
                  </MDBBtn>
                ) : (
                  <MDBBtn type='submit' className='mb-4' disabled>
                    Sign up
                  </MDBBtn>
                )}

                <div className='text-center'>
                  <p>
                    Already have an account? <Link to='/login'>Login</Link>
                  </p>
                  <p>or sign up with:</p>

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

export default RegistrationForm;
