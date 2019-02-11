import React from 'react';

import Game from '../components/game';
import { BOARD } from '../utils/constants';

const GamePage = ({ match }) => {
  return <Game size={BOARD.SIZE} id={match.params.id} />;
};

export default GamePage;
