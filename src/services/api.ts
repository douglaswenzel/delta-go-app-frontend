import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 30000, // Aumente o timeout para 30 segundos
});

// Adicione um cancel token
const CancelToken = axios.CancelToken;
let cancel: any;

export const registerUser = async (formData: FormData) => {
  try {
    const source = CancelToken.source();
    cancel = source.cancel;
    
    const response = await api.post('/usuarios', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      cancelToken: source.token,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        console.log(`Progresso: ${percentCompleted}%`);
      },
    });
    
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Requisição cancelada:', error.message);
    } else {
      console.error('Erro ao cadastrar usuário:', error);
    }
    throw error;
  }
};

// Função para cancelar requisição
export const cancelRequest = () => {
  if (cancel) cancel('Operação cancelada pelo usuário');
};
