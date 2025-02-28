import React, { useState, useEffect } from 'react';
import interviewService from '../services/interviewService';

const InterviewPage = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState('');
    let recognition;

    // Function to speak text using Text-to-Speech
    const speakText = (text) => {
        return new Promise((resolve, reject) => {
            const speech = new SpeechSynthesisUtterance(text);
            speech.onend = () => resolve();
            speech.onerror = (err) => reject(err);
            window.speechSynthesis.speak(speech);
        });
    };

    const fetchAndSpeakQuestion = async () => {
        try {
            const response = await interviewService.getQuestion();
            const question = response.question; // Adjust based on your API response structure
            setCurrentQuestion(question);
            
            // Speak the question
            await speakText(question);
            
            // After speaking the question, start listening for response
            startSpeechRecognition();
        } catch (err) {
            setError('Failed to fetch question: ' + err.message);
            console.error('Error:', err);
        }
    };

    const startSpeechRecognition = () => {
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
                    setTranscript(prev => prev + transcriptPart + ' ');
                } else {
                    interimTranscript += transcriptPart;
                }
            }
            setTranscript(prev => prev + interimTranscript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setError('Speech recognition error: ' + event.error);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const handleStartListening = async () => {
        setIsLoading(true);
        setError(null);
        setTranscript('');

        try {
            // Start the interview
            await interviewService.startInterview();
            
            // Fetch and speak the first question
            await fetchAndSpeakQuestion();
        } catch (err) {
            setError('Failed to start interview: ' + err.message);
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStopListening = async () => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);

            try {
                // Submit the response
                await interviewService.submitResponse({
                    question: currentQuestion,
                    answer: transcript
                });
            } catch (err) {
                setError('Failed to submit response: ' + err.message);
                console.error('Error:', err);
            }
        }
    };

    // Clean up speech recognition on component unmount
    useEffect(() => {
        return () => {
            if (recognition) {
                recognition.stop();
            }
            window.speechSynthesis.cancel();
        };
    }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Interview</h2>
            {error && <div style={{ color: 'red', margin: '10px' }}>{error}</div>}
            <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px auto', width: '400px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h3>Phone Call Interface</h3>
                
                {currentQuestion && (
                    <div style={{ margin: '20px 0', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                        <h4>Current Question:</h4>
                        <p>{currentQuestion}</p>
                    </div>
                )}

                <button 
                    onClick={handleStartListening} 
                    disabled={isListening || isLoading} 
                    style={{ 
                        margin: '10px', 
                        padding: '10px 20px', 
                        cursor: isListening || isLoading ? 'not-allowed' : 'pointer', 
                        borderRadius: '5px', 
                        backgroundColor: isListening || isLoading ? '#ccc' : '#007bff', 
                        color: '#fff', 
                        border: 'none', 
                        transition: 'background 0.3s' 
                    }}
                >
                    {isLoading ? 'Starting...' : 'Start'}
                </button>

                <button 
                    onClick={handleStopListening} 
                    disabled={!isListening} 
                    style={{ 
                        margin: '10px', 
                        padding: '10px 20px', 
                        cursor: !isListening ? 'not-allowed' : 'pointer', 
                        borderRadius: '5px', 
                        backgroundColor: !isListening ? '#ccc' : '#dc3545', 
                        color: '#fff', 
                        border: 'none', 
                        transition: 'background 0.3s' 
                    }}
                >
                    Done
                </button>

                <div style={{ marginTop: '20px', textAlign: 'left' }}>
                    <h4>Your Response:</h4>
                    <p style={{ 
                        minHeight: '100px', 
                        padding: '10px', 
                        backgroundColor: '#f8f9fa', 
                        borderRadius: '5px' 
                    }}>
                        {transcript}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InterviewPage; 