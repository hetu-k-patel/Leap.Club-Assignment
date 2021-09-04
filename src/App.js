import React, { useEffect } from 'react';
import Container from './components/Container';

import './App.css';

const App = () => {
   useEffect(() => {
      window.addEventListener('beforeunload', (event) => {
         event.preventDefault();
         return (event.returnValue = 'Are you sure you want to leave?');
      });
      return () => {
         window.removeEventListener('beforeunload');
      };
   }, []);

   return (
      <div className="app">
         <Container />
      </div>
   );
};

export default App;
