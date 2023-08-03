import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import FirebaseIcon from './FirebaseIcon';
const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { user } = useUserContext();

  return (
    <section className='position-sticky top-0 z-1'>
      <MDBNavbar expand='lg' dark bgColor='dark'>
        <MDBContainer fluid className='gap-2'>
          <Link to={'/'}>
            <div className=' hstack gap-2 text-light'>
              <FirebaseIcon />
              <h1 className='fs-6 fw-bold mb-0'>Firebase Authentication</h1>
            </div>
          </Link>

          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavbar(!showNavbar)}>
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavbar} navbar id='navbarColor02'>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0 gap-2 justify-content-end align-items-center'>
              <MDBNavbarItem className='active'>
                <Link to='/' className='text-light'>
                  Home
                </Link>
              </MDBNavbarItem>
              {!user ? (
                <>
                  <MDBNavbarItem>
                    <Link to='/register' className='text-light'>
                      Register
                    </Link>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <Link to='/login' className='text-light'>
                      Login
                    </Link>
                  </MDBNavbarItem>
                </>
              ) : (
                <>
                  <MDBNavbarItem>
                    <Link to='/dashboard' className='text-light'>
                      Dashboard
                    </Link>
                  </MDBNavbarItem>
                  <p className='mb-0 text-light'>{user.displayName}</p>
                </>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </section>
  );
};

export default Navbar;
