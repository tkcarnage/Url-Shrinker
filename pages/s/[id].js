import React, { useEffect } from 'react';
import styles from '../../styles/Redirect.module.css';

const apiEndpoint = `api/url`

async function fetchRedirect(apiPath, id) {
	console.log('calling fetchRedirect', apiPath, id);
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
	console.log('redirect?')
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