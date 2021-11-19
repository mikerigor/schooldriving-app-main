import React, { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const promise1 = new Promise((resolve, reject) => {
      resolve(1);
    });

    const promise2 = new Promise((resolve, reject) => {
      resolve(2);
    });

    const promise3 = new Promise((resolve, reject) => {
      resolve(3);
    });

    Promise.all([promise1, promise2, promise3]).then((values) => {
      console.log(values)
    });
  })

  return (
    <div className="container">
      <main>
        <h1 className="title">
          Welcome to
          <a href="https://nextjs.org">School Driving Scheduler!</a>
        </h1>

        <div className="grid">
          <a
            href="https://nextjs.org/docs"
            className="card"
          >
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about this app.</p>
          </a>

          <a
            href="/calendar"
            className="card"
          >
            <h3>Calendar &rarr;</h3>
            <p>Find in-depth information client schedules.</p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          {' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>
    </div>
  )
}
