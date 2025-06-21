import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './compo/Home';
import GoodReceiver from './compo/GoodReceiver';
import Customer from './compo/Customer';
import Listing from './compo/Listing';
import StockReport from './compo/StockReport';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/good-receiver" element={<GoodReceiver />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/listing/:id" element={<Listing />} />
            <Route path="/stock-report" element={<StockReport />} />
        </Routes>
    );
}

export default App;
