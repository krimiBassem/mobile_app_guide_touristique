import {Platform} from 'react-native';

let baseURL = '';

{
  Platform.OS == 'android'
    ? (baseURL = 'http://217.182.207.129:8000/api/v1')
    : (baseURL = 'http://217.182.207.129:8000/api/v1');
}
// {
//   Platform.OS == 'android'
//     ? (baseURL = 'http://10.0.2.2:8000/api/v1')
//     : (baseURL = 'http://localhost:8000/api/v1');
// }

export default baseURL;
