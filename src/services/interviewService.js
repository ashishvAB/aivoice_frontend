const API_BASE_URL = 'http://localhost:8000'; // adjust port according to your backend

const interviewService = {
    // Start the interview session
    startInterview: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/interview/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error starting interview:', error);
            throw error;
        }
    },

    // Get the next question from the backend
    getQuestion: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/interview/question`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Assuming the backend returns an object with a question property
            // Adjust this according to your backend response structure
            return {
                question: data.question,
                questionId: data.id, // if your backend provides question ID
            };
        } catch (error) {
            console.error('Error fetching question:', error);
            throw error;
        }
    },

    // Submit the user's response
    submitResponse: async ({ question, answer }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/interview/response`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question,
                    answer,
                    timestamp: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error submitting response:', error);
            throw error;
        }
    },

    // Optional: End the interview session
    endInterview: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/interview/end`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error ending interview:', error);
            throw error;
        }
    },
};

export default interviewService;
