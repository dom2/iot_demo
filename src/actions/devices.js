import { Firebase, FirebaseRef } from '../lib/firebase';
import axios from 'axios';

const url = "https://mcsdem032018-mcsdem032018.mobileenv.us2.oraclecloud.com:443";
const aToken = "Basic YW15Lm1hcmxpbjpNb2JpbGUxKg==";
const backID = "93c27511-29b5-4bef-9a44-fdb69a0bb490";


export function getDevices() {
  let recipesUrl = url + "/mobile/platform/storage/collections/iot_messages/objects?orderBy=modifiedOn:desc";
  let auth = {
    headers: {
      "Authorization": aToken,
      "Oracle-Mobile-Backend-ID": backID,
      'Content-Type': 'application/json'
    }
  };
  
  return dispatch => new Promise((resolve, reject) => axios
      .get(recipesUrl,auth)
      .then(function (response) {
        //console.log(response.data);
        return resolve(dispatch({
          type: 'DEVICES_REPLACE',
          data: response.data.items
        }));
      }).catch(reject)).catch(e => console.log(e));
}


export function getDevice(device) {
  let recipesUrl = url + "/mobile/platform/storage/collections/iot_messages/objects/" + device;
  let auth = {
    headers: {
      "Authorization": aToken,
      "Oracle-Mobile-Backend-ID": backID,
      'Content-Type': 'application/json'
    }
  };
  
  return dispatch => new Promise((resolve, reject) => axios
      .get(recipesUrl,auth)
      .then(function (response) {
        console.log(response.data);
        return resolve(dispatch({
          type: 'SINGLE_DEVICE',
          data: response.data
        }));
      }).catch(reject)).catch(e => console.log(e));
}