import React from 'react'
import { Box } from 'lucide-react'
import Button from './ui/Button';
import { useOutletContext } from 'react-router';

const Navbar = () => {
  const { isSignedIn, username, signIn, signOut } = useOutletContext<AuthContext>();

  const handleAuthClick = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (error) {
        console.log(`Puter signed out error : ${error}`);
      }
    }

    try {
      await signIn();
    } catch (error) {
      console.log(`Puter signed in error : ${error}`);
    }
  };

  return (
    <header className='navbar'>
      <nav className='inner'>
        <div className='left'>
          <div className='brand'>
            <Box className="logo" />
            <span className='name'>Roomify</span>
          </div>
          <div>
            <ul className='links'>
              <a href="#">Product</a>
              <a href="#">Pricing</a>
              <a href="#">Community</a>
              <a href="#">Enterprise</a>
            </ul>
          </div>
        </div>
        <div className='actions '>
          {isSignedIn ? (
            <>
              <span>{username ? `Hi, ${username} ` : 'Sign In'}</span>
              <Button size="sm" variant="secondary" onClick={handleAuthClick}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button className='login' size='sm' variant='ghost' onClick={() => signIn()}>
                Login
              </Button>
              <a href="#upload" className='cta'>Get Started</a>
            </>
          )}

        </div>
      </nav>
    </header>
  )
}

export default Navbar

