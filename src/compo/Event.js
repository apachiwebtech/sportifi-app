import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ Import this

const Event = () => {
  const navigate = useNavigate(); // ✅ Initialize it
 const location = useLocation();

  const { name, date, venue } = location.state || {
    name: "Tournament Name",
    date: "Unknown Date",
    venue: "Unknown Venue",
  };
  const eventData = [
    {
      eventType: "Teams",
      ageCategory: "39 to 48",
      roundDesc: "Group League",
      gameType: "Best of 3",
    },
    {
      eventType: "Singles",
      ageCategory: "18 to 25",
      roundDesc: "Knockout",
      gameType: "Best of 1",
    }
  ];

  const handleCardClick = (row) => {
  navigate('/eventresult', { state: row }); // 👈 Pass full event object
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
          Events List
        </Typography>

        <Card sx={{ backgroundColor: '#f3f3f7', borderRadius: 2, p: 2, boxShadow: 3 }}>
          <Typography sx={{
            color: '#0d47a1',
            fontWeight: '700',
            fontFamily: '"Open Sans", sans-serif'
          }}>
            {name || 'Event Name'}
          </Typography>

          <Typography sx={{
            fontSize: '13px',
            color: '#0d47a1',
            mt: 0.5,
            fontFamily: '"Open Sans", sans-serif'
          }}>
            {date || 'Event Date'}
          </Typography>

          <Typography sx={{
            fontSize: '13px',
            color: '#0d47a1',
            mt: 0.5,
            fontFamily: '"Open Sans", sans-serif'
          }}>
            {venue || 'Event Venue'}
          </Typography>

          {eventData.map((row, index) => (
            <Card
              key={index}
                onClick={() => handleCardClick(row)} 
              sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                p: 1,
                boxShadow: 2,
                mt: 2,
                cursor: 'pointer', // ✅ make it look clickable
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.01)',
                },
              }}
            >
              <CardContent sx={{ padding: '8px !important' }}>
                <Typography variant="subtitle2" sx={{
                  fontWeight: 600,
                  color: "#0d47a1",
                  mb: 0.5,
                  fontSize: "15px",
                  fontFamily: '"Open Sans", sans-serif',
                  borderBottom: "1px solid #c1c1dc"
                }}>
                  {row.eventType} - Age {row.ageCategory}
                </Typography>

                <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  rowGap: 0.5,
                  columnGap: 1,
                }}>
                  <Typography sx={{ fontSize: "13px", fontFamily: '"Open Sans", sans-serif' }}>
                    <strong>Round:</strong> {row.roundDesc}
                  </Typography>
                  <Typography sx={{ fontSize: "13px", fontFamily: '"Open Sans", sans-serif' }}>
                    <strong>Game Type:</strong> {row.gameType}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Card>
      </Box>

      <Footer />
    </div>
  );
};

export default Event;
