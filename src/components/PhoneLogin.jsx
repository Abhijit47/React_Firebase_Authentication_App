import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUserContext } from '../context/userContext';
const PhoneLogin = () => {
  // eslint-disable-next-line
  const [isChecked, setIsChecked] = useState(false);
  // eslint-disable-next-line
  const navigate = useNavigate();
  // eslint-disable-next-line
  const {
    // eslint-disable-next-line
    signInWithPhoneNumber,
    phoneNumber,
    verificationCode,
    // eslint-disable-next-line
    confirmationResult,
    // eslint-disable-next-line
    RecaptchaVerifier,
    // eslint-disable-next-line
    auth,
  } = useUserContext();

  // const handleSendCode = async () => {
  //   try {
  //     const confirmation = await auth.signInWithPhoneNumber(phoneNumber);
  //     setConfirmationResult(confirmation);
  //   } catch (error) {
  //     console.error('Error sending verification code:', error);
  //   }
  // };

  // const handleVerifyCode = async () => {
  //   try {
  //     await confirmationResult.confirm(verificationCode);
  //     console.log('Phone number is verified and user is logged in!');
  //   } catch (error) {
  //     console.error('Error verifying code:', error);
  //   }
  // };
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    'recaptcha-container',
    {
      size: 'normal',
      callback: (res) => {
        console.log(res);
      },
      'expired-callback': () => {
        console.log('expired');
      },
    }
  ).render();

  return (
    <div>
      <MDBContainer>
        <MDBTypography variant='h2' className='text-center fw-bold'>
          Login with your phone
        </MDBTypography>
        <MDBRow>
          <MDBCol>
            <MDBInput
              label='Phone Number'
              id='phone'
              type='tel'
              autoComplete='on'
              minLength={10}
              maxLength={10}
              placeholder='Enter phone number'
              value={phoneNumber}
              // onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <div id='recaptcha-container'></div>
        <MDBRow>
          <MDBCol>
            <MDBInput
              label='Verification Code'
              id='code'
              type='text'
              placeholder='Enter verification code'
              value={verificationCode}
              // onChange={(e) => setVerificationCode(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {/* <input
        type='tel'
        placeholder='Enter phone number'
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      /> */}
      {/* <button onClick={handleSendCode}>Send Verification Code</button> */}

      {/* <input
        type='text'
        placeholder='Enter verification code'
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      /> */}
      {/* <button onClick={handleVerifyCode}>Verify Code and Login</button> */}
    </div>
  );
};

export default PhoneLogin;
