import { styled } from '@mui/material/styles';
import { Box, Button, Typography, TextField } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
}));

export const FormBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 450,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  textAlign: 'center',
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    boxShadow: 'none',
  },
}));

export const RecoveryTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  color: theme.palette.primary.main,
}));

export const RecoveryField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  width: '100%',
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  width: '100%',
}));

export const HelpText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  color: theme.palette.text.secondary,
}));