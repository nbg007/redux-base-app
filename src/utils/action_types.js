import { APP_NAME } from '../config';

export default function createTypes(moduleName, operation){
  let mod = moduleName[moduleName.length-1] === '/' ? moduleName : moduleName+'/';
  return [
    APP_NAME + moduleName + '/' + operation + '_ATTEMPTED',
    APP_NAME + moduleName + '/' + operation + '_SUCCEEDED',
    APP_NAME + moduleName + '/' + operation + '_FAILED',
  ]
}