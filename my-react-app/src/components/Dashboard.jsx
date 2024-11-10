// // src/components/Dashboard.js
// import { useState, useEffect } from 'react';
// import { supabase } from '../supabase';

// function Dashboard() {
//   const [stats, setStats] = useState({ totalCalls: 0, totalDuration: 0 });

//   useEffect(() => {
//     const fetchStats = async () => {
//       const { data, error } = await supabase.from('call_logs').select('*');
//       if (error) console.error(error);

//       const totalCalls = data.length;
//       const totalDuration = data.reduce((sum, call) => sum + call.duration, 0); // duration is in seconds
//       setStats({ totalCalls, totalDuration });
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div style={styles.container}>
//       <h2>Dashboard</h2>
//       <p>Total Calls: {stats.totalCalls}</p>
//       <p>Total Call Duration (seconds): {stats.totalDuration}</p>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     marginLeft: '250px',
//     marginTop: '80px',
//     padding: '20px',
//   },
// };

// export default Dashboard;
// import { useState, useEffect } from 'react';
// import { supabase } from '../supabase';
// import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
// import { styled } from '@mui/system';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

// function Dashboard() {
//   const [stats, setStats] = useState({
//     totalCalls: 0,
//     declinedCalls: 0,
//     hoursSpent: 0,
//     pendingCalls: 0,
//     sentimentData: [],
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       const { data, error } = await supabase.from('call_logs').select('*');
//       if (error) console.error(error);

//       const totalCalls = data.length;
//       const declinedCalls = data.filter(call => call.status === 'declined').length;
//       const totalDuration = data.reduce((sum, call) => sum + call.duration, 0);
//       const pendingCalls = data.filter(call => call.status === 'pending').length;

//       setStats({
//         totalCalls,
//         declinedCalls,
//         hoursSpent: (totalDuration / 3600).toFixed(2), // converting seconds to hours
//         pendingCalls,
//         sentimentData: getSentimentAnalysis(data),
//       });
//     };

//     fetchStats();
//   }, []);

//   const getSentimentAnalysis = (data) => {
//     // Mock sentiment data
//     return [
//       { label: 'Positive', value: 60 },
//       { label: 'Neutral', value: 25 },
//       { label: 'Negative', value: 15 },
//     ];
//   };

//   return (
//     <Box sx={{ padding: '40px 20px', marginLeft: '250px', marginTop: '80px' }}>
//       <Typography variant="h3" sx={styles.title}>Dashboard</Typography>

//       {/* Stat Boxes */}
//       <Grid container spacing={3}>
//         {[
//           { label: 'Total Calls', value: stats.totalCalls, trend: 'Up 8.5%', color: '#1976d2' },
//           { label: 'Declined Calls', value: stats.declinedCalls, trend: 'Up 1.3%', color: '#e53935' },
//           { label: 'Hours Spent', value: stats.hoursSpent, trend: 'Down 4.3%', color: '#43a047' },
//           { label: 'Pending Calls', value: stats.pendingCalls, trend: 'Up 1.8%', color: '#fb8c00' }
//         ].map((stat, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <StyledCard elevation={3}>
//               <Typography variant="h6">{stat.label}</Typography>
//               <Typography variant="h4" sx={{ color: stat.color }}>{stat.value}</Typography>
//               <Typography variant="caption" sx={styles.trendText}>{stat.trend}</Typography>
//             </StyledCard>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Call Details Chart Placeholder */}
//       <Paper elevation={3} sx={{ ...styles.chartContainer, marginTop: '30px' }}>
//         <Typography variant="h6" sx={styles.subTitle}>Call Details</Typography>
//         <Box sx={styles.chartPlaceholder}>
//           <Typography>Chart Placeholder</Typography>
//         </Box>
//       </Paper>

