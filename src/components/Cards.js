import React from 'react';

import './styles.css';

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
                           src="https://images.unsplash.com/photo-1544526226-d4568090ffb8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
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

export default Cards;
