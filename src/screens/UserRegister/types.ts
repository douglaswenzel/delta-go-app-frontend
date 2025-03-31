export interface UserFormData {
    name: string;
    sobrenome: string;
    tipo: 'funcionario' | 'aluno' | 'visitante';
    nascimento: string;
    unidade: string;
    observacoes: string;
    permisso: boolean;
    foto?: File;
    
    funcionario?: {
      cargo: string;
      setor: string;
      data_admissao: string;
    };
    
    aluno?: {
      matricula: string;
      curso: string;
      turma: string;
    };
    
    visitante?: {
      motivo_visita: string;
      visitado: string;
      data_visita: string;
    };
  }