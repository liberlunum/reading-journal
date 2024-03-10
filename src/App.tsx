import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Header from './components/header/Header';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import Favorites from './components/favorites/Favorites';
import History from './components/history/History';
import SearchBooks from './pages/SearchBooks/SearchBooks';
import BookDetailsPage from './pages/BookDetails/BookDetailsPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/history" element={<History />} />
        <Route path="/search" element={<SearchBooks />} />
        <Route path="/book/:id" element={<BookDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
