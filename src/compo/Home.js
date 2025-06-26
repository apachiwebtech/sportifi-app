import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Inventory, Person, Sports, SportsBar, SportsBasketball, SportsCricket, SportsFootball, SportsGolfSharp, SportsMartialArts } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Home() {
  const navigate = useNavigate();

 const tournamentList = [
  {
    id: 1,
    name: 'Champions Trophy',
    date: '29-06-2025',
    venue: `CodenCreativeMedia Pvt. Ltd., 2nd Floor, Sigma Tech Park,\nOpp. HDFC Bank, MG Road,\nBengaluru, Karnataka - 560001, India`,
    route: '/event',
  },
  {
    id: 2,
    name: 'Winter Cup',
    date: '15-12-2025',
    venue: `ABC Grounds, Sector 17,\nChandigarh, Punjab - 160017, India`,
    route: '/event',
  },
  {
    id: 3,
    name: 'Summer Slam',
    date: '10-05-2025',
    venue: `National Stadium,\nConnaught Place,\nNew Delhi - 110001, India`,
    route: '/event',
  },
  {
    id: 4,
    name: 'Monsoon League',
    date: '20-07-2025',
    venue: `Wankhede Stadium,\nChurchgate,\nMumbai, Maharashtra - 400020, India`,
    route: '/event',
  },
  {
    id: 5,
    name: 'Legends Trophy',
    date: '25-08-2025',
    venue: `Jawaharlal Nehru Stadium,\nLodhi Road,\nNew Delhi - 110003, India`,
    route: '/event',
  },
  {
    id: 6,
    name: 'Elite Championship',
    date: '12-09-2025',
    venue: `Gachibowli Indoor Stadium,\nHyderabad, Telangana - 500032, India`,
    route: '/event',
  },
  {
    id: 7,
    name: 'Independence Cup',
    date: '15-08-2025',
    venue: `Salt Lake Stadium,\nBidhannagar,\nKolkata, West Bengal - 700098, India`,
    route: '/event',
  },
  {
    id: 8,
    name: 'Desert Classic',
    date: '05-11-2025',
    venue: `Sardar Patel Stadium,\nMotera,\nAhmedabad, Gujarat - 380005, India`,
    route: '/event',
  },
  {
    id: 9,
    name: 'Unity Sports Fest',
    date: '26-01-2026',
    venue: `Greenfield International Stadium,\nKaryavattom,\nThiruvananthapuram, Kerala - 695581, India`,
    route: '/event',
  },
  {
    id: 10,
    name: 'Republic League',
    date: '26-01-2026',
    venue: `Kalinga Stadium,\nJayadev Vihar,\nBhubaneswar, Odisha - 751013, India`,
    route: '/event',
  }
];


  return (
    <div style={{background:"#e8e9fb"}}>
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
  Welcome to Sportifi
</Typography>

          </CardContent>
        </Card>
      </Box>

      <Box className="container mt-5" sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '10px', marginTop: '10px',paddingBottom:"80px", 
        background:"#f6f6fc" }}>
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


      {tournamentList.map((tournament) => (
  <Card
    key={tournament.id}
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
{/* <SportsMartialArts sx={{ fontSize: 40, color: '#565ef9' }}  /> */}
            {/* <Typography variant="h6" style={{
    fontFamily: "'Bebas Neue', sans-serif",
    fontWeight: 400,
    fontStyle: "normal",
  }}>Stock In</Typography> */}
  