import React from 'react'
import Wrapper from './components/layout'
import AppRoutes from './routes'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import './App.css';

function App() {
  
  return (
    <BrowserRouter>
      <Provider store={store} >
        <Wrapper>
            <AppRoutes />
        </Wrapper>
      </Provider>
    </BrowserRouter>
   
  );
}

export default App;
