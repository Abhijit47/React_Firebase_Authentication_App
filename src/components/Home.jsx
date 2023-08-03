import { MDBContainer } from 'mdb-react-ui-kit';
import React from 'react';
import FirebaseIcon from './FirebaseIcon';

const Home = () => {
  return (
    <MDBContainer className='bg-primary rounded-2 mt-5 p-5 text-center'>
      <h1 className='text-light'>
        <FirebaseIcon />
        Firebase Authentication System
      </h1>
    </MDBContainer>
  );
};

export default Home;
