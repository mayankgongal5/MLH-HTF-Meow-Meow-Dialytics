
// import React, { useState } from 'react';
// import axios from 'axios';

// const TranscribeAudio = () => {
//   const [transcription, setTranscription] = useState('');
//   const [sentiment, setSentiment] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const ASSEMBLY_AI_API_KEY = '05be3a0eb00d422ab91486f9590684c0'; // Replace with your API key
//   const audioFileUrl =
//     'https://storage.googleapis.com/kagglesdsdata/datasets/829978/1417968/harvard.wav?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20241018%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241018T052353Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=413d097eee35ab172e20b50536b036a7bb003c3898d166f24bd43e79adce7200e74fa9714cdf56ce36c202ad0a450f111ba3b049c252d8c381d3ca33d275d9b1fc1fd6cf05453cb61e7d2718ac3f273ad7f4da649aa9c5696d4fa50f63cc68662a958f9382c4426c5d3018ad9abd228126ceaeffb3ebfc2e38f67cb5d0328ab02be3dc59c5f5772251c8d22cdb793eb7938b7f586ddb8ebbcddaff13e480472c9d5eb4f7305d308ef466fe95493fc52b286adc1018c2c7fd5f4c2cb791e4601e099c45114d5fa9983f9d64b781d0c6b4b9d327627c415609e095712c8a875c36efe3b10df7907012f02bdb8d94e8870a18aa2b486a95a44e47a38489a2379550'; // Replace this with your audio file URL

//   const transcribeAudio = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       // Step 1: Request transcription with sentiment analysis
//       const response = await axios.post(
//         'https://api.assemblyai.com/v2/transcript',
//         {
//           audio_url: audioFileUrl, // The public URL of the audio file
//           sentiment_analysis: true, // Enable sentiment analysis
//         },
//         {
//           headers: {
//             authorization: ASSEMBLY_AI_API_KEY,
//             'content-type': 'application/json',
//           },
//         }
//       );

//       const transcriptId = response.data.id;

//       // Step 2: Poll for the transcription result
//       const pollTranscription = async () => {
//         const { data } = await axios.get(
//           `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
//           {
//             headers: {
//               authorization: ASSEMBLY_AI_API_KEY,
//             },
//           }
//         );

//         if (data.status === 'completed') {
//           setTranscription(data.text);
//           setSentiment(data.sentiment_analysis_results); // Save the sentiment analysis results
//           setLoading(false);
//         } else if (data.status === 'failed') {
//           setError('Transcription failed');
//           setLoading(false);
//         } else {
//           setTimeout(pollTranscription, 5000); // Poll every 5 seconds
//         }
//       };

//       pollTranscription();
//     } catch (err) {
//       console.error('Error transcribing audio:', err);
//       setError('An error occurred during transcription');
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Transcribe Audio</h1>
//       <button onClick={transcribeAudio} disabled={loading}>
//         {loading ? 'Transcribing...' : 'Start Transcription'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {transcription && (
//         <div>
//           <h2>Transcription Result:</h2>
//           <p>{transcription}</p>
//           {sentiment.length > 0 && (
//             <div>
//               <h3>Sentiment Analysis:</h3>
//               <ul>
//                 {sentiment.map((result, index) => (
//                   <li key={index}>
//                     <p>
//                       <strong>Text:</strong> {result.text}
//                     </p>
//                     <p>
//                       <strong>Sentiment:</strong> {result.sentiment}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TranscribeAudio;



// import React, { useState, useEffect } from 'react';
// import { supabase } from '../supabase';
// import axios from 'axios';

// const SpeechToTextAndSentiment = () => {
//   const [recordings, setRecordings] = useState([]);
//   const [transcriptions, setTranscriptions] = useState([]);
//   const [sentiments, setSentiments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const ASSEMBLY_AI_API_KEY = '05be3a0eb00d422ab91486f9590684c0'; // Replace with your AssemblyAI API key

//   // Fetch recordings from Supabase bucket
//   useEffect(() => {
//     const fetchRecordings = async () => {
//         try {
//           setLoading(true); // Start loading
//           const { data, error } = await supabase.storage
//             .from('callrec')
//             .list('', { limit: 100 });
      
//           if (error) {
//             console.error('Error fetching recordings:', error);
//           } else if (data && data.length > 0) {
//             // Filter out any placeholder files
//             const validRecordings = data.filter(file => file.name !== '.emptyFolderPlaceholder');
      
