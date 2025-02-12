//LIBS
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//COMPONENTS
import PokemonsPage from './pages/PokemonsPage';
//STYLES
import './App.css';
import { PokemonsProvider } from './context/Pokemons';

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
        <PokemonsPage />
      </QueryClientProvider>
    </PokemonsProvider>
  )
}

//EXPORT
export default App;
