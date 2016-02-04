//action types
const APP_NAME = "base-app/";

export const GET_SESSION_FAILED = APP_NAME.concat("AUTH_GET_SESSION_FAILED")
export const GET_SESSION_SUCCEEDED = APP_NAME.concat("AUTH_GET_SESSION_SUCCEEDED")
export const GET_SESSION_ATTEMPTED = APP_NAME.concat("AUTH_GET_SESSION_ATTEMPTED")

export const LOGOUT_ATTEMPTED = APP_NAME.concat("AUTH_LOGOUT_ATTEMPTED")
export const LOGOUT_FAILED = APP_NAME.concat("AUTH_LOGOUT_FAILED")
export const LOGOUT_SUCCEEDED = APP_NAME.concat("AUTH_LOGOUT_SUCCEEDED")

export const LOGIN_ATTEMPTED = APP_NAME.concat("AUTH_LOGIN_ATTEMPTED")
export const LOGIN_FAILED = APP_NAME.concat("AUTH_LOGIN_FAILED")
export const LOGIN_SUCCEEDED = APP_NAME.concat("AUTH_LOGIN_SUCCEEDED")

export const REGISTER_SUCCEEDED = APP_NAME.concat("AUTH_REGISTER_SUCCEEDED")
export const REGISTER_ATTEMPTED = APP_NAME.concat("AUTH_REGISTER_ATTEMPTED")
export const REGISTER_FAILED = APP_NAME.concat("AUTH_REGISTER_FAILED")