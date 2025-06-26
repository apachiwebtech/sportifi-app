import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EventResult = () => {
  const matchResults = [
    { time: "11:00 AM", player1: "Rahul", player2: "Sameer" },
    { time: "11:30 AM", player1: "Ravi", player2: "Akash" },
    { time: "12:00 PM", player1: "Karan", player2: "Aman" },
  ];
 const location = useLocation();
const { eventType, ageCategory, roundDesc, gameType } = location.state || {};

const navigate = useNavigate();
const handleClick = (match) => {
    navigate('/result');
  };




  return (
    <div style={{ background: "#aeb6fa" }}>
      <Header />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '10px',
          marginTop: '40px',
          paddingBottom: '80px',
          background: '#f6f6fc',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: 600,
            fontSize: '21px',
            letterSpacing: '1.5px',
            color: '#0d47a1',
            textAlign: 'center',
            textTransform: 'uppercase',
            mt: -2,
            mb: 2,
          }}
        >
          Event Result
        </Typography>

        <Card sx={{ backgroundColor: '#f3f3f7', borderRadius: 2, p: 2, boxShadow: 3 }}>
          <Typography sx={{
            color: '#0d47a1',
            fontWeight: '700',
            fontFamily: '"Open Sans", sans-serif'
          }}>
            Champions Trophy
          </Typography>

          <Typography sx={{
            fontSize: '13px',
            color: '#0d47a1',
            mt: 0.5,
            fontFamily: '"Open Sans", sans-serif'
          }}>
           {eventType || "Event Type"} - Age {ageCategory || "N/A"}
          </Typography>

          
          <Card
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              p: 1,
              boxShadow: 2,
              mt: 2,
              fontFamily: '"Open Sans", sans-serif',
              border: '1px solid #c1c1dc'
            }}
          >
            <CardContent sx={{ padding: '10px !important' }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: "#0d47a1",
                  mb: 1,
                  fontSize: "15px",
                  borderBottom: "1px solid #c1c1dc",
                  fontFamily: '"Open Sans", sans-serif'
                }}
              >
                Match Result
              </Typography>

             {/* Table Header */}
<Box
  sx={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    textAlign: 'center',
    border: '1px solid #c1c1dc',
    borderRadius: 1,
    overflow: 'hidden',
    fontWeight: 600,
    color: '#0d47a1',
    fontSize: '13px',
    fontFamily: '"Open Sans", sans-serif',
    backgroundColor: '#e8eaf6', // Optional: subtle background for header
  }}
>
  <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #c1c1dc' }}>
    Time
  </Box>
  <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #c1c1dc' }}>
    Player 1
  </Box>
  <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #c1c1dc' }}>
    Player 2
  </Box>
  <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    Final Result
  </Box>
</Box>

              

              {/* Dynamic Data Rows */}
             {matchResults.map((match, index) => (
  <Box
    key={index}
    onClick={() => handleClick(match)}
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      textAlign: 'center',
      fontSize: '14px',
      color: '#000',
      borderBottom: '1px solid #c1c1dc',
      py: 2,
      cursor: 'pointer',
      '&:hover': { backgroundColor: '#f2f3fc' }
    }}
  >
    <Box>{match.time}</Box>
    <Box>{match.player1}</Box>
    <Box>{match.player2}</Box>
    <Box sx={{ color: match.p1Score !== undefined && match.p2Score !== undefined ? '#000' : 'red' }}>
      {match.p1Score !== undefined && match.p2Score !== undefined
        ? `${match.p1Score} / ${match.p2Score}`
        : '- / -'}
    </Box>
  </Box>
))}

            </CardContent>
          </Card>
        </Card>
      </Box>

      <Footer />
    </div>
  );
};

export default EventResult;
