import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, TextField, Button } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { BASE_URL, Main_URL } from '../Base_url';

const Result = () => {
  const placeholderData = [
    { gameNo: 1, p1: 0, p2: 0 },
    { gameNo: 2, p1: 0, p2: 0 },
    { gameNo: 3, p1: 0, p2: 0 },
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

  const [playerNames, setPlayerNames] = useState({ p1: 'Player 1', p2: 'Player 2' });
  const [tableMeta, setTableMeta] = useState({
    table_no_id: '',
    matchtype_id: '',
    age_id: '',
    round_id: '',
    id: '',
    time: '',
    playerone_id: '',
    playertwo_id: '',
  });

  const gettableinfo = () => {
    let table_id = localStorage.getItem("current_table");
    let tour_id = localStorage.getItem("tou_id");

    axios.post(`${Main_URL}?get_table_info`, { table_id: table_id, tour_id: tour_id })
      .then((response) => {
        if (response.data && response.data.status === "success") {
          const data = response.data.data;
          // console.log(data[0]?.max_games, "data[0]?.max_games");

          const maxGames = data[0]?.max_games || 3;
          setScores(
            Array.from({ length: maxGames }, (_, i) => ({
              gameNo: i + 1,
              p1Score: data[0]?.scores?.[i]?.p1_score || '',
              p2Score: data[0]?.scores?.[i]?.p2_score || ''
            }))
          );
          // Set player names if available
          if (data.length > 0) {
            // Take only the first word of the player names
            setPlayerNames({
              p1: (data[0].player1_name || 'Player 1').split(' ')[0],
              p2: (data[0].player2_name || 'Player 2').split(' ')[0],
            });
            setTableMeta({
              table_no_id: data[0].table_no || '',
              matchtype_id: data[0].matchtype_id || '',
              age_id: data[0].age_id || '',
              round_id: data[0].round_id || '',
              time: data[0].time_slot || '',
              id: data[0].id || '',
              playerone_id: data[0].player1_id || '',
              playertwo_id: data[0].player2_id || '',
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching table info:", error);
      });
  }

  useEffect(() => {
    gettableinfo(); // Fetch table info when component mounts
  }, [])

  const [result, setResult] = useState({ totalP1: 0, totalP2: 0, winner: '' });
  const [submissionError, setSubmissionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [remark, setRemark] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleScoreChange = (index, player, value) => {
    const updatedScores = [...scores];
    updatedScores[index][player] = value;
    setScores(updatedScores);

    // Validation logic (combining checkvalue)
    const numValue = parseInt(value);
    const errorField = player === 'p1Score' ? 'p1' : 'p2';
    const updatedErrors = [...errors];

    if (value === '' || isNaN(numValue) || numValue < 10) {
      updatedErrors[index][errorField] = 'Score must be greater than 10';
    } else {
      updatedErrors[index][errorField] = '';
    }
    setErrors(updatedErrors);
    setSuccessMessage('');
  };

  const calculateResult = () => {
    let totalP1 = 0;
    let totalP2 = 0;
    let isValid = true;
    const updatedErrors = [...errors];
    let p1Games = 0;
    let p2Games = 0;

    for (let i = 0; i < scores.length; i++) {
      const p1 = parseInt(scores[i].p1Score);
      const p2 = parseInt(scores[i].p2Score);

      if (isNaN(p1) || p1 < 10) {
        updatedErrors[i].p1 = 'Score must be greater than 10';
        isValid = false;
      }

      if (isNaN(p2) || p2 < 10) {
        updatedErrors[i].p2 = 'Score must be greater than 10';
        isValid = false;
      }

      if (isValid) {
        totalP1 += p1;
        totalP2 += p2;
        if (p1 > p2) p1Games++;
        else if (p2 > p1) p2Games++;
      }
    }

    setErrors(updatedErrors);

    if (!isValid) {
      setSubmissionError('');
      setSuccessMessage('');
      return;
    }

    const winner = totalP1 > totalP2 ? playerNames.p1 : totalP2 > totalP1 ? playerNames.p2 : 'Draw';
    setResult({ totalP1, totalP2, winner, p1Games, p2Games });
    setSubmissionError('');
    setSuccessMessage('');
  };

  const submitFinalResult = () => {
    if (!result.winner) {
      setSubmissionError('⚠️ Please calculate the total score before submitting.');
      setSuccessMessage('');
      return;
    }

    // Prepare scores as a flat array for scores[0], scores[1], ...
    let flatScores = [];
    scores.forEach(game => {
      flatScores.push(game.p1Score || 0);
      flatScores.push(game.p2Score || 0);
    });
    // Pad to 14 elements (7 games max)
    while (flatScores.length < 14) flatScores.push(0);

    // Prepare the payload for saving result
    let payload = {
      table_mgmt_id: tableMeta.id || "",
      winner_player_id: result.winner === playerNames.p1 ? tableMeta.playerone_id : result.winner === playerNames.p2 ? tableMeta.playertwo_id : '',
      set_score: `${result.p1Games || 0}-${result.p2Games || 0}`,
      remarks: remark || "",
      table_no_id: tableMeta.table_no_id || "",
      matchtype_id: tableMeta.matchtype_id || "",
      age_id: tableMeta.age_id || "",
      round_id: tableMeta.round_id || "",
      time: tableMeta.time || "",
      playerone_id: tableMeta.playerone_id || "",
      playertwo_id: tableMeta.playertwo_id || "",
      tourid: localStorage.getItem("tou_id") || ""
    };
    // Add scores[0] ... scores[13] to payload
    flatScores.forEach((val, idx) => {
      payload[`scores[${idx}]`] = val;
    });

    axios.post(`${BASE_URL}`, payload)
      .then((response) => {
        if ((response.data && response.data.status === "success") || (response.data && response.data.success)) {
          let matchResultId = response.data.match_result_id;
          setSuccessMessage(`✅ Result saved successfully!${matchResultId ? ' Match Result ID: ' + matchResultId : ''}`);
          setSubmissionError('');
          setIsSubmitted(true);
        } else {
          setSubmissionError('❌ Failed to save result.');
          setSuccessMessage('');
        }
      })
      .catch((error) => {
        setSubmissionError('❌ Error saving result.');
        setSuccessMessage('');
        console.error('Error saving result:', error);
      });
  };

  return (
    <div style={{ background: '#aeb6fa', fontFamily: '"Open Sans", sans-serif' }}>
      <Header />

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', marginTop: '40px', paddingBottom: '80px', background: '#f6f6fc' }}>
        <Typography variant="h4" sx={{ fontWeight: 600, fontSize: '21px', color: '#0d47a1', textAlign: 'center', mb: 2 }}>
          Match Result
        </Typography>

        <Card sx={{ backgroundColor: '#fff', p: 3, boxShadow: 4, border: '1px solid #d5d7f2' }}>
          <Typography sx={{
            color: '#0d47a1',
            fontWeight: '700',
            fontFamily: '"Open Sans", sans-serif'
          }}>
            {localStorage.getItem('tou') || 'Event Name'}
          </Typography>

          <Typography sx={{
            fontSize: '13px',
            color: '#0d47a1',
            mt: 0.5,
            fontFamily: '"Open Sans", sans-serif'
          }}>
            {localStorage.getItem('tou_date') || 'Event Date'}
          </Typography>

          <Typography sx={{
            fontSize: '13px',
            color: '#0d47a1',
            mt: 0.5,
            fontFamily: '"Open Sans", sans-serif'
          }}>
            {localStorage.getItem('tou_venue') || 'Event Venue'}
          </Typography>

          <Box sx={{ mt: 3, border: '1px solid #d5d7f2', borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', backgroundColor: '#e8eaf6', fontWeight: 600, color: '#0d47a1', textAlign: 'center', p: 1 }}>
              <Box>#</Box>
              <Box>{playerNames.p1}</Box>
              <Box>{playerNames.p2}</Box>
            </Box>

            {scores.map((game, index) => (
              <Box key={index} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center', p: 1, borderBottom: index !== scores.length - 1 ? '1px solid #eee' : 'none' }}>
                <Box>{game.gameNo}</Box>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <TextField
                    value={game.p1Score}
                    onChange={(e) => handleScoreChange(index, 'p1Score', e.target.value)}
                    // onBlur={() => handleBlur(index, 'p1Score')}
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
                    // onBlur={() => handleBlur(index, 'p2Score')}
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
                  Ratio: {result.p1Games} : {result.p2Games}
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

          {/* Remark Box */}
          {!isSubmitted && (
            <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
              <TextField
                label="Remark"
                value={remark}
                onChange={e => setRemark(e.target.value)}
                multiline
                minRows={2}
                maxRows={4}
                sx={{ width: '100%' }}
                variant="outlined"
                placeholder="Enter any remarks here..."
                disabled={isSubmitted}
              />
            </Box>
          )}

          {/* Buttons */}
          {!isSubmitted && (
            <Box sx={{ mt: 2, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button variant="outlined" onClick={calculateResult} sx={{ borderColor: '#0d47a1', color: '#0d47a1', px: 3 }} disabled={isSubmitted}>
                Calculate Total Score
              </Button>
              <Button variant="contained" onClick={submitFinalResult} sx={{ backgroundColor: '#0d47a1', px: 4 }} disabled={isSubmitted}>
                Submit Score
              </Button>
            </Box>
          )}
        </Card>
      </Box>

      <Footer />
    </div>
  );
};

export default Result;
