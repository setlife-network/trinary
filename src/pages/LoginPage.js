import React, { useState, useEffect } from 'react';
import { ReactComponent as ReactImg } from '../images/sample.svg';
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import '../styles/App.scss';

function LoginPage() {
  const [loggedInUser, setLoggedInUser] = useState({
    id: null,
    email: '',
  });

  const handleGithubLogin = () => {
    setLoggedInUser({
      id: 100,
      email: 'vclafarga@gmail.com',
    });
  };

  return (
    <div className='appLogin'>
      <ReactImg className='image' />
      <span>
        <h2>Welcome to Trinary</h2>
      </span>
      <div className='image-button'>
        {loggedInUser.id === null && (
          <Button
            onClick={handleGithubLogin}
            variant='contained'
            color='primary'
            href='#contained-buttons'
          >
            <h3>Log in with your Github Account</h3>
            <GitHubIcon className='githubIcon' />
          </Button>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
