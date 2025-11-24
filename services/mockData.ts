import { Incident } from '../types';

const RAW_CSV_DATA = `Código,Data,Tipo de Ocorrência,Notificada,Severidade/Gravidade,Tipo de Incidente - OMS por Mês,Status,Responsável,Fase,Processo
233,13/06/2024,Identificação Errada do Paciente,Unidade Sesi Cambona,Evento com Nenhum Dano (Saúde),Não Classificado,Concluído,carolina.albuquerque,Concluída,SP10.2.1.Gerenciar Serviços de Saúde Complementar
252,13/11/2024,Queda,Unidade Sesi Tabuleiro,Evento com Dano Leve (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Acesso do Paciente/ Cliente
257,21/01/2025,Recoleta de exames laboratoriais,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
259,23/01/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Tabuleiro,Evento com Dano Leve (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Acesso do Paciente/ Cliente
260,28/01/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Tabuleiro,Evento com Dano Leve (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
263,20/02/2025,Queda,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Acesso do Paciente/ Cliente
266,24/02/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Acesso do Paciente/ Cliente
267,26/02/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Cambona,Near Miss (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
268,27/02/2025,Recoleta de exames laboratoriais,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
272,11/03/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Tabuleiro,Evento com Dano Leve (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Acesso do Paciente/ Cliente
273,13/03/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Near Miss (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Acesso do Paciente/ Cliente
274,13/03/2025,Análise de Ocorrência,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
276,14/03/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Tabuleiro,Evento com Dano Leve (Saúde),Não Classificado,Concluído,carolina.albuquerque,Concluída,Administrar Consultas/ Exames de Saúde
280,26/03/2025,Queda,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Acesso do Paciente/ Cliente
286,07/04/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Arapiraca,Leve,Não Classificado,Em Andamento,jessika.silva,Analisar Causa e Fazer Plano de Ação,Administrar Consultas/ Exames de Saúde
289,08/04/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Arapiraca,Evento com Nenhum Dano (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Acesso do Paciente/ Cliente
292,15/04/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Cambona,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída,Administrar Consultas/ Exames de Saúde
293,16/04/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Arapiraca,Evento com Nenhum Dano (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Acesso do Paciente/ Cliente
298,29/04/2025,Divergência ou desatualização dos dados de cadastro de clientes,Unidade Sesi Arapiraca,Evento com Nenhum Dano (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
299,02/05/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Senai Arapiraca,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída,Administrar Consultas/ Exames de Saúde
301,08/05/2025,Queda,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída,Administrar Acesso do Paciente/ Cliente
302,08/05/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída,Administrar Consultas/ Exames de Saúde
305,12/05/2025,Queda,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
306,12/05/2025,Queda,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída,Administrar Consultas/ Exames de Saúde
307,12/05/2025,Cadastro incorreto ou incompleto,Unidade Sesi Arapiraca,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
315,23/05/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Cambona,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída,Administrar Consultas/ Exames de Saúde
317,29/05/2025,Dados inconsistentes,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída,Administrar Consultas/ Exames de Saúde
319,02/06/2025,Cadastro incorreto ou incompleto,Unidade Sesi Arapiraca,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída,Administrar Consultas/ Exames de Saúde
322,06/06/2025,Cadastro incorreto ou incompleto,Unidade Sesi Cambona,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída,Administrar Consultas/ Exames de Saúde
325,11/06/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Cambona,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída,Administrar Consultas/ Exames de Saúde
326,11/06/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Cambona,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída,Administrar Consultas/ Exames de Saúde
336,02/07/2025,Identificação Errada do Paciente,Unidade Sesi Cambona,Evento com Dano Leve (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
337,03/07/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,larize.costa,Concluída,Administrar Consultas/ Exames de Saúde
338,03/07/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,larize.costa,Concluída,Administrar Consultas/ Exames de Saúde
341,07/07/2025,Cadastro incorreto ou incompleto,Unidade Sesi Arapiraca,Circunstância de Risco (Saúde),Não Classificado,Concluído,sarah.ferro,Concluída,Administrar Consultas/ Exames de Saúde
343,07/07/2025,Cadastro incorreto ou incompleto,Unidade Sesi Arapiraca,Não Classificado,Não Classificado,Concluído,mylena.soares,Concluída,Administrar Consultas/ Exames de Saúde
344,07/07/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,larize.costa,Concluída,Administrar Consultas/ Exames de Saúde
345,09/07/2025,Divergência ou desatualização dos dados de cadastro de clientes,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,larize.costa,Concluída,Administrar Acesso do Paciente/ Cliente
346,09/07/2025,Divergência ou desatualização dos dados de cadastro de clientes,Unidade Sesi Tabuleiro,Não Classificado,Não Classificado,Concluído,mylena.soares,Concluída,Administrar Acesso do Paciente/ Cliente
347,10/07/2025,Divergência ou desatualização dos dados de cadastro de clientes,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,larize.costa,Concluída,Administrar Consultas/ Exames de Saúde
350,11/07/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Evento com Nenhum Dano (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar ASO
351,11/07/2025,Atraso na liberação de laudos,Unidade Sesi Tabuleiro,Evento com Nenhum Dano (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
361,17/07/2025,Falha no registro em prontuário (incompleto e/ou ausente),Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
363,22/07/2025,Preparo errado do medicamento,Unidade Sesi Tabuleiro,Evento com Nenhum Dano (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
374,01/08/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Evento com Nenhum Dano (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
383,08/08/2025,Atraso na liberação de laudos,Unidade Sesi Cambona,Evento com Dano Leve (Saúde),Não Classificado,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
384,08/08/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Arapiraca,Evento com Dano Moderado (Saúde),Não Classificado,Em Andamento,sarah.ferro,Gerenciar Plano de Ação,Administrar Consultas/ Exames de Saúde
388,28/08/2025,Outros,Segurança e Saúde para Indústria,Evento com Nenhum Dano (Saúde),Não Classificado,Em Andamento,isabella.vieira,Analisar Causa e Fazer Plano de Ação,Administrar Consultas/ Exames de Saúde
404,20/10/2025,Retificação e/ou troca de laudos,Unidade Sesi Arapiraca,Circunstância de Risco (Saúde),Administração clínica,Em Andamento,sarah.ferro,Analisar Causa e Fazer Plano de Ação,Administrar Consultas/ Exames de Saúde
405,20/10/2025,Retificação e/ou troca de laudos,Unidade Sesi Arapiraca,Circunstância de Risco (Saúde),Administração clínica,Em Andamento,sarah.ferro,Analisar Causa e Fazer Plano de Ação,Administrar Consultas/ Exames de Saúde
408,23/10/2025,Falha do controle de entrada/saída dos equipamentos terceiros,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Dispositivo/equipamento médico,Em Andamento,fania.silva,Gerenciar Plano de Ação,SP10.2.1.Gerenciar Serviços de Saúde Complementar
413,27/10/2025,Atraso na liberação de laudos,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Documentação,Concluído,fania.silva,Concluída,Administrar Consultas/ Exames de Saúde
414,27/10/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Evento com Dano Leve (Saúde),Administração clínica,Concluído,larize.costa,Concluída,Administrar Acesso do Paciente/ Cliente
418,04/11/2025,Retificação e/ou troca de laudos,Unidade Sesi Cambona,Evento com Dano Leve (Saúde),Documentação,Em Andamento,andrezza.barros,Analisar Causa e Fazer Plano de Ação,Administrar Consultas/ Exames de Saúde
421,14/11/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Administração clínica,Em Andamento,larize.costa,Gerenciar Plano de Ação,Administrar Acesso do Paciente/ Cliente
422,14/11/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Administração clínica,Em Andamento,larize.costa,Analisar Causa e Fazer Plano de Ação,Administrar Acesso do Paciente/ Cliente
423,14/11/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Administração clínica,Em Andamento,larize.costa,Analisar Causa e Fazer Plano de Ação,Administrar Acesso do Paciente/ Cliente
424,14/11/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Circunstância de Risco (Saúde),Administração clínica,Em Andamento,larize.costa,Gerenciar Plano de Ação,Administrar Acesso do Paciente/ Cliente
425,14/11/2025,Cadastro incorreto ou incompleto,Unidade Sesi Cambona,Circunstância de Risco (Saúde),Administração clínica,Em Andamento,andrezza.barros,Analisar Causa e Fazer Plano de Ação,Administrar Consultas/ Exames de Saúde`;

