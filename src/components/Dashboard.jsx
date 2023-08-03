import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import UserProfile from './UserProfile';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading, logoutUser } = useUserContext();

  useEffect(() => {
    if (user === null) {
      return navigate('/login');
    } else {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    toast.success('Successfully logout', {
      duration: 4000,
      position: 'bottom-right',
      icon: '✨',
      className: 'bg-success text-light',
    });
    logoutUser();
  };

  return (
    <>
      {user ? (
        <>
          {isLoading ? (
            <MDBContainer className='text-center mt-5'>
              <MDBSpinner color='primary'>
                <span className='visually-hidden text-center'>Loading...</span>
              </MDBSpinner>
            </MDBContainer>
          ) : (
            <MDBContainer className='text-center'>
              <h1 className='text-center'>Dashboard</h1>
              <MDBRow>
                <MDBCol>
                  <UserProfile user={user} />
                </MDBCol>
              </MDBRow>
              <MDBBtn color='danger' onClick={handleLogout} className='mt-3'>
                Log out
              </MDBBtn>
            </MDBContainer>
          )}
        </>
      ) : (
        'No content'
      )}
    </>
  );
};

export default Dashboard;
