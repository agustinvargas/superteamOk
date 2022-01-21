// Router
import Router from './router/Router';
// Context
import TeamProvider from './contexts/TeamProvider';
import SearchProvider from './contexts/SearchProvider';
import { ToastProvider } from './contexts/ToastProvider';
// Bootstrap Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './contexts/AuthProvider';

function App() {
  return (
    // Contexts
    <AuthProvider>
      <ToastProvider>
        <SearchProvider>
          <TeamProvider>
            {/* Router  */}
            <Router />
          </TeamProvider>
        </SearchProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
