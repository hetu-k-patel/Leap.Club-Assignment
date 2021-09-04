import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import Score from './Score';

import './styles.css';
import { CARDS_DATA } from '../storage/Data';

const initialConfig = {
   isFirstSelected: false,
   firstSelectedCard: '',
   secondSelectedCard: '',
   matches: 0,
   turn: 0,
   isGameOver: false,
};

const Container = () => {
   const [configuration, setConfiguration] = useState(initialConfig);
   const [matchedCards, setMatchedCards] = useState([]);

   useEffect(() => {
      if (configuration.isGameOver) {
         const response = window.confirm('Want to play again ?');
         if (response) {
            window.location.reload();
         } else {
            window.close();
         }
      }
   }, [configuration]);

   function sleep(delay) {
      return new Promise((resolve) => setTimeout(resolve, delay));
   }

   const handleSelection = async (selectedCardValue) => {
      if (!configuration.isFirstSelected) {
         configuration.isFirstSelected = true;
         configuration.firstSelectedCard = selectedCardValue;
         setConfiguration({ ...configuration });
      } else {
         configuration.secondSelectedCard = selectedCardValue;
         setConfiguration({ ...configuration });
         await sleep(500);

         if (configuration.firstSelectedCard !== selectedCardValue) {
            const result =
               configuration.firstSelectedCard.charAt(0) === selectedCardValue.charAt(0);

            if (result) {
               if (matchedCards.length === 14) {
                  configuration.isGameOver = true;
               }
               setMatchedCards([
                  ...matchedCards,
                  configuration.firstSelectedCard,
                  selectedCardValue,
               ]);
               configuration.matches = configuration.matches + 1;
            }
            configuration.firstSelectedCard = '';
            configuration.secondSelectedCard = '';
            configuration.isFirstSelected = false;
            configuration.turn = configuration.turn + 1;
         }
         setConfiguration({ ...configuration });
         await sleep(1000);
      }
   };

   return (
      <div className="container">
         <div className="title">
            <h1>Memories Game</h1>
         </div>
         <Score matches={configuration.matches} turn={configuration.turn} />
         <Cards
            CARDS_DATA={CARDS_DATA}
            matchedCards={matchedCards}
            handleSelection={handleSelection}
            firstSelectedCard={configuration.firstSelectedCard}
            secondSelectedCard={configuration.secondSelectedCard}
         />
      </div>
   );
};

export default Container;
