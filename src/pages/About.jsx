// Simple text only page about the project

// README, humans.txt, social links
import React from 'react';

const AboutPage = () => {
  return (
    <section className="page page--home">
      <div className="hero hero--home">
        <div className="hero-body has-text-centered columns">
          <div className="column is-half" />
        </div>
      </div>
      <div className="columns is-centered">
        <div className="content column is-half">
          <p className="title is-2 is-bold">About Go</p>
          <p className="subtitle has-text-grey-light">
            The world's oldest and most popular game
          </p>
          <p>
            Go is an abstract strategy board game for two players, in which
            the aim is to surround more territory than the opponent. The game
            was invented in China more than 2,500 years ago and is believed to
            be the oldest board game continuously played to the present day.
          </p>
          <p>
            In a simple and anecdotal way of explaining of the rules of Go, a
            teacher simply says to a student,
          </p>
          <blockquote>
            <p>
              You may place your stone (playing piece) on any point on the
              board, but if I surround that stone, I may remove it.
            </p>
          </blockquote>
          <p>
            Learn more:{' '}
            <a href="https://en.wikipedia.org/wiki/Go_(game)">
              Go (game) - Wikipedia
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
