import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container,
  FormBox,
  RecoveryTitle,
  RecoveryField,
  SubmitButton,
  HelpText
} from './styles';
import { ArrowBack } from '@mui/icons-material';
import { 
  Typography,
  Link
} from '@mui/material';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de recuperação de senha aqui
    console.log('Email enviado para:', email);
    setIsSubmitted(true);
  };

  return (
    <Container>
      <FormBox>
        <ArrowBack 
          onClick={() => navigate(-1)} 
          sx={{ 
            position: 'absolute', 
            left: 20, 
            top: 20, 
            cursor: 'pointer' 
          }} 
        />
        
        {!isSubmitted ? (
          <>
            <RecoveryTitle variant="h4">
              Recuperação de Senha
            </RecoveryTitle>
            
            <Typography variant="body1" gutterBottom>
              Digite seu email para receber as instruções de recuperação
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <RecoveryField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
              
              <SubmitButton
                variant="contained"
                color="primary"
                type="submit"
                size="large"
              >
                Enviar Instruções
              </SubmitButton>
            </form>
          </>
        ) : (
          <>
            <RecoveryTitle variant="h4">
              Email Enviado!
            </RecoveryTitle>
            
            <Typography variant="body1" gutterBottom>
              Enviamos um email para <strong>{email}</strong> com as instruções para redefinir sua senha.
            </Typography>
            
            <HelpText variant="body2">
              Não recebeu o email?{' '}
              <Link 
                component="button" 
                onClick={() => setIsSubmitted(false)}
                color="primary"
              >
                Tentar novamente
              </Link>
            </HelpText>
          </>
        )}
        
        <HelpText variant="body2" sx={{ mt: 3 }}>
          Lembrou sua senha?{' '}
          <Link 
            component="button" 
            onClick={() => navigate('/login')}
            color="primary"
          >
            Fazer login
          </Link>
        </HelpText>
      </FormBox>
    </Container>
  );
};

export default PasswordRecovery;
