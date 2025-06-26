import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './compo/Home';
import Events from './compo/Event';
import Customer from './compo/Customer';
import Listing from './compo/Listing';
import StockReport from './compo/StockReport';
import EventResult from './compo/EventResult';
import Result from './compo/Result';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/event" element={<Events/>} />
            <Route path="/eventresult" element={<EventResult/>} />
            <Route path="/result" element={<Result/>} />
            <Route path="/stock-report" element={<StockReport />} />
        </Routes>
    );
}

export default App;
