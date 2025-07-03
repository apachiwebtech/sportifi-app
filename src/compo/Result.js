import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Result = () => {
  const placeholderData = [
    { gameNo: 1, p1: 21, p2: 18 },
    { gameNo: 2, p1: 17, p2: 21 },
    { gameNo: 3, p1: 21, p2: 19 },
  ];

  const [scores, setScores] = useState([
    { gameNo: 1, p1Score: '', p2Score: '' },
    { gameNo: 2, p1Score: '', p2Score: '' },
    { gameNo: 3, p1Score: '', p2Score: '' },
  ]);

  const [errors, setErrors] = useState([
    { p1: '', p2: '' },
    { p1: '', p2: '' },
    { p1: '', p2: '' },
  ]);

  const [result, setResult] = useState({ totalP1: 0, totalP2: 0, winner: '' });
  const [submissionError, setSubmissionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleScoreChange = (index, player, value) => {
    const updatedScores = [...scores];
    updatedScores[index][player] = value;
    setScores(updatedScores);

    const updatedErrors = [...errors];
    if (parseInt(value) > 10) {
      updatedErrors[index][player === 'p1Score' ? 'p1' : 'p2'] = '';
    }
    setErrors(updatedErrors);
    setSuccessMessage('');
  };

  const handleBlur = (index, player) => {
    const value = scores[index][player];
    const numValue = parseInt(value);
    const errorField = player === 'p1Score' ? 'p1' : 'p2';

    const updatedErrors = [...errors];
    if (value === '' || isNaN(numValue) || numValue <= 10) {
      updatedErrors[index][errorField] = 'Score must be greater than 10';
    } else {
      updatedErrors[index][errorField] = '';
    }
    setErrors(updatedErrors);
  };

  const calculateResult = () => {
    let totalP1 = 0;
    let totalP2 = 0;
    let isValid = true;
    const updatedErrors = [...errors];

    for (let i = 0; i < scores.length; i++) {
      const p1 = parseInt(scores[i].p1Score);
      const p2 = parseInt(scores[i].p2Score);

      if (isNaN(p1) || p1 <= 10) {
        updatedErrors[i].p1 = 'Score must be greater than 10';
        isValid = false;
      }

      if (isNaN(p2) || p2 <= 10) {
        updatedErrors[i].p2 = 'Score must be greater than 10';
        isValid = false;
      }

      if (isValid) {
        totalP1 += p1;
        totalP2 += p2;
      }
    }

    setErrors(updatedErrors);

    if (!isValid) {
      setSubmissionError('');
      setSuccessMessage('');
      return;
    }

    const winner = totalP1 > totalP2 ? 'Rahul' : totalP2 > totalP1 ? 'Sameer' : 'Draw';
    setResult({ totalP1, totalP2, winner });
    setSubmissionError('');
    setSuccessMessage('');
  };

  const submitFinalResult = () => {
    if (!result.winner) {
      setSubmissionError('⚠️ Please calculate the total score before submitting.');
      setSuccessMessage('');
      return;
    }

    const msg = `✅ Submitted Successfully!\nRahul: ${result.totalP1} | Sameer: ${result.totalP2} | Winner: ${result.winner}`;
    setSuccessMessage(msg);
    setSubmissionError('');
    console.log('Submitted Result:', result);
  };

  return (
    <div style={{ background: '#aeb6fa', fontFamily: '"Open Sans", sans-serif' }}>
      <Header />

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', marginTop: '40px', paddingBottom: '80px', background: '#f6f6fc' }}>
        <Typography variant="h4" sx={{ fontWeight: 600, fontSize: '21px', color: '#0d47a1', textAlign: 'center', mb: 2 }}>
          Match Result
        </Typography>

        <Card sx={{ backgroundColor: '#fff', p: 3, boxShadow: 4, border: '1px solid #d5d7f2' }}>
          <Box sx={{ mt: 3, border: '1px solid #d5d7f2', borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', backgroundColor: '#e8eaf6', fontWeight: 600, color: '#0d47a1', textAlign: 'center', p: 1 }}>
              <Box>Game No.</Box>
              <Box>Rahul</Box>
              <Box>Sameer</Box>
            </Box>

            {scores.map((game, index) => (
              <Box key={index} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center', p: 1, borderBottom: index !== scores.length - 1 ? '1px solid #eee' : 'none' }}>
                <Box>{game.gameNo}</Box>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <TextField
                    value={game.p1Score}
                    onChange={(e) => handleScoreChange(index, 'p1Score', e.target.value)}
                    onBlur={() => handleBlur(index, 'p1Score')}
                    placeholder={placeholderData[index].p1.toString()}
                    size="small"
                    type="number"
                    error={!!errors[index].p1}
                    helperText={errors[index].p1}
                    inputProps={{ style: { textAlign: 'center', width: '60px' } }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <TextField
                    value={game.p2Score}
                    onChange={(e) => handleScoreChange(index, 'p2Score', e.target.value)}
                    onBlur={() => handleBlur(index, 'p2Score')}
                    placeholder={placeholderData[index].p2.toString()}
                    size="small"
                    type="number"
                    error={!!errors[index].p2}
                    helperText={errors[index].p2}
                    inputProps={{ style: { textAlign: 'center', width: '60px' } }}
                  />
                </Box>
              </Box>
            ))}
          </Box>

          {/* Result Display */}
          <Box sx={{ mt: 3, textAlign: 'center', color: '#0d47a1', padding: 2, border: '1px solid #d5d7f2', borderRadius: 2 }}>
            {submissionError ? (
              <Typography sx={{ color: '#d32f2f', fontWeight: 500, fontSize: '14px' }}>
                {submissionError}
              </Typography>
            ) : successMessage ? (
              <Typography sx={{ color: 'green', fontWeight: 500, whiteSpace: 'pre-line', fontSize: '14px' }}>
                {successMessage}
              </Typography>
            ) : result.winner ? (
              <>
                <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                  Total Score - Rahul: {result.totalP1} | Sameer: {result.totalP2}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>
                  Winner: {result.winner}
                </Typography>
              </>
            ) : (
              <Typography sx={{ fontStyle: 'italic', color: '#9e9e9e', fontSize: '13px' }}>
                Submit the scores to see the result
              </Typography>
            )}
          </Box>

          {/* Buttons */}
          <Box sx={{ mt: 2, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="outlined" onClick={calculateResult} sx={{ borderColor: '#0d47a1', color: '#0d47a1', px: 3 }}>
              Calculate Total Score
            </Button>
            <Button variant="contained" onClick={submitFinalResult} sx={{ backgroundColor: '#0d47a1', px: 4 }}>
              Submit Score
            </Button>
          </Box>
        </Card>
      </Box>

      <Footer />
    </div>
  );
};

export default Result;
