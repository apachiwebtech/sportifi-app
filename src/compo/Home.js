// import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Inventory, Person, Sports, SportsBar, SportsBasketball, SportsCricket, SportsFootball, SportsGolfSharp, SportsMartialArts } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Main_URL } from '../Base_url';

function Home() {
  const navigate = useNavigate();

  const [tournamentList, setTournamentList] = useState([]);

  const fetchTournaments = async () => {
    const userId = localStorage.getItem('id');

    axios.post(`${Main_URL}?get_tours`, { userId: userId })
      .then((response) => {
        if (response.data.status === "success") {
          const fetchedData = response.data.data.map((item, index) => ({
            id: item.id,
            name: item.tour_name,
            date: item.tour_date_from + " to " + item.tour_date_to,
            venue: item.venue_address,
            route: "/event/" + item.id, // Assuming the route is based on tour_id
          }));
          setTournamentList(fetchedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching tournament data:", error);
      });
  }

  useEffect(() => {
    fetchTournaments();
  }, []);


  return (
    <div style={{ background: "#e8e9fb" }}>
      <Header />
      <Box >
        <Card sx={{ backgroundColor: '#aeb6fa', padding: '1px', textAlign: 'left', fontWeight: 'bold' }}>
          <CardContent>
            <Typography
              variant="h6"
              // gutterBottom
              style={{
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: 600,
                fontStyle: 'normal',
              }}
            >
              Welcome to Sportifi<br></br>
              {localStorage.getItem('username') && (
                <span style={{ fontWeight: 300 }}> {localStorage.getItem('username')}</span>
              )}
            </Typography>

          </CardContent>
        </Card>
      </Box>

      <Box className="container mt-5" sx={{
        display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '10px', marginTop: '10px', paddingBottom: "80px",
        background: "#f6f6fc"
      }}>
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
          Tournament List
        </Typography>


        {tournamentList.map((tournament, index) => (
          <Card
            key={index}
            sx={{
              textAlign: 'center',
              cursor: 'pointer',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              backgroundColor: 'white',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            {/* {console.log(tournament, "tournament1")} */}
            <CardContent style={{ fontFamily: '"Open Sans", sans-serif', fontWeight: 400 }}>
              <Typography
                variant="h5"
                gutterBottom
                style={{
                  fontFamily: '"Open Sans", sans-serif',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: '#1273eb',
                }}
              >
                {tournament.name}
              </Typography>

              <hr style={{ borderTop: '1px solid #c5cae9', margin: '0px 0' }} />

              <Box
                sx={{
                  display: 'flex',
                  gap: '30px',
                  padding: '4px 16px',
                  fontSize: '13px',
                  color: '#333',
                }}
              >
                <span style={{ fontWeight: 700 }}>Date&nbsp;&nbsp;&nbsp;:</span>
                <span style={{ fontWeight: 400 }}>{tournament.date}</span>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: '30px',
                  alignItems: 'flex-start',
                  paddingLeft: '15px',
                  fontSize: '13px',
                  color: '#333',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontWeight: 700, marginTop: '0px' }}>Venue:</span>
                <span style={{ fontWeight: 400, whiteSpace: 'pre-line', width: '80%' }}>
                  {tournament.venue}
                </span>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.5 }}>
                <button
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontWeight: 600,
                    fontSize: '13px',
                    padding: '8px 24px',
                    backgroundColor: '#0d47a1',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    transition: '0.3s',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    localStorage.setItem("tou", tournament.name);
                    localStorage.setItem("tou_id", tournament.id);
                    localStorage.setItem("tou_date", tournament.date);
                    localStorage.setItem("tou_venue", tournament.venue);

                    navigate(tournament.route, {
                      state: {
                        name: tournament.name,
                        date: tournament.date,
                        venue: tournament.venue,
                        id: tournament.id,
                      },
                    });
                  }}
                >
                  View
                </button>
              </Box>
            </CardContent>
          </Card>
        ))}





      </Box>
      <Footer />
    </div >
  );
}

export default Home;
{/* <SportsMartialArts sx={{ fontSize: 40, color: '#565ef9' }}  /> */ }
{/* <Typography variant="h6" style={{
    fontFamily: "'Bebas Neue', sans-serif",
    fontWeight: 400,
    fontStyle: "normal",
  }}>Stock In</Typography> */}
