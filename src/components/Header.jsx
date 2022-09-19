import logos from '../assets/argentBankLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { selectFirstName, selectLogin, selecsaveUser } from '../utils/selector'
import { useEffect } from 'react'
import { fetchUserNames } from '../features/login'

/**
 * Display Header depends of user log in / out
 *
 * @return void
 * @author JP
 * @version 1.0
 */

function Header() {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const userIsLogin = useSelector(selectLogin)
  const saveUser = useSelector(selecsaveUser)
  var token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      dispatch(fetchUserNames(token))
    }
  }, [dispatch, token])

  const handleLogOut = async (e) => {
    e.preventDefault()
    dispatch({
      type: 'login/reset',
    })
    if (!saveUser) {
      localStorage.removeItem('token')
    }
    navigate('/')
  }
  const firstName = useSelector(selectFirstName)

  if (userIsLogin) {
    return (
      <div>
        <nav className="main-nav">
          <Link to={`/`} className="main-nav-logo">
            <img
              className="main-nav-logo-image"
              src={logos}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          <div className="flex">
            <Link to={`/user`} className="main-nav-item flex-center">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="header-icon user-icon"
              />
              <span>{`${firstName}`}</span>
            </Link>
            <button
              className="main-nav-item flex-center sign-out-button"
              onClick={handleLogOut}
            >
              <FontAwesomeIcon
                icon={faSignOut}
                className="header-icon sign-out-icon"
              />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </div>
    )
  } else {
    return (
      <div>
        <nav className="main-nav">
          <Link to={`/`}>
            <img
              className="main-nav-logo-image"
              src={logos}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          <div>
            <Link to={`/sign-in`} className="main-nav-item flex-center">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="header-icon user-icon"
              />
              <span>Sign In</span>
            </Link>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header
