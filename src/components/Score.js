import React from 'react';

const Score = ({ turn, matches }) => {
   return (
      <div className="scoreContainer">
         <div className="matches">
            <h2>Matches: {matches}</h2>
         </div>
         <div className="clicked">
            <h2>Turns: {turn}</h2>
         </div>
      </div>
   );
};

export default Score;
