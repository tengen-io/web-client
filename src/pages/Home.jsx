// The default page an unregistered user sees

import React from 'react';

const HomePage = () => {
  return (
    <section className="page page--home">
      <div className="hero hero--home">
        <div className="hero-body has-text-centered">
          <p className="title is-1">GoStop</p>
          <p className="title is-1">⚫️ ⚪️ </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
