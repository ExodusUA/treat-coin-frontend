import { LanguageProvider } from './Helpers/LanguageContext';
import Main from './Pages/Main';

function App() {

  return (
    <LanguageProvider>
      <Main />
    </LanguageProvider>
  );
}

export default App;
