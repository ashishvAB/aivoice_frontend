import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div style={{ width: '250px', height: '100vh', borderRight: '1px solid #ccc', padding: '20px', backgroundColor: '#f4f4f4' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Menu</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#333', padding: '10px', display: 'block', borderRadius: '5px', transition: 'background 0.3s' }} 
                          onMouseOver={e => e.currentTarget.style.background = '#e0e0e0'} 
                          onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                        Candidates
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/completed" style={{ textDecoration: 'none', color: '#333', padding: '10px', display: 'block', borderRadius: '5px', transition: 'background 0.3s' }} 
                          onMouseOver={e => e.currentTarget.style.background = '#e0e0e0'} 
                          onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                        Completed
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