//             // Sort the recordings by created_at in descending order
//             const sortedData = validRecordings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//             setRecordings(sortedData);
//           } else {
//             console.log('No recordings found.');
//           }
//         } catch (err) {
//           console.error('Error fetching recordings:', err);
//         } finally {
//           setLoading(false); // Set loading to false after fetching completes
//         }
//       };
      

//     fetchRecordings();
//   }, []);

//   // Get the public URL for an audio recording
//   const getPublicUrl = (fileName) => {
//     const { data } = supabase.storage.from('callrec').getPublicUrl(fileName);
//     return data?.publicUrl || '';
//   };

//   // Transcribe audio and perform sentiment analysis
//   const transcribeAndAnalyze = async (audioUrl) => {
//     try {
//       // Step 1: Request transcription from AssemblyAI
//       const transcriptionResponse = await axios.post(
//         'https://api.assemblyai.com/v2/transcript',
//         {
//           audio_url: audioUrl, // The public URL of the audio file
//         },
//         {
//           headers: {
//             authorization: ASSEMBLY_AI_API_KEY,
//             'content-type': 'application/json',
//           },
//         }
//       );

//       const transcriptId = transcriptionResponse.data.id;

//       // Step 2: Poll for the transcription result
//       const pollTranscription = async () => {
//         const { data } = await axios.get(
//           `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
//           {
//             headers: {
//               authorization: ASSEMBLY_AI_API_KEY,
//             },
//           }
//         );

//         if (data.status === 'completed') {
//           return data.text; // Return the transcription text
//         } else if (data.status === 'failed') {
//           throw new Error('Transcription failed');
//         } else {
//           setTimeout(pollTranscription, 5000); // Poll every 5 seconds if not completed
//         }
//       };

//       const transcriptionText = await pollTranscription();

//       // Step 3: Perform sentiment analysis (using a simple library or API)
//       const sentiment = await analyzeSentiment(transcriptionText);

//       return { transcription: transcriptionText, sentiment };
//     } catch (err) {
//       console.error('Error during transcription and sentiment analysis:', err);
//       throw err;
//     }
//   };

//   // A simple sentiment analysis function (placeholder, can use a library or API)
//   const analyzeSentiment = async (text) => {
//     // Example: Using a basic sentiment analysis API
//     const response = await axios.post('https://sentim-api.herokuapp.com/api/v1/', {
//       text,
//     });

//     return response.data.result.type; // 'positive', 'neutral', or 'negative'
//   };

//   // Handle transcription and sentiment analysis for each recording
//   const handleAnalyzeRecordings = async () => {
//     setLoading(true);
//     const results = [];

//     for (let i = 0; i < recordings.length; i++) {
//       const publicUrl = getPublicUrl(recordings[i].name);
//       try {
//         const { transcription, sentiment } = await transcribeAndAnalyze(publicUrl);
//         results.push({ transcription, sentiment });
//       } catch (err) {
//         console.error('Error analyzing recording:', err);
//         results.push({ transcription: 'Error', sentiment: 'Error' });
//       }
//     }

//     setTranscriptions(results.map((result) => result.transcription));
//     setSentiments(results.map((result) => result.sentiment));
//     setLoading(false);
//   };

//   return (
//     <div className="container">
//       <h2>Speech-to-Text and Sentiment Analysis</h2>

//       <button onClick={handleAnalyzeRecordings} disabled={loading}>
//         {loading ? 'Analyzing...' : 'Start Analysis'}
//       </button>

//       {recordings.length > 0 && (
//         <table>
//           <thead>
//             <tr>
//               <th>Recording</th>
//               <th>Transcription</th>
//               <th>Sentiment</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recordings.map((recording, index) => (
//               <tr key={recording.name}>
//                 <td>
//                   <audio controls>
//                     <source src={getPublicUrl(recording.name)} type="audio/mpeg" />
//                     Your browser does not support the audio tag.
//                   </audio>
//                 </td>
//                 <td>{transcriptions[index] || 'Pending'}</td>
//                 <td>{sentiments[index] || 'Pending'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {loading && <p className="loading">Analyzing recordings...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default SpeechToTextAndSentiment;



// import React, { useState, useEffect } from 'react'; 
// import { supabase } from '../supabase';
// import axios from 'axios';

