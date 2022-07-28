import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserNames } from '../features/login'
import { selectFirstName, selectLastName } from '../utils/selector'
import { useNavigate } from 'react-router-dom'

/**
* Display welcome message 
*

* @return void
* @author JP
* @version 1.0
*/

function UserNamesEdit() {
  const dispatch = useDispatch()
  const firstName = useSelector(selectFirstName)
  const lastName = useSelector(selectLastName)
  const token = localStorage.getItem('token')
  let navigate = useNavigate()

  const [editMode, setEditMode] = useState(false)

  const handleClick = (e) => {
    setEditMode(!editMode)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const lastNameUpdate =
      e.target[2].value === '' ? lastName : e.target[2].value
    const firstNameUpdate =
      e.target[0].value === '' ? firstName : e.target[0].value
    dispatch(updateUserNames(token, firstNameUpdate, lastNameUpdate))
    setEditMode(!editMode)
    navigate('/user')
  }

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {`${firstName}`} {`${lastName}`}!
      </h1>
      {!editMode ? (
        <button className="edit-button" onClick={handleClick}>
          Edit Name
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex-row">
            <div className="flex-column">
              <label hidden>Prenom</label>
              <input
                className="input-change"
                type="text"
                placeholder={firstName}
              />
              <input
                type="submit"
                value="Save"
                className="button-change right-align"
              />
            </div>
            <div className="flex-column">
              <label hidden>Nom</label>
              <input
                className="input-change"
                type="text"
                placeholder={lastName}
              />
              <input
                type="button"
                value="Cancel"
                className="button-change left-align"
                onClick={handleClick}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default UserNamesEdit
