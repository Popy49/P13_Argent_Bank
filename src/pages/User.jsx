import PropTypes from 'prop-types'
import moneyIcon from '../assets/icon-money.png'
import chatIcon from '../assets/icon-chat.png'
import securityIcon from '../assets/icon-security.png'
import Header from '../components/Header'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrUpdateFreelance } from '../features/login'
import { selectFirstName } from '../utils/selector'
import UserNamesEdit from '../components/UserNamesEdit'

// async function userNames(token) {
//   console.log(token.token)
//   return fetch('http://localhost:3001/api/v1/user/profile', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + token.token,
//     },
//   }).then((data) => data.json())
// }

/**
* Display welcome message 
*

* @return void
* @author JP
* @version 1.0
*/

function User() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(fetchOrUpdateFreelance(token))
  }, [dispatch, token])

  return (
    <div>
      <main className="main bg-dark">
        <div className="header">{<UserNamesEdit />}</div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default User
