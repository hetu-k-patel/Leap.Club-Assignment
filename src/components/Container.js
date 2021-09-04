import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import Score from './Score';

import './styles.css';
import { CARDS_DATA } from '../storage/Data';

const Container = () => {
   const [matches, setMatches] = useState(0);
   const [turn, setTurn] = useState(0);
   const [isFirstSelected, setIsFirstSelected] = useState(false);
   const [firstSelectedCard, setFirstSelectedCard] = useState('');
   const [secondSelectedCard, setSecondSelectedCard] = useState('');
   const [matchedCards, setMatchedCards] = useState([]);
   const [isGameOver, setIsGameOver] = useState(false);

   useEffect(() => {
      if (isGameOver) {
         const response = window.confirm('Want to play again ?');
         if (response) {
            window.location.reload();
         } else {
            window.close();
         }
      }
   }, [isGameOver]);

   const handleSelection = (selectedCardValue) => {
      if (!isFirstSelected) {
         setIsFirstSelected(true);
         setFirstSelectedCard(selectedCardValue);
      } else {
         setSecondSelectedCard(selectedCardValue);
         setTimeout(() => {
            if (firstSelectedCard !== selectedCardValue) {
               const result = firstSelectedCard.charAt(0) === selectedCardValue.charAt(0);

               if (result) {
                  if (matchedCards.length === 14) {
                     setIsGameOver(true);
                  }
                  setMatchedCards([
                     ...matchedCards,
                     firstSelectedCard,
                     selectedCardValue,
                  ]);
                  setMatches((prevMatches) => prevMatches + 1);
               }

               setFirstSelectedCard('');
               setSecondSelectedCard('');
               setIsFirstSelected(false);
               setTurn((prevTurn) => prevTurn + 1);
            }
         }, 500);
      }
   };

   return (
      <div className="container">
         <div className="title">
            <h1>Memories Game</h1>
         </div>
         <Score matches={matches} turn={turn} />
         <Cards
            CARDS_DATA={CARDS_DATA}
            matchedCards={matchedCards}
            handleSelection={handleSelection}
            firstSelectedCard={firstSelectedCard}
            secondSelectedCard={secondSelectedCard}
         />
      </div>
   );
};

export default Container;