// const SpeechToTextAndSentiment = () => {
//   const [recordings, setRecordings] = useState([]);
//   const [transcriptions, setTranscriptions] = useState([]);
//   const [sentiments, setSentiments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const ASSEMBLY_AI_API_KEY = '05be3a0eb00d422ab91486f9590684c0'; // Replace with your AssemblyAI API key

//   // Fetch recordings from Supabase bucket
//   useEffect(() => {
//     const fetchRecordings = async () => {
//       try {
//         setLoading(true); // Start loading
//         const { data, error } = await supabase.storage
//           .from('callrec')
//           .list('', { limit: 100 });

//         if (error) {
//           console.error('Error fetching recordings:', error);
//           setError('Failed to fetch recordings');
//         } else if (data && data.length > 0) {
//           // Filter out any placeholder files
//           const validRecordings = data.filter(file => file.name !== '.emptyFolderPlaceholder');

//           // Sort the recordings by created_at in descending order
//           const sortedData = validRecordings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//           setRecordings(sortedData);
//         } else {
//           console.log('No recordings found.');
//         }
//       } catch (err) {
//         console.error('Error fetching recordings:', err);
//         setError('Error fetching recordings');
//       } finally {
//         setLoading(false); // Set loading to false after fetching completes
//       }
//     };

//     fetchRecordings();
//   }, []);

//   // Get the public URL for an audio recording
//   const getPublicUrl = (fileName) => {
//     const { data } = supabase.storage.from('callrec').getPublicUrl(fileName);
//     return data?.publicUrl || '';
//   };

//   // Transcribe audio and perform sentiment analysis
//   const transcribeAndAnalyze = async (audioUrl) => {
//     try {
//       // Step 1: Request transcription from AssemblyAI
//       const transcriptionResponse = await axios.post(
//         'https://api.assemblyai.com/v2/transcript',
//         {
//           audio_url: audioUrl, // The public URL of the audio file
//         },
//         {
//           headers: {
//             authorization: ASSEMBLY_AI_API_KEY,
//             'content-type': 'application/json',
//           },
//         }
//       );

//       const transcriptId = transcriptionResponse.data.id;

//       // Step 2: Poll for the transcription result
//       const pollTranscription = async () => {
//         try {
//           const { data } = await axios.get(
//             `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
//             {
//               headers: {
//                 authorization: ASSEMBLY_AI_API_KEY,
//               },
//             }
//           );

//           if (data.status === 'completed') {
//             return data.text; // Return the transcription text
//           } else if (data.status === 'failed') {
//             throw new Error('Transcription failed');
//           } else {
//             setTimeout(pollTranscription, 5000); // Poll every 5 seconds if not completed
//           }
//         } catch (err) {
//           console.error('Error during transcription polling:', err);
//           throw new Error('Error during transcription polling');
//         }
//       };

//       const transcriptionText = await pollTranscription();

//       // Step 3: Perform sentiment analysis (using a simple library or API)
//       const sentiment = await analyzeSentiment(transcriptionText);

//       return { transcription: transcriptionText, sentiment };
//     } catch (err) {
//       console.error('Error during transcription and sentiment analysis:', err);
//       throw err;
//     }
//   };

//   // A simple sentiment analysis function (placeholder, can use a library or API)
//   const analyzeSentiment = async (text) => {
//     try {
//       const response = await axios.post('https://sentim-api.herokuapp.com/api/v1/', {
//         text,
//       });

//       return response.data.result.type; // 'positive', 'neutral', or 'negative'
//     } catch (err) {
//       console.error('Error during sentiment analysis:', err);
//       return 'Error'; // Return 'Error' if sentiment analysis fails
//     }
//   };

//   // Handle transcription and sentiment analysis for each recording
//   const handleAnalyzeRecordings = async () => {
//     setLoading(true);
//     const results = [];

//     for (let i = 0; i < recordings.length; i++) {
//       const publicUrl = getPublicUrl(recordings[i].name);
//       try {
//         const { transcription, sentiment } = await transcribeAndAnalyze(publicUrl);
//         results.push({ transcription, sentiment });
//       } catch (err) {
//         console.error('Error analyzing recording:', err);
//         results.push({ transcription: 'Error', sentiment: 'Error' });
//       }
//     }

//     // Update the state after processing all recordings
//     setTranscriptions(results.map((result) => result.transcription));
//     setSentiments(results.map((result) => result.sentiment));
//     setLoading(false);
//   };

