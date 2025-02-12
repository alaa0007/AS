//LIBS
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//COMPONENTS
import PokemonsPage from './pages/PokemonsPage';
//STYLES
import './App.css';
import { PokemonsProvider } from './context/Pokemons';
import ErrorBoundary from './components/error/ErrorBoundary';

// Create a client
const queryClient = new QueryClient();


/**
 * The main application component, which renders the dashboard page.
 * 
 * This component wraps the dashboard page in a QueryClientProvider, which
 * provides the QueryClient instance to all components below it in the tree.
*/
function App() {
  //RENDER
  return (
    <PokemonsProvider>      
      <QueryClientProvider client={queryClient}>
      <ErrorBoundary> 
        <PokemonsPage />
      </ErrorBoundary>
      </QueryClientProvider>
    </PokemonsProvider>
  )
}

//EXPORT
export default App;
