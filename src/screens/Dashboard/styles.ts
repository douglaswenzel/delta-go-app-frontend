import { styled } from '@mui/material/styles';
import { Button, Box, Typography } from '@mui/material';

export const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.primary.main,
}));

export const ButtonsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(4),
  width: '100%',
}));

export const DashboardButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 200,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    transform: 'translateY(-5px)',
  },
}));

export const ButtonIcon = styled(Box)(({ theme }) => ({
  fontSize: 48,
  marginBottom: theme.spacing(2),
}));

export const ButtonText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.2rem',
}));
