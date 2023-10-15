import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './Helpers/LanguageContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Main from './Pages/Main';
import Mission from './Pages/Mission';
import About from './Pages/About';
import { LoginSocialFacebook } from 'reactjs-social-login';

function App() {

  return (
    <GoogleOAuthProvider clientId="337924305474-bb0pojq3rv0sbmamimuqjpmb3svtco1e.apps.googleusercontent.com">
     
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route path="/mission" element={<Mission />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>

    </GoogleOAuthProvider>

  );
}

export default App;