//   return (
//     <div className="container">
//       <h2>Speech-to-Text and Sentiment Analysis</h2>

//       <button onClick={handleAnalyzeRecordings} disabled={loading}>
//         {loading ? 'Analyzing...' : 'Start Analysis'}
//       </button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {recordings.length > 0 && (
//         <table>
//           <thead>
//             <tr>
//               <th>Recording</th>
//               <th>Transcription</th>
//               <th>Sentiment</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recordings.map((recording, index) => (
//               <tr key={recording.name}>
//                 <td>
//                   <audio controls>
//                     <source src={getPublicUrl(recording.name)} type="audio/mpeg" />
//                     Your browser does not support the audio tag.
//                   </audio>
//                 </td>
//                 <td>{transcriptions[index] || 'Pending'}</td>
//                 <td>{sentiments[index] || 'Pending'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {loading && <p className="loading">Analyzing recordings...</p>}
//     </div>
//   );
// };

// export default SpeechToTextAndSentiment;







// import React, { useState, useEffect } from 'react'; 
// import { supabase } from '../supabase';
// import axios from 'axios';

// const SpeechToText = () => {
//   const [recordings, setRecordings] = useState([]);
//   const [transcriptions, setTranscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const ASSEMBLY_AI_API_KEY = '05be3a0eb00d422ab91486f9590684c0'; // Replace with your AssemblyAI API key

//   // Fetch recordings from Supabase bucket
//   useEffect(() => {
//     const fetchRecordings = async () => {
//       try {
//         setLoading(true); // Start loading
//         const { data, error } = await supabase.storage
//           .from('new')
//           .list('', { limit: 100 });

//         if (error) {
//           console.error('Error fetching recordings:', error);
//           setError('Failed to fetch recordings');
//         } else if (data && data.length > 0) {
//           // Filter out any placeholder files
//           const validRecordings = data.filter(file => file.name !== '.emptyFolderPlaceholder');

//           // Sort the recordings by created_at in descending order
//           const sortedData = validRecordings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//           setRecordings(sortedData);
//         } else {
//           console.log('No recordings found.');
//         }
//       } catch (err) {
//         console.error('Error fetching recordings:', err);
//         setError('Error fetching recordings');
//       } finally {
//         setLoading(false); // Set loading to false after fetching completes
//       }
//     };

//     fetchRecordings();
//   }, []);

//   // Get the public URL for an audio recording
//   const getPublicUrl = (fileName) => {
//     const { data } = supabase.storage.from('new').getPublicUrl(fileName);
//     return data?.publicUrl || '';
//   };

//   // Transcribe audio
//   const transcribe = async (audioUrl) => {
//     try {
//       // Step 1: Request transcription from AssemblyAI
//       const transcriptionResponse = await axios.post(
//         'https://api.assemblyai.com/v2/transcript',
//         {
//           audio_url: audioUrl, // The public URL of the audio file
//         },
//         {
//           headers: {
//             authorization: ASSEMBLY_AI_API_KEY,
//             'content-type': 'application/json',
//           },
//         }
//       );

//       const transcriptId = transcriptionResponse.data.id;

//       // Step 2: Poll for the transcription result
//       const pollTranscription = async () => {
//         try {
//           const { data } = await axios.get(
//             `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
//             {
//               headers: {
//                 authorization: ASSEMBLY_AI_API_KEY,
//               },
//             }
//           );

//           if (data.status === 'completed') {
//             return data.text; // Return the transcription text
//           } else if (data.status === 'failed') {
//             throw new Error('Transcription failed');
//           } else {
//             console.log('Waiting for transcription...');
//             return null; // Return null if not completed, will keep polling
//           }
//         } catch (err) {
//           console.error('Error during transcription polling:', err);
//           throw new Error('Error during transcription polling');
//         }
//       };

//       let transcriptionText = null;
//       while (transcriptionText === null) {
//         transcriptionText = await pollTranscription();
//         if (transcriptionText === null) {
//           await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before polling again
//         }
//       }

//       return transcriptionText;
//     } catch (err) {
//       console.error('Error during transcription:', err);
//       throw err;
//     }
//   };

//   // Handle transcription for each recording
//   const handleTranscribeRecordings = async () => {
//     setLoading(true);
//     const results = [];

