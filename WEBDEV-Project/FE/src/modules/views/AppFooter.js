import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import TextField from "../components/TextField";
import backgroundImage from "../views/finalFooter.jpg";

function Copyright() {
  return (
    <React.Fragment>
      {"© "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "warning.main",
  mr: 1,
  "&:hover": {
    bgcolor: "warning.dark",
  },
};

const LANGUAGES = [
  {
    code: "en-US",
    name: "English",
  },
  {
    code: "fr-FR",
    name: "Français",
  },
];

export default function AppFooter() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "black",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "absolute",
        width: "100%",
        height: "100%",
        padding: "50px 0px",
      }}
    >
      <Typography component="footer" sx={{ display: "flex" }}>
        <Container sx={{ my: 20, display: "flex" }}>
          <Grid container spacing={5}>
            <Grid item xs={6} sm={4} md={3}>
              <Grid
                container
                direction="column"
                justifyContent="flex-end"
                spacing={2}
                sx={{ height: 120 }}
              >
              </Grid>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Typography variant="h6" marked="left" gutterBottom>
                Legal
              </Typography>
              <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link href="/premium-themes/onepirate/terms/">Terms</Link>
                </Box>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link href="/premium-themes/onepirate/privacy/">Privacy</Link>
                </Box>
              </Box>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </Container>
      </Typography>
    </Box>
  );
}
