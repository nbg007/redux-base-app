import {createValidator, required} from '../../utils/validation'
import { Link } from 'react-router'
import {reduxForm} from 'redux-form'
import React, { PropTypes, Component } from 'react'
import { translate } from 'react-i18next/lib'


const validate = createValidator({
  username: [required],
  password: [required]
})

export class LoginFormComponent extends Component {
  render() {
    const {
          fields: {username, password},
          handleSubmit,
          submitting,
          error,
          style,
          t
        } = this.props
    return (
      <div className='component' style={style}>
        <p className='section-title'>{t('login.title')}</p>
        <form onSubmit={handleSubmit} className='basic-form clearfix'> 
          <div className='field'>
            <label>{t('username')}</label>
            <input type="text" placeholder="username" {...username}/>
            {username.touched && username.error && <div>{username.error}</div>}
          </div>
          <div className='field'>
            <label>{t('password')}</label>
            <input type="password" placeholder="password" {...password}/>
            {password.touched && password.error && <div>{password.error}</div>}
          </div>
          {error && <div>{error}</div>}
          <button disabled={submitting} type="submit" onClick={handleSubmit} className='button button-primary'>
            {submitting ? <i/> : <i/>} {t('submit')}
          </button>
        </form>
<<<<<<< HEAD:src/components/login.js
        <Interpolate parent='p' i18nKey='login.goRegister' component={registerComponent} className='info-text' />
=======
        {t('login.goRegister')}<Link to='/register'>{t('login.registerActionCall')}</Link>
>>>>>>> 568f86ffb35292286f82729c64c6075f78dcbe30:src/components/auth/login.js
      </div>
    )
  }  
}

LoginFormComponent.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
}

const LoginForm = reduxForm({
  form: 'login',
  validate,
  fields: ['username', 'password']
})(LoginFormComponent)

export default translate(['common'])(LoginForm)
