import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Result = () => {
  const [scores, setScores] = useState([
    { gameNo: 1, p1Score: 21, p2Score: 18 },
    { gameNo: 2, p1Score: 17, p2Score: 21 },
    { gameNo: 3, p1Score: 21, p2Score: 19 },
  ]);

  const [result, setResult] = useState({ totalP1: 0, totalP2: 0, winner: '' });

  const handleScoreChange = (index, player, value) => {
    const updatedScores = [...scores];
    updatedScores[index][player] = parseInt(value) || 0;
    setScores(updatedScores);
  };

  const calculateResult = () => {
    let totalP1 = 0;
    let totalP2 = 0;

    scores.forEach((game) => {
      totalP1 += Number(game.p1Score);
      totalP2 += Number(game.p2Score);
    });

    let winner =
      totalP1 > totalP2
        ? 'Rahul'
        : totalP2 > totalP1
        ? 'Sameer'
        : 'Draw';

    setResult({ totalP1, totalP2, winner });
  };

  return (
    <div style={{ background: "#aeb6fa", fontFamily: '"Open Sans", sans-serif' }}>
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
                  mt: -1.7,
                  mb: 2,
                }}
              >
                Match Result
              </Typography>

        <Card
          sx={{
            backgroundColor: '#ffffff',
            p: 3,
            boxShadow: 4,
            border: '1px solid #d5d7f2',
            transition: '0.3s',
            fontFamily: '"Open Sans", sans-serif',
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-2px)',
            },
          }}
        >
          <Typography
            sx={{
              color: '#0d47a1',
              fontWeight: 700,
              fontSize: '16px',
              mb: 1,
              borderBottom: '1px solid #cfd8dc',
              pb: 0,
            }}
          >
            Name Of the player
          </Typography>

          {/* 2x2 Event Info Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              rowGap: 0,
              columnGap: 5,
              mt: 1,
              color: '#000',
            }}
          >
            {[
              { label: 'Event', value: 'Champions Trophy' },
              { label: 'Age/Level', value: 'Under 18' },
              { label: 'Round', value: 'Semi Final' },
              { label: 'Time', value: '11:00 AM' },
            ].map((item, idx) => (
              <Typography key={idx} sx={{ fontFamily: '"Open Sans", sans-serif' }}>
                <Box component="span" sx={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>
                  {item.label}:&nbsp;
                </Box>
                <Box component="span" sx={{ fontSize: '13px', color: '#555' }}>
                  {item.value}
                </Box>
              </Typography>
            ))}
          </Box>

          {/* Editable Match Score Table */}
          <Box
            sx={{
              mt: 3,
              border: '1px solid #d5d7f2',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {/* Table Header */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                backgroundColor: '#e8eaf6',
                fontWeight: 600,
                color: '#0d47a1',
                fontSize: '14px',
                textAlign: 'center',
                p: 1,
                borderBottom: '1px solid #cfd8dc'
              }}
            >
              <Box>Game No.</Box>
              <Box>Rahul</Box>
              <Box>Sameer</Box>
            </Box>

           {/* Editable Score Rows */}
{scores.map((game, index) => (
  <Box
    key={index}
    sx={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: '13px',
      color: '#000',
      p: 1,
      minHeight: '50px', // Increased height
      borderBottom: index !== scores.length - 1 ? '1px solid #eee' : 'none',
      '&:hover': { backgroundColor: '#f5f7ff' }
    }}
  >
    <Box>{game.gameNo}</Box>

    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        variant="outlined"
        type="number"
        value={game.p1Score}
        onChange={(e) => handleScoreChange(index, 'p1Score', e.target.value)}
        size="small"
        inputProps={{
          style: {
            textAlign: 'center',
            fontSize: '13px',
            fontFamily: '"Open Sans", sans-serif',
            width: '60px',
            padding: '10px', // more padding for taller input
          }
        }}
      />
    </Box>

    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        variant="outlined"
        type="number"
        value={game.p2Score}
        onChange={(e) => handleScoreChange(index, 'p2Score', e.target.value)}
        size="small"
        inputProps={{
          style: {
            textAlign: 'center',
            fontSize: '13px',
            fontFamily: '"Open Sans", sans-serif',
            width: '60px',
            padding: '10px',
          }
        }}
      />
    </Box>
  </Box>
))}

          </Box>

          {/* Submit Button */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              variant="contained"
              onClick={calculateResult}
              sx={{
                backgroundColor: '#0d47a1',
                fontWeight: 600,
                fontFamily: '"Open Sans", sans-serif',
                px: 4,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#093170',
                }
              }}
            >
              Submit Score
            </Button>
          </Box>

          {/* Display Result */}
          {result.winner && (
            <Box
              sx={{
                mt: 3,
                textAlign: 'center',
                color: '#0d47a1',
                padding: 2, 
                border: '1px solid #d5d7f2',
                borderRadius: 2,
              }}
            >
              <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 600,fontFamily: '"Open Sans", sans-serif' }}>
                Total Score - Rahul: {result.totalP1} | Sameer: {result.totalP2}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1, fontWeight: 700, fontSize: '16px',fontFamily: '"Open Sans", sans-serif' }}>
                Winner: {result.winner}
              </Typography>
            </Box>
          )}
        </Card>
      </Box>

      <Footer />
    </div>
  );
};

export default Result;
