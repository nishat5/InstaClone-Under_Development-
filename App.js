import AppContent from './src/AppContent/AppContent';
import { AuthProvider } from './src/context/AuthContext';
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
