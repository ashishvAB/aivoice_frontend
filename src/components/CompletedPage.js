import React from 'react';

const completedCandidates = [
    { id: 1, name: 'John Doe', role: 'Developer', image: 'default-image-url', status: 'Completed' },
    { id: 2, name: 'Jane Smith', role: 'Designer', image: 'default-image-url', status: 'Completed' },
    { id: 3, name: 'Alice Johnson', role: 'Manager', image: 'default-image-url', status: 'Completed' },
    { id: 4, name: 'Bob Brown', role: 'Tester', image: 'default-image-url', status: 'Completed' },
];

const CompletedPage = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Completed Candidates</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {completedCandidates.map(candidate => (
                    <div key={candidate.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '20px', width: '250px', textAlign: 'center', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <img src={candidate.image} alt={candidate.name} style={{ width: '60px', borderRadius: '50%' }} />
                        <h3>{candidate.name}</h3>
                        <p>Role: {candidate.role}</p>
                        <p>Status: {candidate.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompletedPage;
