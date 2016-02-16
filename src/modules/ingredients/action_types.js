import { APP_NAME } from '../../config';
const MOD_PREFIX = APP_NAME + 'INGREDIENTS';



export const LOAD_INGREDIENTS_ATTEMPTED = MOD_PREFIX+'_LOAD_ALL_ATTEMPTED'
export const LOAD_INGREDIENTS_SUCCEEDED = MOD_PREFIX+'_LOAD_ALL_SUCCEEDED'
export const LOAD_INGREDIENTS_FAILED = MOD_PREFIX+'_LOAD_ALL_FAILED'

export const LOAD_ONE_INGREDIENT_ATTEMPTED = MOD_PREFIX+'_LOAD_ONE_ATTEMPTED'
export const LOAD_ONE_INGREDIENT_SUCCEEDED = MOD_PREFIX+'_LOAD_ONE_SUCCEEDED'
export const LOAD_ONE_INGREDIENT_FAILED = MOD_PREFIX+'_LOAD_ONE_FAILED'


export const CREATE_INGREDIENT_ATTEMPTED = MOD_PREFIX+'_CREATE_ATTEMPTED'
export const CREATE_INGREDIENT_SUCCEEDED = MOD_PREFIX+'_CREATE_SUCCEEDED'
export const CREATE_INGREDIENT_FAILED = MOD_PREFIX+'_CREATE_FAILED'


export const UPDATE_INGREDIENT_ATTEMPTED = MOD_PREFIX+'_UPDATE_ATTEMPTED'
export const UPDATE_INGREDIENT_SUCCEEDED = MOD_PREFIX+'_UPDATE_SUCCEEDED'
export const UPDATE_INGREDIENT_FAILED = MOD_PREFIX+'_UPDATE_FAILED'


export const DELETE_INGREDIENT_ATTEMPTED = MOD_PREFIX+'_DELETE_ATTEMPTED';
export const DELETE_INGREDIENT_SUCCEEDED = MOD_PREFIX+'_DELETE_SUCCEEDED'
export const DELETE_INGREDIENT_FAILED = MOD_PREFIX+'_DELETE_FAILED';
