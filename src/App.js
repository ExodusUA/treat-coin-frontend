import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './Helpers/LanguageContext';
import Main from './Pages/Main';
import Mission from './Pages/Mission';
import About from './Pages/About';

function App() {

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
