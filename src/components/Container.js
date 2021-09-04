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
      const config = { ...configuration };
      if (!config.isFirstSelected) {
         config.isFirstSelected = true;
         config.firstSelectedCard = selectedCardValue;
         setConfiguration({ ...config });
      } else {
         config.secondSelectedCard = selectedCardValue;
         setConfiguration({ ...config });
         await sleep(300);

         if (config.firstSelectedCard !== selectedCardValue) {
            const result =
               config.firstSelectedCard.charAt(0) === selectedCardValue.charAt(0);

            if (result) {
               if (matchedCards.length === 14) {
                  config.isGameOver = true;
               }
               setMatchedCards([
                  ...matchedCards,
                  config.firstSelectedCard,
                  selectedCardValue,
               ]);
               config.matches = config.matches + 1;
            }
            config.firstSelectedCard = '';
            config.secondSelectedCard = '';
            config.isFirstSelected = false;
            config.turn = config.turn + 1;
         }
         await sleep(300);
         setConfiguration({ ...config });
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
