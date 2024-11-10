import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './AnalyzePage.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AnalyzePage = () => {
  const { state } = useLocation();
  const { audioUrl } = state || {};
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const [sentimentDetails, setSentimentDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const GEMINI_API_KEY = '';  // Replace with your actual Gemini API key
  const ASSEMBLY_AI_API_KEY = '';  // Replace with your AssemblyAI API key

  useEffect(() => {
    if (!audioUrl) return;

    const transcribeAndSummarize = async () => {
      try {
        // Step 1: Transcribe and analyze sentiment using AssemblyAI
        const response = await axios.post(
          'https://api.assemblyai.com/v2/transcript',
          { audio_url: audioUrl, sentiment_analysis: true },  // Enable sentiment analysis
          {
            headers: {
              authorization: ASSEMBLY_AI_API_KEY,
              'content-type': 'application/json',
            },
          }
        );

        const transcriptId = response.data.id;

        const pollTranscription = async () => {
          const { data } = await axios.get(
            `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
            { headers: { authorization: ASSEMBLY_AI_API_KEY } }
          );

          if (data.status === 'completed') {
            setTranscription(data.text);

            // Set sentiment details if available
            if (data.sentiment_analysis_results) {
              const sentiments = data.sentiment_analysis_results.map(item => ({
                sentiment: item.sentiment,
                confidence: item.confidence.toFixed(2),
                text: item.text,
              }));
              setSentimentDetails(sentiments);
            }

            return data.text;
          } else if (data.status === 'failed') {
            setTranscription('Transcription failed');
            setLoading(false);
            return '';
          }
          return false;
        };

        let completed = false;
        let transcribedText = '';
        while (!completed) {
          transcribedText = await pollTranscription();
          if (transcribedText !== false) completed = true;
          else await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5 seconds
        }

        // Step 2: Summarize the transcription with Gemini API
        if (transcribedText) {
          const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
          const prompt = `Summarize this conversation and do sentimental analysis: ${transcribedText}`;
          const result = await model.generateContent(prompt);
    
          setSummary(result.response.text());
        }
    
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error('Error during transcription and summarization:', err);
      }
    };

    transcribeAndSummarize();
  }, [audioUrl]);

  return (
    <div className="analyze-container">
      <h2>Employee-Customer Conversation Analysis</h2>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p className="loading-message">Processing audio...</p>
        </div>
      ) : (
        <div className="chat-output">
          <div className="ai-response">
            <h3>Transcription:</h3>
            <p className="message">{transcription}</p>
            
            <h3> AI Summary and sentimental analysis:</h3>
            <p className="message">{summary}</p>

            <h3> Detail Sentiments:</h3>
            <div className="sentiment-details">
              {sentimentDetails.map((item, index) => (
                <div key={index} className={`sentiment-item ${item.sentiment.toLowerCase()}`}>
                  <p><strong>{item.sentiment}</strong> – {item.text}</p>
                  <span className="confidence-score">Confidence: {item.confidence}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzePage;



