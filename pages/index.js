import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showShortUrl, setShowShortUrl] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');

  const apiEndpoint = `/api/url`;

  async function handleSubmit(e) {
    setError('');
    if(!url) {
      return;
    }

    const id = nanoid(5);
    const path = `${apiEndpoint}/${id}`;

    const data = {
      redirect: url,
    };
    
    setLoading(true);
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });


    const { redirect, id, error } = await response.json();

    setShortUrl(redirect);
    setLoading(false);

    if(error) {
      setError(error);
    };
    setShowShortUrl(true);
  }

  async function copyToClipboard(e) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(shortUrl)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  function handleChange (e) {
    e.preventDefault();
    setUrl(e.target.value);
  };

  function handleFocus(e) {
    e.target.select();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Url Shrinker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>Url Shrinker!</span>
        </h1>

        <p className={styles.description}>
          Get started by adding a <span className={styles.highlight}>link.</span>
        </p>

        <div className={styles.center}>
          <div className={styles.stack}>
            <div className={styles.url}>
              <input 
                type="text" 
                onChange={handleChange}
                onFocus={handleFocus} 
                defaultValue="Enter Link Here"/>
              <button onClick={handleSubmit}>Shorten Url</button>
            </div>
            {showShortUrl && !loading &&
              <div className={styles.shortUrl}>
                <div className={styles.shortUrlOutput}>
                  {error ? 
                  <div className={styles.error}>{error}</div>
                  :
                  <div>
                  <a 
                    href={`/s/${id}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    {shortUrl}
                  </a>
                  </div>}
                </div>
                <button onClick={copyToClipboard}>Copy</button>
              </div>}
          </div>
        </div>     
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/tkcarnage/Url-Shrinker"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github Repo
        </a>
      </footer>
    </div>
  )
}
