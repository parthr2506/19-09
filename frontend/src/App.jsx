import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';
import AuthRoutes from './pages/AuthRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AuthRoutes />
      </AuthProvider>
    </Router>
  );
}
export default App;

