import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Main_URL } from '../Base_url';

const EventResult = () => {
  const [playerResults, setPlayerResults] = useState([]);
  const location = useLocation();
  const { eventType, ageCategory, roundDesc, gameType } = location.state || {};

  const navigate = useNavigate();
  const handleClick = (match) => {
    console.log('chnages');
    if (match.set_score === null || match.set_score === undefined || match.set_score === '') {
      localStorage.setItem("current_table", match.id);
      navigate('/result');
    }
  };
  const { tou, tou_date, tou_venue } = location.state || {
    tou: "Tournament Name",
    tou_date: "Unknown Date",
    tou_venue: "Unknown Venue",
  };

  const getplayer = () => {
    let table_id = localStorage.getItem("table_id");
    let tour_id = localStorage.getItem("tou_id");

    axios.post(`${Main_URL}?get_player`, { table_id: table_id, tour_id: tour_id })
      .then((response) => {
        if (response.data && response.data.status === "success" && Array.isArray(response.data.data)) {
          // Sort by table_no ascending (numeric)
          const sortedData = response.data.data.slice().sort((a, b) => {
            const aNum = parseInt(a.table_no) || 0;
            const bNum = parseInt(b.table_no) || 0;
            return aNum - bNum;
          });
          setPlayerResults(sortedData);
        } else {
          setPlayerResults([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching player data:", error);
        setPlayerResults([]);
      });

  }

  useEffect(() => {
    getplayer(); // Fetch player data when component mounts
  }, [])

  // Helper function to format time from "13:00:00" to "01:00 pm"
  const formatTime = (timeStr) => {
    if (!timeStr) return '-';
    const [hour, minute] = timeStr.split(':');
    let h = parseInt(hour, 10);
    const m = minute;
    const ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    if (h === 0) h = 12;
    return `${h.toString().padStart(2, '0')}:${m} ${ampm}`;
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
            color: '#1273eb',
            textAlign: 'center',
            textTransform: 'uppercase',
            mt: -2, // 👈 pulls it up
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

          <Card
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              p: 1,
              boxShadow: 2,

              fontFamily: '"Open Sans", sans-serif',
              border: '1px solid #c1c1dc'
            }}
          >
            <CardContent >
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

              {/* Card UI for each player result */}
              {playerResults.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                  {playerResults.map((match, index) => (
                    <Card
                      key={index}
                      onClick={() => handleClick(match)}
                      sx={{
                        width: 200,
                        minWidth: 300,
                        maxWidth: 300,
                        m: 1,
                        p: 1.5,
                        borderRadius: 2,
                        boxShadow: 2,
                        cursor: 'pointer',
                        '&:hover': { boxShadow: 6, backgroundColor: '#f2f3fc' },
                        fontFamily: '"Open Sans", sans-serif',
                        border: '1px solid #c1c1dc',
                        background: '#fff',
                        transition: 'box-shadow 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ color: '#0d47a1', fontWeight: 700, mb: 1 }}>
                        {formatTime(match.time_slot) || '-'}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography sx={{ fontWeight: 600, color: '#0d47a1', fontSize: 15 }}>
                          Table No: <span style={{ color: '#000', fontWeight: 400 }}>{match.table_no || '-'}</span>
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: '#0d47a1', fontSize: 15 }}>
                          Player 1: <span style={{ color: '#000', fontWeight: 400 }}>{match.player1_name || '-'}</span>
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: '#0d47a1', fontSize: 15 }}>
                          Player 2: <span style={{ color: '#000', fontWeight: 400 }}>{match.player2_name || '-'}</span>
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: '#0d47a1', fontSize: 15 }}>
                          Final Result: <span style={{ color: 'red', fontWeight: 400 }}>{match.set_score || '-'}</span>
                        </Typography>
                      </Box>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 2, color: '#888' }}>No player data found.</Box>
              )}

            </CardContent>
          </Card>
        </Card>
      </Box>

      <Footer />
    </div>
  );
};

export default EventResult;
