import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const FormBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <Container>
      <FormBox>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Acesso ao Sistema
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Senha"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Lembrar de mim"
          />
          
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            sx={{ mt: 2 }}
          >
            Entrar
          </Button>
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Link href="#" variant="body2" sx={{ mx: 1 }}>
              Esqueceu a senha?
            </Link>
            <Link href="#" variant="body2" sx={{ mx: 1 }}>
              Criar conta
            </Link>
          </Box>
        </form>
      </FormBox>
    </Container>
  );
};

export default Login;