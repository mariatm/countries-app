import { useNavigate } from "react-router";

import { Box, Button, Typography } from "@mui/material";

import PageContent from "../../layout/PageContent";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <PageContent>
      <Typography variant="h2">Oops! Something went wrong...</Typography>

      <Box>
        <Button onClick={() => navigate('/')} variant="contained" sx={{mt: "4rem"}}>
          Go to home page
        </Button>
      </Box>
    </PageContent>
  );
};

export default ErrorPage;