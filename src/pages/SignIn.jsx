import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, saveUser } from '../features/login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { fetchOrUpdateFreelance } from '../features/login'

async function loginUser(credentials) {
  console.log(credentials)
  return fetch('http://localhost:3001/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}

/**
* Display welcome message 
*

* @return void
* @author JP
* @version 1.0
*/

function SignIn() {
  const [email, setUserName] = useState()
  const [password, setPassword] = useState()
  const [emailError, setemailError] = useState('')

  let navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const tokenID = await loginUser({
      email,
      password,
    })
    if (tokenID.status === 200) {
      localStorage.setItem('token', tokenID.body.token)
      console.log(saveUser())
      dispatch(login())
      dispatch(fetchOrUpdateFreelance(tokenID.body.token))
      navigate('/user')
    } else if (tokenID.status === 400) {
      console.log(tokenID)
      setemailError(tokenID.message)
    }
  }

  const handleSaveUser = (e) => {
    e.preventDefault()
    dispatch(saveUser())
  }

  return (
    <div>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                onChange={(e) => handleSaveUser(e.target.value)}
              />
              <label for="remember-me">Remember me</label>
            </div>
            {emailError === '' ? (
              ''
            ) : (
              <div className="text-danger">{emailError}</div>
            )}
            <button className="sign-in-button" type="submit">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default SignIn
