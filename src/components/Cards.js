import React from 'react';

import './styles.css';
import BLANK from '../assests/images/Blank.jpg';

const Cards = (props) => {
   const {
      CARDS_DATA,
      matchedCards,
      handleSelection,
      firstSelectedCard,
      secondSelectedCard,
   } = props;

   const handleClick = (e) => {
      const value = e.target.dataset['value'];
      handleSelection(value);
   };

   return (
      <div className="cardsContainer">
         {CARDS_DATA.map((card, index) => (
            <div className="card layer" key={index}>
               {!matchedCards.includes(card.value) && (
                  <>
                     {firstSelectedCard === card.value ||
                     secondSelectedCard === card.value ? (
                        <img
                           onClick={handleClick}
                           data-value={card.value}
                           src={card.image_url}
                           alt={card.value}
                        />
                     ) : (
                        <img
                           onClick={handleClick}
                           data-value={card.value}
                           src={BLANK}
                           alt={card.value}
                        />
                     )}
                  </>
               )}
            </div>
         ))}
      </div>
   );
};

export default React.memo(Cards);
