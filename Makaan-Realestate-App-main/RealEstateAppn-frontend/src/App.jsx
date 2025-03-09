import React from 'react';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Spinner from './components/Spinner';
import BackToTop from './components/BackToTop';
import Body from './components/Body';
import Footer from './components/Footer';
import "./App.css"

function App() {
  return (
    <div className="container-xxl bg-white p-0">
      <Spinner />
      <Navbar />
      <Search />
      <Body/>
      <BackToTop />
      <Footer/>
    </div>
  );
}

export default App;
