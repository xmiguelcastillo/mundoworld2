import React from 'react';
import TopBar from './components/TopBar';
import LoginBox from './components/LoginBox';
function Login() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <TopBar />
      <LoginBox />
    </div>
  )
}
export default Login
