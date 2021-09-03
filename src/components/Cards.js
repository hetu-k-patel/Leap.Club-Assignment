import React from 'react';

import './styles.css';

const Cards = (props) => {
   const { CARDS_DATA, matchedCards, handleSelection } = props;
   const handleClick = (e) => {
      const value = e.target.dataset['value'];
      handleSelection(value);
   };

   return (
      <div className="cardsContainer">
         {CARDS_DATA.map((card, index) => (
            <div className="card layer" key={index}>
               {!matchedCards.includes(card.value) && (
                  <img
                     onClick={handleClick}
                     data-value={card.value}
                     src={card.image_url}
                     alt={card.value}
                  />
               )}
            </div>
         ))}
      </div>
   );
};

export default Cards;
