import React from 'react';

const candidates = [
    { id: 1, name: 'John Doe', role: 'Developer', image: 'default-image-url' },
    { id: 2, name: 'Jane Smith', role: 'Designer', image: 'default-image-url' },
    { id: 3, name: 'Alice Johnson', role: 'Manager', image: 'default-image-url' },
    { id: 4, name: 'Bob Brown', role: 'Tester', image: 'default-image-url' },
];

const HomePage = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Candidates</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {candidates.map(candidate => (
                    <div key={candidate.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '20px', width: '250px', textAlign: 'center', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <img src={candidate.image} alt={candidate.name} style={{ width: '60px', borderRadius: '50%' }} />
                        <h3>{candidate.name}</h3>
                        <p>Role: {candidate.role}</p>
                        <button onClick={() => window.location.href = '/interview'} style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', transition: 'background 0.3s' }} 
                                onMouseOver={e => e.currentTarget.style.background = '#0056b3'} 
                                onMouseOut={e => e.currentTarget.style.background = '#007bff'}>
                            Start Interview
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
