//action types
import { APP_NAME } from '../../config';
const MOD_PREFIX = APP_NAME + 'AUTH/';
export const GET_SESSION_FAILED = MOD_PREFIX.concat("GET_SESSION_FAILED")
export const GET_SESSION_SUCCEEDED = MOD_PREFIX.concat("GET_SESSION_SUCCEEDED")
export const GET_SESSION_ATTEMPTED = MOD_PREFIX.concat("GET_SESSION_ATTEMPTED")

export const LOGOUT_ATTEMPTED = MOD_PREFIX.concat("LOGOUT_ATTEMPTED")
export const LOGOUT_FAILED = MOD_PREFIX.concat("LOGOUT_FAILED")
export const LOGOUT_SUCCEEDED = MOD_PREFIX.concat("LOGOUT_SUCCEEDED")

export const LOGIN_ATTEMPTED = MOD_PREFIX.concat("LOGIN_ATTEMPTED")
export const LOGIN_FAILED = MOD_PREFIX.concat("LOGIN_FAILED")
export const LOGIN_SUCCEEDED = MOD_PREFIX.concat("LOGIN_SUCCEEDED")

export const REGISTER_SUCCEEDED = MOD_PREFIX.concat("REGISTER_SUCCEEDED")
export const REGISTER_ATTEMPTED = MOD_PREFIX.concat("REGISTER_ATTEMPTED")
export const REGISTER_FAILED = MOD_PREFIX.concat("REGISTER_FAILED")