//       {/* Sentiment Analysis */}
//       <Paper elevation={3} sx={{ ...styles.chartContainer, marginTop: '30px' }}>
//         <Typography variant="h6" sx={styles.subTitle}>Sentiment Analysis</Typography>
//         <Grid container spacing={3}>
//           {stats.sentimentData.map((sentiment, index) => (
//             <Grid item xs={4} key={index}>
//               <Box sx={styles.sentimentBox}>
//                 <CircularProgress
//                   variant="determinate"
//                   value={sentiment.value}
//                   size={100}
//                   thickness={4}
//                   color={sentiment.label === 'Positive' ? 'primary' : (sentiment.label === 'Neutral' ? 'info' : 'error')}
//                 />
//                 <Typography>{sentiment.label}</Typography>
//                 <Typography variant="h6">{sentiment.value}%</Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Paper>
//     </Box>
//   );
// }

// // Custom styles
// const styles = {
//   title: {
//     fontWeight: 600,
//     color: '#333',
//     marginBottom: '20px',
//   },
//   subTitle: {
//     fontWeight: 500,
//     marginBottom: '10px',
//     color: '#666',
//   },
//   trendText: {
//     color: '#888',
//     fontSize: '12px',
//     marginTop: '5px',
//   },
//   chartContainer: {
//     padding: '20px',
//     borderRadius: '12px',
//   },
//   chartPlaceholder: {
//     height: '300px',
//     backgroundColor: '#f1f1f1',
//     borderRadius: '8px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   sentimentBox: {
//     textAlign: 'center',
//     padding: '10px',
//   },
// };

// const StyledCard = styled(Paper)(({ theme }) => ({
//   padding: '20px',
//   textAlign: 'center',
//   borderRadius: '12px',
//   transition: '0.3s',
//   '&:hover': {
//     boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
//     transform: 'translateY(-5px)',
//   },
//   color: theme?.palette?.text?.secondary || '#888', // Fallback to #888 if theme is undefined
// }));

// // Create and wrap with theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//     text: {
//       primary: '#000',
//       secondary: '#666',
//     },
//   },
// });

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Dashboard />
//     </ThemeProvider>
//   );
// }

// export default App;


import { useState, useEffect, useRef } from 'react'; 
import { supabase } from '../supabase';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Doughnut, Line } from 'react-chartjs-2'; // Chart components
import Chart from 'chart.js/auto';

