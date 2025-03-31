import React from 'react';
import { 
  DashboardContainer,
  Title,
  ButtonsGrid,
  DashboardButton,
  ButtonIcon,
  ButtonText
} from './styles';
import { 
  PersonAdd as PersonAddIcon,
  SwapHoriz as MovimentationsIcon,
  Assessment as ReportsIcon,
  People as UsersIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DashboardScreen = () => {
  const navigate = useNavigate();
  return (
    <DashboardContainer>
      <Title variant="h4">Bem-vindo ao Painel de Controle</Title>
      
      <ButtonsGrid>
        <DashboardButton onClick={() => navigate('/cadastro-usuario')}>
          <ButtonIcon>
            <PersonAddIcon fontSize="inherit" />
          </ButtonIcon>
          <ButtonText>Cadastro de Pessoas</ButtonText>
        </DashboardButton>

        {/* Botão Movimentações */}
        <DashboardButton>
          <ButtonIcon>
            <MovimentationsIcon fontSize="inherit" />
          </ButtonIcon>
          <ButtonText>Movimentações</ButtonText>
        </DashboardButton>

        {/* Botão Relatórios */}
        <DashboardButton>
          <ButtonIcon>
            <ReportsIcon fontSize="inherit" />
          </ButtonIcon>
          <ButtonText>Relatórios</ButtonText>
        </DashboardButton>

        {/* Botão Listagem de Usuários */}
        <DashboardButton>
          <ButtonIcon>
            <UsersIcon fontSize="inherit" />
          </ButtonIcon>
          <ButtonText>Listagem de Usuários</ButtonText>
        </DashboardButton>
      </ButtonsGrid>
    </DashboardContainer>
  );
};

export default DashboardScreen;
