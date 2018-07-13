// Simple text only page about the project

// README, humans.txt, social links
import React, {Component} from 'react';

export default class AboutPage extends React.Component {
  render() {
    return (
      <section className="page page--home">
        <div className="hero hero--home">
          <div className="hero-body has-text-centered columns">
            <div className="column is-half" />
          </div>
        </div>
        <div className="columns is-centered">
          <div className="content column is-half">
            <p className="title is-2">About</p>
            <p className="subtitle">Go, the world's most difficult game</p>
            <p>
              Go is an abstract strategy board game for two players, in which
              the aim is to surround more territory than the opponent. The game
              was invented in China more than 2,500 years ago and is believed to
              be the oldest board game continuously played to the present day.
              As of mid-2008, there were well over 40 million Go players
              worldwide, the majority of them living in East Asia. As of
              December 2015, the International Go Federation has a total of 75
              member countries and four Association Membership organizations in
              multiple countries.
            </p>

            <p>
              Despite its relatively simple rules, Go is very complex. Compared
              to chess, Go has both a larger board with more scope for play and
              longer games, and, on average, many more alternatives to consider
              per move. The lower bound on the number of legal board positions
              in Go has been estimated to be 2 x 10^170. In a simple and
              anecdotal way of explaining of the rules of Go, a teacher simply
              says to a student “you may place your stone (playing piece) on any
              point on the board, but if I surround that stone, I may remove
              it.”
            </p>

            <p>
              Go was considered one of the four essential arts of the cultured
              aristocratic Chinese scholars in antiquity. The earliest written
              reference to the game is generally recognized as the historical
              annal Zuo Zhuan (c. 4th century BC).
            </p>
          </div>
        </div>
      </section>
    );
  }
}
