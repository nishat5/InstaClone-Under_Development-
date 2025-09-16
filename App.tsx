import React from 'react';
import AppContent from './src/AppContent/AppContent';
import ContextWrapper from './src/context/ContextWrapper';
const App = () => {
  return (
    <ContextWrapper>
      <AppContent />
    </ContextWrapper>
  );
};

export default App;
