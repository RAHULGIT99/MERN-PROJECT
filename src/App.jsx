import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Sum from './pages/Sum';
import Compare from './pages/Compare';
import Sumresult from './pages/Sumresult'; 
import Nav from './pages/Nav';
import Compres from './pages/CompareResult';
import ComparePrices from './pages/Pricecomp';
import Load_com from './pages/Load_com';
import Load_sum from './pages/Load_sum';
import Visual from './pages/Visual';
import Load_visual from './pages/Load_visual';
import Visualres from './pages/visualres';



  
function App() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch JSON data from the API endpoint
    fetch('http://127.0.0.1:5005/get-data')
      .then((response) => response.json())
      // .then((data) => setChartData(data))
      .then((data) => {
        console.log('Fetched Data:', data); // Log fetched data
        setChartData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
},[]);

  return (
    <Router>
      <Layout />
      <Visualres data={chartData}/>
    </Router>
  );
}

function Layout() {
  const loc = useLocation();

  return (
    <>
      {/*  Navbar based on pathname */}
      {loc.pathname !== '/' && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summarize" element={<Sum />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/sumresult" element={<Sumresult />} />
        <Route path="/compres" element={<Compres />} />
        <Route path="/pricecomp" element={<ComparePrices />} />
        <Route path="/load_sum" element={<Load_sum />} />
        <Route path="/load_com" element={<Load_com />} />
        <Route path="/visual" element={<Visual />} />
        <Route path="/load_visual" element={<Load_visual />} />
        <Route path='/visualres' element={<Visualres/>} />
        </Routes>

    </>
  );
}

export default App;
