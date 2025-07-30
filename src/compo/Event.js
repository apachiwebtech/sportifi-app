import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ Import this
import axios from 'axios';
import { Main_URL } from '../Base_url';

const Event = () => {
  const navigate = useNavigate(); // ✅ Initialize it
  const location = useLocation();
  const [eventdetails, seteventdetails] = useState([]); // Change to array
  const { tou, tou_date, tou_venue } = location.state || {
    tou: "Tournament Name",
    tou_date: "Unknown Date",
    tou_venue: "Unknown Venue",
  };

  // Fetch event list from API (not yet used in UI)
  const geteventlist = () => {
    let tournamentid = localStorage.getItem("tou_id");
    let useid = localStorage.getItem("id");
    axios.post(`${Main_URL}?get_event`, { tournamentid: tournamentid, userid: useid })
      .then((response) => {
        console.log("Event List:", response.data);
        // Set eventdetails to the array inside response.data.data
        if (response.data && Array.isArray(response.data.data)) {
          seteventdetails(response.data.data);
        } else {
          seteventdetails([]);
        }
      })
      .catch((error) => {
        // handle error here
        console.error("Error fetching event list:", error);
        seteventdetails([]);
      });
  };

  useEffect(() => {
    geteventlist(); // Fetch event list when component mounts
  }, [])


  const handleCardClick = (row) => {
    localStorage.setItem("table_id", row.tour_draw_header_id);
    // localStorage.setItem("age_category", row.agecategory_id);

    navigate('/eventresult'); // 👈 Pass full event object
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

          {/* Render API event list */}
          {Array.isArray(eventdetails) && eventdetails.length > 0 ? (
            eventdetails.map((row, index) => (
              <Card
                key={index}
                onClick={() => handleCardClick(row)}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 2,
                  p: 1,
                  boxShadow: 2,
                  mt: 2,
                  cursor: 'pointer',
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
                    {/* Use API fields */}
                    {row.match_type} - Age {row.age_category}
                  </Typography>

                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    rowGap: 0.5,
                    columnGap: 1,
                  }}>
                    <Typography sx={{ fontSize: "13px", fontFamily: '"Open Sans", sans-serif' }}>
                      <strong>Round:</strong> {row.round_id}
                    </Typography>
                    <Typography sx={{ fontSize: "13px", fontFamily: '"Open Sans", sans-serif' }}>
                      <strong>Game Type:</strong> {row.game_type}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography sx={{ mt: 2, color: '#888', textAlign: 'center' }}>No events found.</Typography>
          )}
        </Card>
      </Box>

      <Footer />
    </div>
  );
};

export default Event;
