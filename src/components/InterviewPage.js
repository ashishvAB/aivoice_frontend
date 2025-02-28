import React from 'react';

const InterviewPage = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Interview</h2>
            <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px auto', width: '400px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h3>Phone Call Interface</h3>
                <button style={{ margin: '10px', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', transition: 'background 0.3s' }} 
                        onMouseOver={e => e.currentTarget.style.background = '#0056b3'} 
                        onMouseOut={e => e.currentTarget.style.background = '#007bff'}>
                    Retry
                </button>
                <button style={{ margin: '10px', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', transition: 'background 0.3s' }} 
                        onMouseOver={e => e.currentTarget.style.background = '#0056b3'} 
                        onMouseOut={e => e.currentTarget.style.background = '#007bff'}>
                    Next Question
                </button>
            </div>
        </div>
    );
};

export default InterviewPage;
