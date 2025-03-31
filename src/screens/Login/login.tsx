import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Checkbox,FormControlLabel, Link } from '@mui/material';
import { Container, FormBox } from './styles';

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
          DeltaGo | Acesso 
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
          </Box>
        </form>
      </FormBox>
    </Container>
  );
};

export default Login;