import React, { PropTypes, Component } from 'react'
import {reduxForm} from 'redux-form'
import { Link } from 'react-router'
import {createValidator, required, maxLength, minLength, email} from '../../utils/validation'

const validate = createValidator({
  username: [required, minLength(2), maxLength(10)],
  password: [required, minLength(2), maxLength(10)]
});

export class RegisterFormComponent extends Component {
  render() {
    const {
          fields: {username, email, password},
          handleSubmit,
          submitting,
          error,
          style
        } = this.props
    return (
      <div className='component' style={style}>
        <p>Introduce tus datos para registrarte en DAH</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input type="text" placeholder="username" {...username}/>
            {username.touched && username.error && <div>{username.error}</div>}
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="password" {...password}/>
            {password.touched && password.error && <div>{password.error}</div>}
          </div>
          {error && <div>{error}</div>}
          <button disabled={submitting} type="submit" onClick={handleSubmit}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </form>
        Si ya estas registrado, <Link to='/Login'>haz login</Link>
      </div>
    )
  }
}

RegisterFormComponent.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
}

const RegisterForm = reduxForm({
  form: 'register',
  validate,
  fields: ['username', 'password']
})(RegisterFormComponent)

export default RegisterForm
