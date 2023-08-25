import { MDBContainer, MDBIcon, MDBTypography } from 'mdb-react-ui-kit';
import React from 'react';
import { Link } from 'react-router-dom';
import FirebaseIcon from './FirebaseIcon';

const Home = () => {
  return (
    <MDBContainer className='rounded-2 mt-5 p-5 text-center'>
      <MDBTypography variant='h1' className='text-dark'>
        <FirebaseIcon />
        Firebase Authentication System
      </MDBTypography>

      <Link
        to={'/register'}
        className='ripple ripple-surface ripple-surface-light btn btn-warning mt-3'>
        <MDBIcon
          fas
          icon='arrow-circle-right'
          iconType='solid'
          size='2x'
          color='light'
          animate='shake'
        />
      </Link>
    </MDBContainer>
  );
};

export default Home;
