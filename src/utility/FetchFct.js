import config from './api';

function getData(url) {
  return fetch(`${config.api}${url}`)
    .then((response) => response.json())
    .then((result) => {
      return result
    })
    .catch((error) => console.log('error', error));
}

function registerUser(data) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify(data);
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${config.api}users/register`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result
    })
    .catch((error) => {
      throw error
    });
}

function getDetailsByGmail(email) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({ email });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${config.api}users/profile`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result
    })
    .catch((error) => {
      throw error
    });
}

function getUserListByType(type) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({ type });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${config.api}users/type`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result
    })
    .catch((error) => {
      throw error
    });
}

export {
  getData,
  getDetailsByGmail,
  registerUser,
  getUserListByType
}
