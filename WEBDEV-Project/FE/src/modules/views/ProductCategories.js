import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';


const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: 'https://www.makeurday.org/wp-content/uploads/2020/02/hair-stylingf-1.png',
    title: 'HAIRCUT',
    width: '40%',
  },
  {
    url: 'https://img.freepik.com/free-photo/manicurist-master-makes-manicure-woman-s-hands-spa-treatment-concept_186202-7769.jpg?w=1380&t=st=1680396827~exp=1680397427~hmac=e15cbd56aa05a6f98bb0887303b6ff64ffcac66f17993fcad5ca83bb9543ae28',
    title: 'MANICURE',
    width: '20%',
  },
  {
    url: 'https://handandstone.com/upload/a5/865-657-90-0-5ce448a4baaa5.jpg',
    title: 'FACIAL',
    width: '40%',
  },
  {
    url: 'https://howtostartanllc.com/images/business-ideas/business-idea-images/makeup-artist-business.jpg',
    title: 'MAKEUP',
    width: '38%',
  },
  {
    url: 'https://holtzspa.com/wp-content/uploads/2014/03/Services-GC.jpg',
    title: 'BODY TREATMENT',
    width: '38%',
  },
  {
    url: 'https://mobilemanicure.ca/images/nail-technican-closeup-resized.png',
    title: 'PEDICURE',
    width: '24%',
  },
  {
    url: 'https://img.freepik.com/premium-photo/female-client-washes-hair-salon-professional-hairdresser-washes-head-female-client-with-water-shampoo-treatment-hairstyle-beauty-hair-care-fashion-service_357889-5903.jpg?w=1380',
    title: 'HAIR TREATMENT',
    width: '40%',
  },
  {
    url: 'https://alinavelica.com/wp-content/uploads/2022/01/eye-brow-treatments-chic-by-alina-velica-beauty-services-zurich-2.png',
    title: 'EYEBROW',
    width: '20%',
  },
  {
    url: 'https://simplyblissed.com/wp-content/uploads/2016/05/bigstock-Waxing-5781665-768x512.jpg',
    title: 'WAXING',
    width: '40%',
  },
];

export default function ProductCategories() {
  return (
  //   <Box
  //   sx={{
  //     display: 'flex',
  //     backgroundImage: `url(${backgroundImage})`,
  //     backgroundRepeat: 'no-repeat',
  //     backgroundColor: "black",
  //     backgroundSize: 'cover',
  //     backgroundPosition: 'center',
  //   }}
  // >
    <Container component="section" sx={{ mt: 8, mb: 4 }} >
      <Typography variant="h4" marked="center" align="center" component="h2">
        SERVICES FOR YOU
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
    // </Box>
  );
}
