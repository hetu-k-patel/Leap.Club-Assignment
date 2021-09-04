import React, { useEffect } from 'react';
import Container from './components/Container';

import './App.css';

const App = () => {
   useEffect(() => {
      const handleUnload = (event) => {
         event.preventDefault();
         return (event.returnValue = 'Are you sure you want to leave?');
      };

      window.addEventListener('beforeunload', handleUnload);
      return () => {
         window.removeEventListener('beforeunload', handleUnload);
      };
   }, []);

   return (
      <div className="app">
         <Container />
      </div>
   );
};

export default App;
