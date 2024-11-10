

// export default RecordingsList;

import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase'; // Import your initialized Supabase client

const RecordingsList = () => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(false); // Initialize loading as false
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for employee selection

  // Dummy employee for selection
  const dummyEmployee = "John Doe";

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!selectedEmployee) return; // Only fetch recordings if an employee is selected

      setLoading(true); // Set loading to true when fetching starts

      try {
        // Fetch the list of recordings from the 'callrec' bucket
        const { data, error } = await supabase
          .storage
          .from('callrec')
          .list('', { limit: 100 });

        if (error) {
          console.error('Error fetching recordings:', error);
        } else if (data && data.length > 0) {
          // Sort the recordings by created_at in descending order
          const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setRecordings(sortedData);
        } else {
          console.log('No recordings found.');
        }
      } catch (err) {
        console.error('Error fetching recordings:', err);
      }

      setLoading(false); // Set loading to false after fetching completes
    };

    fetchRecordings();
  }, [selectedEmployee]);

  // Function to get the public URL of the recording
  const getPublicUrl = (fileName) => {
    const { data, error } = supabase.storage.from('callrec').getPublicUrl(fileName);
    if (error) {
      console.error('Error getting public URL:', error);
      return '';
    }
    return data.publicUrl;
  };

  return (
    <div style={styles.container}>
      {/* Show the employee's name after clicking the button */}
      {selectedEmployee ? (
        <h2>{dummyEmployee}</h2>
      ) : (
        // Show the button only if the employee isn't selected yet
        <button
          onClick={() => setSelectedEmployee(dummyEmployee)}
          style={styles.employeeButton}
        >
          {dummyEmployee}
        </button>
      )}

      {loading ? (
        <div>Loading recordings...</div>
      ) : (
        selectedEmployee && recordings.length > 0 ? (
          <ul>
            {recordings.map((recording) => (
              <li key={recording.id}>
                <p>{recording.name}</p>
                {/* Audio player */}
                <audio controls>
                  <source src={getPublicUrl(recording.name)} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
              </li>
            ))}
          </ul>
        ) : (
          selectedEmployee && <p>No recordings available.</p>
        )
      )}
    </div>
  );
};

const styles = {
  container: {
    marginLeft: '250px',
    marginTop: '80px',
    padding: '20px',
  },
  employeeButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
};

export default RecordingsList;