//     for (let i = 0; i < recordings.length; i++) {
//       const publicUrl = getPublicUrl(recordings[i].name);
//       try {
//         const transcription = await transcribe(publicUrl);
//         results.push({ transcription });
//       } catch (err) {
//         console.error('Error transcribing recording:', err);
//         results.push({ transcription: 'Error' });
//       }
//     }

//     // Update the state after processing all recordings
//     setTranscriptions(results);
//     setLoading(false);
//   };

//   return (
//     <div className="container">
//       <h2>Speech-to-Text</h2>

//       <button onClick={handleTranscribeRecordings} disabled={loading}>
//         {loading ? 'Transcribing...' : 'Start Transcription'}
//       </button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {recordings.length > 0 && (
//         <table>
//           <thead>
//             <tr>
//               <th>Recording</th>
//               <th>Transcription</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recordings.map((recording, index) => (
//               <tr key={recording.name}>
//                 <td>
//                   <audio controls>
//                     <source src={getPublicUrl(recording.name)} type="audio/mpeg" />
//                     Your browser does not support the audio tag.
//                   </audio>
//                 </td>
//                 <td>{transcriptions[index]?.transcription || 'Pending'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {loading && <p className="loading">Transcribing recordings...</p>}
//     </div>
//   );
// };

// export default SpeechToText;

// import React, { useState, useEffect } from 'react';   
// import { supabase } from '../supabase';
// import axios from 'axios';

// const SpeechToText = () => {
//   const [recordings, setRecordings] = useState([]);
//   const [transcriptions, setTranscriptions] = useState([]);
//   const [sentiments, setSentiments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const ASSEMBLY_AI_API_KEY = '05be3a0eb00d422ab91486f9590684c0'; // Replace with your AssemblyAI API key

//   // Fetch recordings from Supabase bucket
//   useEffect(() => {
//     const fetchRecordings = async () => {
//       try {
//         setLoading(true); // Start loading
//         const { data, error } = await supabase.storage
//           .from('new')
//           .list('', { limit: 100 });

//         if (error) {
//           console.error('Error fetching recordings:', error);
//           setError('Failed to fetch recordings');
//         } else if (data && data.length > 0) {
//           // Filter out any placeholder files
//           const validRecordings = data.filter(file => file.name !== '.emptyFolderPlaceholder');

//           // Sort the recordings by created_at in descending order
//           const sortedData = validRecordings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//           setRecordings(sortedData);
//         } else {
//           console.log('No recordings found.');
//         }
//       } catch (err) {
//         console.error('Error fetching recordings:', err);
//         setError('Error fetching recordings');
//       } finally {
//         setLoading(false); // Set loading to false after fetching completes
//       }
//     };

//     fetchRecordings();
//   }, []);

//   // Get the public URL for an audio recording
//   const getPublicUrl = (fileName) => {
//     const { data } = supabase.storage.from('new').getPublicUrl(fileName);
//     return data?.publicUrl || '';
//   };

//   // Transcribe audio
//   const transcribe = async (audioUrl) => {
//     try {
//       // Step 1: Request transcription from AssemblyAI
//       const transcriptionResponse = await axios.post(
//         'https://api.assemblyai.com/v2/transcript',
//         {
//           audio_url: audioUrl, // The public URL of the audio file
//         },
//         {
//           headers: {
//             authorization: ASSEMBLY_AI_API_KEY,
//             'content-type': 'application/json',
//           },
//         }
//       );

//       const transcriptId = transcriptionResponse.data.id;

//       // Step 2: Poll for the transcription result
//       const pollTranscription = async () => {
//         try {
//           const { data } = await axios.get(
//             `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
//             {
//               headers: {
//                 authorization: ASSEMBLY_AI_API_KEY,
//               },
//             }
//           );

//           if (data.status === 'completed') {
//             return data.text; // Return the transcription text
//           } else if (data.status === 'failed') {
//             throw new Error('Transcription failed');
//           } else {
//             console.log('Waiting for transcription...');
//             return null; // Return null if not completed, will keep polling
//           }
//         } catch (err) {
//           console.error('Error during transcription polling:', err);
//           throw new Error('Error during transcription polling');
//         }
//       };

//       let transcriptionText = null;
//       while (transcriptionText === null) {
//         transcriptionText = await pollTranscription();
//         if (transcriptionText === null) {
//           await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before polling again
//         }
//       }

//       return transcriptionText;
//     } catch (err) {
//       console.error('Error during transcription:', err);
//       throw err;
//     }
//   };

