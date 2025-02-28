import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import InterviewPage from './components/InterviewPage';
import CompletedPage from './components/CompletedPage';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/interview" element={<InterviewPage />} />
                    <Route path="/completed" element={<CompletedPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
