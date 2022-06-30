import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../header/Header';
import Calendar from '../calendar/Calendar';
import ModalCreate from '../modal/ModalCreate';
import ModalEdit from '../modal/ModalEdit';
import Statistics from '../statistics/Statistics';

import './App.sass';

function App() { 
  return (
    <Router>
      <div className="app">
        <Header />
        <div style={{width: '95vw'}}>
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="statistics" element={<Statistics />} />
          </Routes>
        </div>
        <ModalCreate />
        <ModalEdit />
      </div>
    </Router>
  );
}

export default App;
