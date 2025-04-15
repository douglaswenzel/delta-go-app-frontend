import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4),
  backgroundColor: '#f5faff',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  boxShadow: theme.shadows[4],
  borderRadius: theme.shape.borderRadius,
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

const MovimentacoesScreen = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3306/api/movimentacoes')
      .then(response => {
        setLogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar movimentações:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container>
      <StyledPaper>
        <Title variant="h5">Movimentações Recentes</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Ação</strong></TableCell>
              <TableCell><strong>Descrição</strong></TableCell>
              <TableCell><strong>Data</strong></TableCell>
              <TableCell><strong>IP</strong></TableCell>
              <TableCell><strong>Dispositivo</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.log_id}>
                <TableCell>{log.name} {log.sobrenome}</TableCell>
                <TableCell>{log.acao}</TableCell>
                <TableCell>{log.descricao}</TableCell>
                <TableCell>{new Date(log.data_hora).toLocaleString()}</TableCell>
                <TableCell>{log.ip_address}</TableCell>
                <TableCell>{log.dispositivo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledPaper>
    </Container>
  );
};

export default MovimentacoesScreen;