function Dashboard({ isSidebarOpen }) {
  const [stats, setStats] = useState({
    totalCalls: 0,
    declinedCalls: 0,
    hoursSpent: 0,
    pendingCalls: 0,
  });
  const [callLogs, setCallLogs] = useState([]);
  const gradientRef = useRef(null); // Create a ref to hold the gradient

  // Fetch call logs from the database and calculate statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: callLogs, error } = await supabase
          .from('call_logs')
          .select('*');

        if (error) {
          console.error('Error fetching call logs:', error);
        } else {
          const totalCalls = callLogs.length;
          const declinedCalls = callLogs.filter((log) => log.call_type === 'declined').length;
          const hoursSpent = callLogs.reduce((total, log) => total + log.duration / 3600, 0).toFixed(2); // Convert duration to hours
          const pendingCalls = callLogs.filter((log) => log.status === 'pending').length;

          setStats({ totalCalls, declinedCalls, hoursSpent, pendingCalls });
          setCallLogs(callLogs);
        }
      } catch (error) {
        console.error('Error fetching call logs:', error);
      }
    };

    fetchStats();
  }, []);

  // Create gradient color for the line chart
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    gradientRef.current = ctx.createLinearGradient(0, 0, 0, 400);
    gradientRef.current.addColorStop(0, 'rgba(25, 118, 210, 0.3)'); // Start color
    gradientRef.current.addColorStop(1, 'rgba(25, 118, 210, 0.1)'); // End color
  }, []);

  // Line chart data with gradient
  const lineChartData = {
    labels: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    datasets: [
      {
        label: 'Calls',
        data: [1000, 2000, 3500, 4500, 3000, 2500, 4000, 3000], // Replace with real data as needed
        borderColor: '#1976d2',
        backgroundColor: gradientRef.current, // Use the gradient from the ref
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#1976d2',
        pointBorderWidth: 2,
      },
    ],
  };

  // Line chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Time',
          color: '#666',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          color: '#e0e0e0',
          borderColor: '#1976d2',
        },
        title: {
          display: true,
          text: 'Number of Calls',
          color: '#666',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          color: '#666',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1976d2',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
  };

  // Donut Chart for Sentimental Analysis (Dummy data)
  const sentimentDonutData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ['#43a047', '#fb8c00', '#e53935'],
        hoverBackgroundColor: ['#388e3c', '#ef6c00', '#d32f2f'],
      },
    ],
  };

  return (
    <Box sx={{ padding: '20px 40px', marginLeft: isSidebarOpen ? '250px' : '0px', transition: 'margin-left 0.3s' }}>
      <Typography variant="h4" sx={styles.title}>Dashboard</Typography>

      <Grid container spacing={4}>
        {[
          { label: 'Total Calls', value: stats.totalCalls, trend: '8.5% Up from yesterday', color: '#1976d2', arrow: 'up', icon: '/a.svg' },
          { label: 'Declined Calls', value: stats.declinedCalls, trend: '1.3% Up from past week', color: '#e53935', arrow: 'up', icon: '/c.svg' },
          { label: 'Hours Spent', value: stats.hoursSpent, trend: '4.3% Down from week', color: '#43a047', arrow: 'down', icon: '/d.svg' },
          { label: 'Pending Calls', value: stats.pendingCalls, trend: '1.8% Up from yesterday', color: '#fb8c00', arrow: 'up', icon: '/e.svg' },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StyledCard elevation={3}>
              <Box sx={styles.statContainer}>
                <img src={stat.icon} alt={stat.label} style={styles.icon} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={styles.label}>{stat.label}</Typography>
                  <Typography variant="h4" sx={{ color: stat.color }}>{stat.value}</Typography>
                  <Box sx={styles.trendContainer}>
                    {stat.arrow === 'up' ? (
                      <ArrowUpward sx={{ color: stat.color, fontSize: '18px' }} />
                    ) : (
                      <ArrowDownward sx={{ color: stat.color, fontSize: '18px' }} />
                    )}
                    <Typography variant="body2" sx={styles.trendText}>{stat.trend}</Typography>
                  </Box>
                </Box>
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Line Chart for Call Details and one Donut Chart */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h6" sx={styles.chartTitle}>Calls Details</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={8}>
            <StyledChartContainer sx={{ height: '300px' }}>
              <Line data={lineChartData} options={lineChartOptions} />
            </StyledChartContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledChartContainer sx={{ height: '300px', width: '350px' }}>
              <Doughnut data={sentimentDonutData} options={{ maintainAspectRatio: false }} />
            </StyledChartContainer>
          </Grid>
        </Grid>
      </Box>

      {/* Remaining Donut Charts */}
      {/* <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h6" sx={styles.chartTitle}>Sentimental Analysis</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <StyledChartContainer sx={{ height: '300px', width: '300px' }}>
              <Doughnut data={sentimentDonutData} options={{ maintainAspectRatio: false }} />
            </StyledChartContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledChartContainer sx={{ height: '300px', width: '300px' }}>
              <Doughnut data={sentimentDonutData} options={{ maintainAspectRatio: false }} />
            </StyledChartContainer>
          </Grid>
        </Grid>
      </Box> */}
    </Box>
  );
}

// Custom styles
const styles = {
  title: {
    marginLeft: '5px',
    marginTop: '80px',
    fontSize: '1.8rem',
    fontWeight: 600,
    color: '#333',
    marginBottom: '20px',
  },
  statContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: '80px',
    height: '80px',
    marginRight: '15px',
  },
  trendText: {
    color: '#888',
    fontSize: '14px',
    marginLeft: '5px',
  },
  trendContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  label: {
    fontWeight: 500,
    marginBottom: '10px',
    color: '#555',
  },
  chartTitle: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#333',
    marginBottom: '10px',
  },
};

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: '20px',
  textAlign: 'center',
  borderRadius: '10px',
  transition: '0.3s',
  '&:hover': {
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-3px)',
  },
  color: theme?.palette?.text?.secondary || '#888',
}));

const StyledChartContainer = styled(Box)(({ theme }) => ({
  padding: '20px',
  borderRadius: '10px',
  backgroundColor: theme?.palette?.background?.default || '#fff',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  marginTop: '20px',
  height: '100%', // Set to fill the container
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default Dashboard;

















