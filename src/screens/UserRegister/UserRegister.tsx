import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container,
  FormPaper,
  Title,
  FormGrid,
  PhotoContainer,
  UserPhoto,
  SubmitButton
} from './styles';
import { 
  TextField,
  Typography,
  Button,
  MenuItem,
  Input,
  FormControlLabel,
  Checkbox,
  Box,
  CircularProgress
} from '@mui/material';
import { 
  CameraAlt as CameraIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { UserFormData } from './types';
import { registerUser } from '../../services/api';

const UserRegisterScreen = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    sobrenome: '',
    tipo: 'funcionario',
    nascimento: '',
    unidade: '',
    observacoes: '',
    permisso: false,
    funcionario: {
      cargo: '',
      setor: '',
      data_admissao: '',
    },
  });
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      setFormData(prev => {
        // Garante que o objeto pai existe
        const parentObj = prev[parent as keyof UserFormData] || {};
        
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [child]: type === 'checkbox' ? checked : value
          }
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, foto: file }));
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formDataToSend = new FormData();
    
    // Adiciona campos básicos
    formDataToSend.append('name', formData.name);
    formDataToSend.append('sobrenome', formData.sobrenome);
    formDataToSend.append('tipo', formData.tipo);
    formDataToSend.append('nascimento', formData.nascimento);
    formDataToSend.append('unidade', formData.unidade);
    formDataToSend.append('observacoes', formData.observacoes);
    formDataToSend.append('permisso', String(formData.permisso));
  
    // Adiciona foto se existir
    if (formData.foto) {
      formDataToSend.append('foto', formData.foto);
    }
  
    // Adiciona campos específicos
    switch (formData.tipo) {
      case 'funcionario':
        formDataToSend.append('funcionario[cargo]', formData.funcionario?.cargo || '');
        formDataToSend.append('funcionario[setor]', formData.funcionario?.setor || '');
        formDataToSend.append('funcionario[data_admissao]', formData.funcionario?.data_admissao || '');
        break;
      
      case 'aluno':
        formDataToSend.append('aluno[matricula]', formData.aluno?.matricula || '');
        formDataToSend.append('aluno[curso]', formData.aluno?.curso || '');
        formDataToSend.append('aluno[turma]', formData.aluno?.turma || '');
        break;
      
      case 'visitante':
        formDataToSend.append('visitante[motivo_visita]', formData.visitante?.motivo_visita || '');
        formDataToSend.append('visitante[visitado]', formData.visitante?.visitado || '');
        formDataToSend.append('visitante[data_visita]', formData.visitante?.data_visita || '');
        break;
    }
  
    try {
      const response = await registerUser(formDataToSend);
      
      // Redirecionar com mensagem de sucesso
      navigate('/dashboard', { 
        state: { 
          success: true,
          message: 'Usuário cadastrado com sucesso!',
          userId: response.userId
        } 
      });
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
      
      // Exibir feedback de erro (você pode usar um snackbar/toast)
      alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSpecificFields = () => {
    switch (formData.tipo) {
      case 'funcionario':
        return (
          <>
            <TextField
              name="funcionario.cargo"
              label="Cargo"
              value={formData.funcionario?.cargo || ''}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="funcionario.setor"
              label="Setor"
              value={formData.funcionario?.setor || ''}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="funcionario.data_admissao"
              label="Data de Admissão"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.funcionario?.data_admissao || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </>
        );
      case 'aluno':
        return (
          <>
            <TextField
              name="aluno.matricula"
              label="Matrícula"
              value={formData.aluno?.matricula || ''}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="aluno.curso"
              label="Curso"
              value={formData.aluno?.curso || ''}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="aluno.turma"
              label="Turma"
              value={formData.aluno?.turma || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </>
        );
      case 'visitante':
        return (
          <>
            <TextField
              name="visitante.motivo_visita"
              label="Motivo da Visita"
              value={formData.visitante?.motivo_visita || ''}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={3}
            />
            <TextField
              name="visitante.visitado"
              label="Pessoa Visitada"
              value={formData.visitante?.visitado || ''}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="visitante.data_visita"
              label="Data da Visita"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={formData.visitante?.data_visita || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Title variant="h4">Cadastro de Usuário</Title>
      
      <FormPaper elevation={3}>
        <form onSubmit={handleSubmit}>
          <PhotoContainer>
            <UserPhoto
              src={previewPhoto || '/default-user.png'}
              alt="Preview da foto"
            />
            <Input
              type="file"
              inputRef={fileInputRef}
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
              inputProps={{ accept: 'image/*' }}
              required
            />
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CameraIcon />}
              onClick={() => fileInputRef.current?.click()}
            >
              Selecionar Foto
            </Button>
            <Typography variant="caption" color="textSecondary">
              Foto para reconhecimento facial
            </Typography>
          </PhotoContainer>

          <FormGrid>
            <TextField
              name="name"
              label="Nome"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="sobrenome"
              label="Sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="tipo"
              label="Tipo de Usuário"
              value={formData.tipo}
              onChange={handleChange}
              select
              fullWidth
              required
            >
              <MenuItem value="funcionario">Funcionário</MenuItem>
              <MenuItem value="aluno">Aluno</MenuItem>
              <MenuItem value="visitante">Visitante</MenuItem>
            </TextField>
            <TextField
              name="nascimento"
              label="Data de Nascimento"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.nascimento}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="unidade"
              label="Unidade"
              value={formData.unidade}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="observacoes"
              label="Observações"
              value={formData.observacoes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="permisso"
                  checked={formData.permisso}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Tem permissão de acesso?"
            />
          </FormGrid>

          <Title variant="h6" sx={{ mt: 4, mb: 2 }}>
            Informações Específicas
          </Title>
          
          <FormGrid>
            {renderSpecificFields()}
          </FormGrid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <SubmitButton
              variant="contained"
              color="primary"
              type="submit"
              startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Cadastro'}
            </SubmitButton>
          </Box>
        </form>
      </FormPaper>
    </Container>
  );
};

export default UserRegisterScreen;
