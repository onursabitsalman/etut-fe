import { Helmet } from 'react-helmet';
import { Box, Container, Typography } from '@material-ui/core';

const NotFound = () => (
  <>
    <Helmet>
      <title>404 | Sayfa Bulunamadı</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          404: Aradığınız sayfa bulunamadı
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          Ya gizli bir yol denedin ya da yanlışlıkla buraya geldin. Hangisi
          olursa olsun, menü kullanmayı deneyin.
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src="/static/images/undraw_page_not_found_su7k.svg"
            style={{
              marginTop: 50,
              display: 'inline-block',
              maxWidth: '100%',
              width: 560
            }}
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
