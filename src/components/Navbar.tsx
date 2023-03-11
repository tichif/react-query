import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          My App
        </Link>

        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link
              className={`nav-link ${
                location.pathname === '/' ? ' active' : ''
              }`}
              to='/'
            >
              HomePage
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              className={`nav-link  ${
                location.pathname === '/posts' ? ' active' : ''
              }`}
              to='/posts'
            >
              Posts
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