export const generateMockData = (): Incident[] => {
  const lines = RAW_CSV_DATA.trim().split('\n');
  // Skip header
  const dataLines = lines.slice(1);
  
  const data: Incident[] = dataLines.map((line, index) => {
    // Parse CSV line (handles commas in values)
    const values: string[] = [];
    let currentValue = '';
    let insideQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());

    // Parse Date
    let dateStr = values[1];
    let isoDate = new Date().toISOString().split('T')[0];

    if (dateStr && dateStr.includes('/')) {
      const parts = dateStr.split('/');
      // DD/MM/YYYY -> YYYY-MM-DD
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2];
        isoDate = `${year}-${month}-${day}`;
      }
    }

    return {
      id: values[0] || `ID-${index}`,
      date: isoDate,
      type: values[2]?.trim() || 'Não Especificado',
      unit: values[3]?.trim() || 'Desconhecida',
      severity: values[4]?.trim() || 'Não Informado',
      oms: values[5]?.trim() || 'Não Classificado',
      status: values[6]?.trim() || 'Desconhecido',
      responsible: values[7]?.trim() || 'Sistema',
      phase: values[8]?.trim() || 'Notificado',
      process: values[9]?.trim() || 'Geral',
      description: `Ocorrência: ${values[2]}`
    };
  });

  return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
