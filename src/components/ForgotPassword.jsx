import React, { useRef, useState } from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBContainer,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUserContext } from '../context/userContext';

const ForgotPassword = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { forgotPassword } = useUserContext();

  const emailRef = useRef();

  const handleCheck = () => {
    if (isChecked === false) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    try {
      if (email !== '') {
        toast.loading('Waiting...', {
          duration: 4000,
          className: 'bg-warning text-light',
        });
        await forgotPassword(email);
        toast.success('Check your mail.', {
          duration: 4000,
          icon: '✅',
          position: 'top-right',
          className: 'bg-success text-light',
        });
        navigate('/login');
      }
    } catch (err) {
      toast.error('Something went wrong.', {
        duration: 4000,
        icon: '❌',
        position: 'bottom-center',
        className: 'bg-danger text-light',
      });
    }
  };

  // const forgotPasswordHandle = () => {
  //   const email = emailRef.current.value;
  //   if (email) {
  //     forgotPassword(email).then(() => emailRef.current.value);
  //   }
  // };
  return (
    <MDBContainer className='mt-5 text-center'>
      <h2 className='mb-3'>Reset password</h2>
      <MDBRow className='justify-content-center'>
        <MDBCol
          lg={6}
          md={6}
          sm={10}
          className='bg-light p-5 col-11 shadow-3-strong'>
          <form onSubmit={handleReset}>
            <MDBInput
              className='mb-4'
              type='email'
              id='form1Example1'
              label='Email address'
              ref={emailRef}
            />

            <MDBRow className='mb-4'>
              <MDBCol className='d-flex justify-content-center'>
                <MDBCheckbox
                  id='form1Example3'
                  label='Accept terms and conditions*'
                  checked={isChecked}
                  onChange={handleCheck}
                />
              </MDBCol>
            </MDBRow>

            {isChecked ? (
              <MDBBtn type='submit' className='mb-4'>
                Reset Password
              </MDBBtn>
            ) : (
              <MDBBtn type='submit' className='mb-4' disabled>
                Reset Password
              </MDBBtn>
            )}
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ForgotPassword;