//   // Dummy Sentiment Analysis Logic
//   const analyzeSentiment = (transcription) => {
//     const positiveWords = ['good', 'happy', 'excellent', 'great', 'joy', 'positive'];
//     const negativeWords = ['bad', 'sad', 'angry', 'hate', 'terrible', 'negative'];
    
//     let sentiment = 'Neutral';

//     // Check for positive words
//     for (let word of positiveWords) {
//       if (transcription.toLowerCase().includes(word)) {
//         sentiment = 'Positive';
//         break;
//       }
//     }

//     // Check for negative words if no positive sentiment found
//     if (sentiment === 'Neutral') {
//       for (let word of negativeWords) {
//         if (transcription.toLowerCase().includes(word)) {
//           sentiment = 'Negative';
//           break;
//         }
//       }
//     }

//     return sentiment;
//   };

//   // Handle transcription and sentiment analysis for each recording
//   const handleTranscribeAndAnalyzeSentiment = async () => {
//     setLoading(true);
//     const transcriptionResults = [];
//     const sentimentResults = [];

//     for (let i = 0; i < recordings.length; i++) {
//       const publicUrl = getPublicUrl(recordings[i].name);
//       try {
//         const transcription = await transcribe(publicUrl);
//         const sentiment = analyzeSentiment(transcription);

//         transcriptionResults.push({ transcription });
//         sentimentResults.push({ sentiment });
//       } catch (err) {
//         console.error('Error processing recording:', err);
//         transcriptionResults.push({ transcription: 'Error' });
//         sentimentResults.push({ sentiment: 'Error' });
//       }
//     }

//     // Update the state after processing all recordings
//     setTranscriptions(transcriptionResults);
//     setSentiments(sentimentResults);
//     setLoading(false);
//   };

//   return (
//     <div className="container">
//       <h2>Speech-to-Text with Dummy Sentiment Analysis</h2>

//       <button onClick={handleTranscribeAndAnalyzeSentiment} disabled={loading}>
//         {loading ? 'Processing...' : 'Start Processing'}
//       </button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {recordings.length > 0 && (
//         <table>
//           <thead>
//             <tr>
//               <th>Recording</th>
//               <th>Transcription</th>
//               <th>Sentiment</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recordings.map((recording, index) => (
//               <tr key={recording.name}>
//                 <td>
//                   <audio controls>
//                     <source src={getPublicUrl(recording.name)} type="audio/mpeg" />
//                     Your browser does not support the audio tag.
//                   </audio>
//                 </td>
//                 <td>{transcriptions[index]?.transcription || 'Pending'}</td>
//                 <td>{sentiments[index]?.sentiment || 'Pending'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {loading && <p className="loading">Processing recordings...</p>}
//     </div>
//   );
// };

// export default SpeechToText;

// import React, { useState, useEffect } from 'react';   
// import { supabase } from '../supabase';
// import axios from 'axios';

// const SpeechToText = () => {
//   const [recordings, setRecordings] = useState([]);
//   const [transcriptions, setTranscriptions] = useState([]);
//   const [sentiments, setSentiments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const ASSEMBLY_AI_API_KEY = '05be3a0eb00d422ab91486f9590684c0'; // Replace with your AssemblyAI API key

//   // Fetch recordings from Supabase bucket
//   useEffect(() => {
//     const fetchRecordings = async () => {
//       try {
//         setLoading(true); // Start loading
//         const { data, error } = await supabase.storage
//           .from('new')
//           .list('', { limit: 100 });

//         if (error) {
//           console.error('Error fetching recordings:', error);
//           setError('Failed to fetch recordings');
//         } else if (data && data.length > 0) {
//           // Filter out any placeholder files
//           const validRecordings = data.filter(file => file.name !== '.emptyFolderPlaceholder');

//           // Sort the recordings by created_at in descending order
//           const sortedData = validRecordings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//           setRecordings(sortedData);
//         } else {
//           console.log('No recordings found.');
//         }
//       } catch (err) {
//         console.error('Error fetching recordings:', err);
//         setError('Error fetching recordings');
//       } finally {
//         setLoading(false); // Set loading to false after fetching completes
//       }
//     };

//     fetchRecordings();
//   }, []);

//   // Get the public URL for an audio recording
//   const getPublicUrl = (fileName) => {
//     const { data } = supabase.storage.from('new').getPublicUrl(fileName);
//     return data?.publicUrl || '';
//   };

