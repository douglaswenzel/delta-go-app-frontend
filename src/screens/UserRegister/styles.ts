import { styled } from '@mui/material/styles';
import { 
  Box,
  Button,
  Typography,
} from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
  maxWidth: 800,
  margin: '0 auto',
}));

export const FormPaper = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const FormLayout = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '300px 1fr',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr'
  }
}));

export const PhotoColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem'
});

export const FormColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
});

export const UserPhoto = styled('img')({
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '3px solid #e0e0e0'
});

export const FormSection = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
});

export const FormRow = styled('div')({
  display: 'flex',
  gap: '1rem',
  '& > *': {
    flex: 1
  },
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    gap: '1rem'
  }
});

export const SubmitButton = styled(Button)({
  minWidth: '200px'
});

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
}));

export const FormGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: theme.spacing(3),
}));

export const PhotoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

export {};