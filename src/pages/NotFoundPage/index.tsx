import { useNavigate } from "react-router";

import { Box, Button, Typography } from "@mui/material";

import PageContent from "../../layout/PageContent";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <PageContent>
      <Typography variant="h2">This page does not exist</Typography>

      <Box>
        <Button onClick={() => navigate('/')} variant="contained" sx={{mt: "4rem"}}>
          Go to home page
        </Button>
      </Box>
    </PageContent>
  );
};

export default NotFoundPage;