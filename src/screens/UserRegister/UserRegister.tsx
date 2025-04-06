import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container,
  FormPaper,
  Title,
    PhotoContainer,
  UserPhoto,
  SubmitButton
} from './styles';
import { 
  TextField,
  Typography,
  Button,
  MenuItem,
  Box,
  Alert,
  Snackbar,
  LinearProgress,
  Grid
} from '@mui/material';
import { CameraAlt as CameraIcon } from '@mui/icons-material';
import { UserFormData } from './types';
import { registerUser } from '../../services/api';

// Definindo tipos mais seguros para os objetos aninhados
interface FuncionarioData {
  cargo: string;
  setor: string;
  data_admissao: string;
}

interface AlunoData {
  matricula: string;
  curso: string;
  turma: string;
}

interface VisitanteData {
  motivo_visita: string;
  visitado: string;
  data_visita: string;
}

type CompleteUserFormData = Omit<UserFormData, 'funcionario' | 'aluno' | 'visitante'> & {
  funcionario: FuncionarioData;
  aluno: AlunoData;
  visitante: VisitanteData;
};

const UserRegisterScreen = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estados com tipos completos
  const [formData, setFormData] = useState<CompleteUserFormData>({
    name: '',
    sobrenome: '',
    tipo: 'funcionario',
    nascimento: '',
    unidade: '',
    observacoes: '',
    permisso: false,
    funcionario: { cargo: '', setor: '', data_admissao: '' },
    aluno: { matricula: '', curso: '', turma: '' },
    visitante: { motivo_visita: '', visitado: '', data_visita: '' }
  });
  
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  });

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      const formDataToSend = new FormData();
      
      // Adiciona os campos básicos ao FormData
      Object.entries({
        name: formData.name,
        sobrenome: formData.sobrenome,
        tipo: formData.tipo,
        nascimento: formData.nascimento,
        unidade: formData.unidade,
        observacoes: formData.observacoes,
        permisso: formData.permisso
      }).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });

      // Adiciona campos específicos do tipo de usuário
      if (formData.tipo === 'funcionario') {
        Object.entries(formData.funcionario).forEach(([key, value]) => {
          formDataToSend.append(`funcionario[${key}]`, value);
        });
      } else if (formData.tipo === 'aluno') {
        Object.entries(formData.aluno).forEach(([key, value]) => {
          formDataToSend.append(`aluno[${key}]`, value);
        });
      } else if (formData.tipo === 'visitante') {
        Object.entries(formData.visitante).forEach(([key, value]) => {
          formDataToSend.append(`visitante[${key}]`, value);
        });
      }

      // Adiciona a foto se existir
      if (previewPhoto) {
        const blob = await fetch(previewPhoto).then(r => r.blob());
        formDataToSend.append('foto', blob, 'foto_usuario.jpg');
      }

      await registerUser({
        data: formDataToSend,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percentCompleted);
        }
      });

      setAlert({
        open: true,
        message: 'Usuário cadastrado com sucesso!',
        severity: 'success'
      });
      
      // Redireciona após 2 segundos
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setAlert({
        open: true,
        message: 'Erro ao cadastrar usuário. Tente novamente.',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof CompleteUserFormData] as object),
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Container>
      <Title variant="h4">Cadastro de Usuário</Title>
      
      <FormPaper>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid>
              <PhotoContainer>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CameraIcon />}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Adicionar Foto
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handlePhotoChange}
                    ref={fileInputRef}
                  />
                </Button>
              </PhotoContainer>
            </Grid>
            <Grid>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  label="Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />

                <TextField
                  label="Sobrenome"
                  name="sobrenome"
                  value={formData.sobrenome}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />

                <TextField
                  select
                  label="Tipo de Usuário"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  fullWidth
                >
                  <MenuItem value="funcionario">Funcionário</MenuItem>
                  <MenuItem value="aluno">Aluno</MenuItem>
                  <MenuItem value="visitante">Visitante</MenuItem>
                </TextField>

                {formData.tipo === 'funcionario' && (
                  <>
                    <TextField
                      label="Cargo"
                      name="funcionario.cargo"
                      value={formData.funcionario.cargo}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Setor"
                      name="funcionario.setor"
                      value={formData.funcionario.setor}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </>
                )}

                <SubmitButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                >
                  {isSubmitting ? 'Cadastrando...' : 'Cadastrar Usuário'}
                </SubmitButton>
              </Box>
            </Grid>
          </Grid>

          {isSubmitting && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={uploadProgress} 
              />
              <Typography variant="caption" display="block" gutterBottom>
                Progresso do upload: {uploadProgress}%
              </Typography>
            </Box>
          )}
        </form>
      </FormPaper>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserRegisterScreen;
