import React, { useState } from 'react';

const InterviewPage = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    let recognition;

    const handleStartListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition. Please try a different browser.');
            return;
        }

        recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcriptPart = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    setTranscript(prev => prev + transcriptPart);
                } else {
                    interimTranscript += transcriptPart;
                }
            }
            setTranscript(prev => prev + interimTranscript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const handleStopListening = () => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Interview</h2>
            <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px auto', width: '400px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h3>Phone Call Interface</h3>
                <button onClick={handleStartListening} disabled={isListening} style={{ margin: '10px', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', backgroundColor: isListening ? '#ccc' : '#007bff', color: '#fff', border: 'none', transition: 'background 0.3s' }} 
                        onMouseOver={e => !isListening && (e.currentTarget.style.background = '#0056b3')} 
                        onMouseOut={e => !isListening && (e.currentTarget.style.background = '#007bff')}>
                    Start
                </button>
                <button onClick={handleStopListening} disabled={!isListening} style={{ margin: '10px', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', backgroundColor: !isListening ? '#ccc' : '#007bff', color: '#fff', border: 'none', transition: 'background 0.3s' }} 
                        onMouseOver={e => isListening && (e.currentTarget.style.background = '#0056b3')} 
                        onMouseOut={e => isListening && (e.currentTarget.style.background = '#007bff')}>
                    Done
                </button>
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
                <div style={{ marginTop: '20px', textAlign: 'left' }}>
                    <h4>Transcript:</h4>
                    <p>{transcript}</p>
                </div>
            </div>
        </div>
    );
};

export default InterviewPage;