//   // Transcribe audio and get sentiment analysis from AssemblyAI
//   const transcribeAndAnalyzeSentiment = async (audioUrl) => {
//     try {
//       // Step 1: Request transcription and sentiment analysis from AssemblyAI
//       const response = await axios.post(
//         'https://api.assemblyai.com/v2/transcript',
//         {
//           audio_url: audioUrl, // The public URL of the audio file
//           sentiment_analysis: true // Enable sentiment analysis
//         },
//         {
//           headers: {
//             authorization: ASSEMBLY_AI_API_KEY,
//             'content-type': 'application/json',
//           },
//         }
//       );

//       const transcriptId = response.data.id;

//       // Step 2: Poll for the transcription and sentiment result
//       const pollTranscription = async () => {
//         try {
//           const { data } = await axios.get(
//             `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
//             {
//               headers: {
//                 authorization: ASSEMBLY_AI_API_KEY,
//               },
//             }
//           );

//           if (data.status === 'completed') {
//             return {
//               transcription: data.text,
//               sentiment: data.sentiment_analysis_results
//             };
//           } else if (data.status === 'failed') {
//             throw new Error('Transcription failed');
//           } else {
//             console.log('Waiting for transcription and sentiment analysis...');
//             return null; // Return null if not completed, will keep polling
//           }
//         } catch (err) {
//           console.error('Error during transcription polling:', err);
//           throw new Error('Error during transcription polling');
//         }
//       };

//       let result = null;
//       while (result === null) {
//         result = await pollTranscription();
//         if (result === null) {
//           await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before polling again
//         }
//       }

//       return result;
//     } catch (err) {
//       console.error('Error during transcription and sentiment analysis:', err);
//       throw err;
//     }
//   };

//   // Handle transcription and sentiment analysis for each recording
//   const handleTranscribeAndAnalyzeSentiment = async () => {
//     setLoading(true);
//     const transcriptionResults = [];
//     const sentimentResults = [];

//     for (let i = 0; i < recordings.length; i++) {
//       const publicUrl = getPublicUrl(recordings[i].name);
//       try {
//         const { transcription, sentiment } = await transcribeAndAnalyzeSentiment(publicUrl);
        
//         transcriptionResults.push({ transcription });
        
//         // Extract and format sentiment analysis results
//         const sentimentSummary = sentiment
//           .map(item => `${item.sentiment} (${item.confidence.toFixed(2)})`)
//           .join(', ');
        
//         sentimentResults.push({ sentiment: sentimentSummary });
//       } catch (err) {
//         console.error('Error processing recording:', err);
//         transcriptionResults.push({ transcription: 'Error' });
//         sentimentResults.push({ sentiment: 'Error' });
//       }
//     }

//     // Update the state after processing all recordings
//     setTranscriptions(transcriptionResults);
//     setSentiments(sentimentResults);
//     setLoading(false);
//   };

//   return (
//     <div className="container">
//       <h2>Speech-to-Text with Sentiment Analysis</h2>

//       <button onClick={handleTranscribeAndAnalyzeSentiment} disabled={loading}>
//         {loading ? 'Processing...' : 'Start Processing'}
//       </button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {recordings.length > 0 && (
//         <table>
//           <thead>
//             <tr>
//               <th>Recording</th>
//               <th>Transcription</th>
//               <th>Sentiment</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recordings.map((recording, index) => (
//               <tr key={recording.name}>
//                 <td>
//                   <audio controls>
//                     <source src={getPublicUrl(recording.name)} type="audio/mpeg" />
//                     Your browser does not support the audio tag.
//                   </audio>
//                 </td>
//                 <td>{transcriptions[index]?.transcription || 'Pending'}</td>
//                 <td>{sentiments[index]?.sentiment || 'Pending'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {loading && <p className="loading">Processing recordings...</p>}
//     </div>
//   );
// };

// export default SpeechToText;


import React, { useState, useEffect } from 'react';   
import { supabase } from '../supabase';
import axios from 'axios';

