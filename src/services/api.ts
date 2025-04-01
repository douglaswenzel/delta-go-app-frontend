import axios, { AxiosError, CancelTokenSource } from 'axios';

// Configuração básica da API
const api = axios.create({
  baseURL: 'http://localhost:3006/api',
  timeout: 30000,
});

// Tipos para o progresso do upload
interface UploadProgressEvent {
  loaded: number;
  total?: number;
}

// Tipos para a resposta da API
interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// Configuração para registro de usuário
interface RegisterUserConfig {
  data: FormData;
  onUploadProgress?: (progressEvent: UploadProgressEvent) => void;
  cancelToken?: CancelTokenSource;
}

// Função para registrar usuário
export const registerUser = async (config: RegisterUserConfig): Promise<ApiResponse> => {
  try {
    const response = await api.post('/usuarios', config.data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: config.onUploadProgress,
      cancelToken: config.cancelToken?.token,
    });

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Requisição cancelada:', error.message);
      throw { message: 'Requisição cancelada pelo usuário' };
    }

    const axiosError = error as AxiosError<ApiError>;
    if (axiosError.response) {
      throw {
        message: axiosError.response.data.message || 'Erro ao cadastrar usuário',
        status: axiosError.response.status,
        errors: axiosError.response.data.errors,
      };
    } else if (axiosError.request) {
      // A requisição foi feita mas não houve resposta
      throw { message: 'Sem resposta do servidor' };
    } else {
      // Erro ao configurar a requisição
      throw { message: axiosError.message };
    }
  }
};

// Função para cancelar requisições (opcional)
let cancelTokenSource: CancelTokenSource | null = null;

export const cancelRequest = () => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Operação cancelada pelo usuário');
    cancelTokenSource = null;
  }
};

export const getCancelToken = () => {
  cancelTokenSource = axios.CancelToken.source();
  return cancelTokenSource;
};

// Interceptor para adicionar token de autenticação (opcional)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento global de erros (opcional)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout: A requisição demorou muito para responder');
    }
    return Promise.reject(error);
  }
);

export default api;
