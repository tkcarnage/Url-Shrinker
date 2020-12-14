import React, { useEffect } from 'react';
import styles from '../../styles/Redirect.module.css';

const apiEndpoint = `http://localhost:3000/api/url`

async function fetchRedirect(apiPath, id) {
  const path = `${apiPath}/${id}`;
  const response = await fetch(path);
  const { redirect: url, error } = await response.json();
  return url
};

function RedirectUrl () { 
  return (
    <div className={styles.redirect}>Redirecting...</div>
  );
}

RedirectUrl.getInitialProps = async ({ query: { id }, res }) => {
  const newUrl = await fetchRedirect(apiEndpoint, id)
  if(res) {
    res.writeHead(302, { Location: newUrl })
    res.end();
  } else {
    window.location = newUrl;
  }
  return {};
}

export default RedirectUrl