const SpeechToText = () => {
  const [recordings, setRecordings] = useState([]);
  const [transcriptions, setTranscriptions] = useState([]);
  const [sentiments, setSentiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ASSEMBLY_AI_API_KEY = '05be3a0eb00d422ab91486f9590684c0'; // Replace with your AssemblyAI API key

  // Fetch recordings from Supabase bucket
  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        setLoading(true); // Start loading
        const { data, error } = await supabase.storage
          .from('new')
          .list('', { limit: 100 });

        if (error) {
          console.error('Error fetching recordings:', error);
          setError('Failed to fetch recordings');
        } else if (data && data.length > 0) {
          // Filter out any placeholder files
          const validRecordings = data.filter(file => file.name !== '.emptyFolderPlaceholder');

          // Sort the recordings by created_at in descending order
          const sortedData = validRecordings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setRecordings(sortedData);
        } else {
          console.log('No recordings found.');
        }
      } catch (err) {
        console.error('Error fetching recordings:', err);
        setError('Error fetching recordings');
      } finally {
        setLoading(false); // Set loading to false after fetching completes
      }
    };

    fetchRecordings();
  }, []);

  // Get the public URL for an audio recording
  const getPublicUrl = (fileName) => {
    const { data } = supabase.storage.from('new').getPublicUrl(fileName);
    return data?.publicUrl || '';
  };

  // Transcribe audio and get sentiment analysis from AssemblyAI
  const transcribeAndAnalyzeSentiment = async (audioUrl) => {
    try {
      // Step 1: Request transcription and sentiment analysis from AssemblyAI
      const response = await axios.post(
        'https://api.assemblyai.com/v2/transcript',
        {
          audio_url: audioUrl, // The public URL of the audio file
          sentiment_analysis: true // Enable sentiment analysis
        },
        {
          headers: {
            authorization: ASSEMBLY_AI_API_KEY,
            'content-type': 'application/json',
          },
        }
      );

      const transcriptId = response.data.id;

      // Step 2: Poll for the transcription and sentiment result
      const pollTranscription = async () => {
        try {
          const { data } = await axios.get(
            `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
            {
              headers: {
                authorization: ASSEMBLY_AI_API_KEY,
              },
            }
          );

          if (data.status === 'completed') {
            return {
              transcription: data.text,
              sentiment: data.sentiment_analysis_results
            };
          } else if (data.status === 'failed') {
            throw new Error('Transcription failed');
          } else {
            console.log('Waiting for transcription and sentiment analysis...');
            return null; // Return null if not completed, will keep polling
          }
        } catch (err) {
          console.error('Error during transcription polling:', err);
          throw new Error('Error during transcription polling');
        }
      };

      let result = null;
      while (result === null) {
        result = await pollTranscription();
        if (result === null) {
          await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before polling again
        }
      }

      return result;
    } catch (err) {
      console.error('Error during transcription and sentiment analysis:', err);
      throw err;
    }
  };

  // Handle transcription and sentiment analysis for each recording
  const handleTranscribeAndAnalyzeSentiment = async () => {
    setLoading(true);
    const transcriptionResults = [];
    const sentimentResults = [];

    for (let i = 0; i < recordings.length; i++) {
      const publicUrl = getPublicUrl(recordings[i].name);
      try {
        const { transcription, sentiment } = await transcribeAndAnalyzeSentiment(publicUrl);
        
        transcriptionResults.push({ transcription });
        
        // Extract and format sentiment analysis results
        const sentimentSummary = sentiment
          .map(item => `${item.sentiment} (${item.confidence.toFixed(2)})`)
          .join(', ');
        
        sentimentResults.push({ sentiment: sentimentSummary });
      } catch (err) {
        console.error('Error processing recording:', err);
        transcriptionResults.push({ transcription: 'Error' });
        sentimentResults.push({ sentiment: 'Error' });
      }
    }

    // Update the state after processing all recordings
    setTranscriptions(transcriptionResults);
    setSentiments(sentimentResults);
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Speech-to-Text with Sentiment Analysis</h2>

      <button onClick={handleTranscribeAndAnalyzeSentiment} disabled={loading}>
        {loading ? 'Processing...' : 'Start Processing'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {recordings.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Recording</th>
              <th>Transcription</th>
              <th>Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {recordings.map((recording, index) => (
              <tr key={recording.name}>
                <td>
                  <audio controls>
                    <source src={getPublicUrl(recording.name)} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                  </audio>
                </td>
                <td>{transcriptions[index]?.transcription || 'Pending'}</td>
                <td>{sentiments[index]?.sentiment || 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {loading && <p className="loading">Processing recordings...</p>}
    </div>
  );
};

export default SpeechToText;
