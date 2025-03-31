import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

export const FormBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
}));

export const FormTitle = styled('h1')(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));
