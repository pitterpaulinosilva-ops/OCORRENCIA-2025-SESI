import { Incident } from '../types';

const RAW_CSV_DATA = `Código,Data,Tipo de Ocorrência,Notificada,Origem,Tipo/Severidade,Status,Responsável,Fase
26,08/11/2022,Falta de aderência da execução com o processo,Processos,Monitoramento,Procede / Moderado,Concluído,fernanda.feijo,Concluído
115,10/03/2023,Não conformidade na resposta ao cliente,Sesi Cambona,SAC/Ouvidoria,Procede / Severo,Concluído,rosimeire.silva,Concluído
154,07/07/2023,Falta de aderência da execução com o processo,Sesi Tabuleiro,Auditoria Int.,Procede / Leve,Concluído,patricia.marinho,Concluído
181,27/10/2023,Cobrança indevida,SST e Saúde Comp.,Monitoramento,Procede / Massivo,Concluído,carolina.albuquerque,Concluído
182,27/10/2023,Cobrança indevida,SST e Saúde Comp.,Monitoramento,Procede / Massivo,Concluído,carolina.albuquerque,Concluído
183,27/10/2023,Cobrança indevida,SST e Saúde Comp.,Monitoramento,Procede / Massivo,Concluído,carolina.albuquerque,Concluído
184,27/10/2023,Cobrança indevida,SST e Saúde Comp.,Monitoramento,Procede / Massivo,Concluído,carolina.albuquerque,Concluído
219,24/04/2024,Falta de aderência da execução com o processo,Sesi Tabuleiro,Monitoramento,Procede / Massivo,Concluído,ianara.silva,Concluído
233,13/06/2024,Identificação Errada do Paciente,Sesi Cambona,Notif. Clínicas,Incidente (Sem Dano),Concluído,carolina.albuquerque,Concluído
238,25/06/2024,Incidente/evento adverso,Central Relacion.,Monitoramento,Procede / Leve,Concluído,isabela.gomes,Concluído
251,12/11/2024,Ausência de identificação de risco de queda,Sesi Arapiraca,Notif. Clínicas,Procede / Circunstância Risco,Concluído,fania.silva,Concluído
252,13/11/2024,Queda,Sesi Tabuleiro,Notif. Clínicas,Incidente (Dano Leve),Concluído,fania.silva,Concluído
255,14/01/2025,Incidente/evento adverso,SST Indústria,Monitoramento,Procede / Moderado,Concluído,fania.silva,Concluído
256,21/01/2025,Preparo errado do medicamento,Sesi Tabuleiro,Notif. Clínicas,Procede / Circunstância Risco,Concluído,fania.silva,Concluído
257,21/01/2025,Recoleta de exames laboratoriais,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,fania.silva,Concluído
258,22/01/2025,Recoleta de exames laboratoriais,Sesi Tabuleiro,Notif. Clínicas,Procede / Não Classificado,Concluído,fania.silva,Concluído
259,23/01/2025,Incidente/evento adverso,Sesi Tabuleiro,Notif. Clínicas,Incidente (Dano Leve),Concluído,fania.silva,Concluído
260,28/01/2025,Incidente/evento adverso,Sesi Tabuleiro,Notif. Clínicas,Incidente (Dano Leve),Concluído,fania.silva,Concluído
263,19/02/2025,Queda,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,fania.silva,Concluído
266,24/02/2025,Incidente/evento adverso,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,fania.silva,Concluído
267,26/02/2025,Incidente/evento adverso,Sesi Cambona,Notif. Clínicas,Incidente / Near Miss,Concluído,fania.silva,Concluído
268,27/02/2025,Recoleta de exames laboratoriais,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,fania.silva,Concluído
271,10/03/2025,Insatisfação do cliente com o atendimento,Sesi Cambona,Monitoramento,Não Procede / Não Classif.,Concluído,carolina.albuquerque,Concluído
272,11/03/2025,Incidente/evento adverso,Sesi Tabuleiro,Notif. Clínicas,Incidente (Dano Leve),Concluído,fania.silva,Concluído
273,13/03/2025,Identificação Errada do Paciente,Sesi Tabuleiro,Notif. Clínicas,Incidente / Near Miss,Concluído,fania.silva,Concluído
274,10/03/2025,Análise de Ocorrência,Sesi Tabuleiro,Auditoria Int.,Incidente / Circunstância Risco,Concluído,fania.silva,Concluído
275,14/03/2025,Incidente/evento adverso,Sesi Cambona,Monitoramento,Procede / Não Classificado,Concluído,fania.silva,Concluído
276,14/03/2025,Incidente/evento adverso,Sesi Tabuleiro,Notif. Clínicas,Incidente (Dano Leve),Concluído,carolina.albuquerque,Concluído
280,20/03/2025,Queda,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,fania.silva,Concluído
284,03/04/2025,Incidente/evento adverso,Saúde,Feedback Clientes,Procede / Moderado,Concluído,carolina.albuquerque,Concluído
285,04/04/2025,Incidente/evento adverso,Senai Arapiraca,Monitoramento,Procede / Moderado,Concluído,fania.silva,Concluído
286,07/04/2025,Incidente/evento adverso,Sesi Arapiraca,Monitoramento,Incidente / Leve,Em Andamento,jessika.silva,Analisar Causa
287,08/04/2025,Incidente/evento adverso,Sesi Arapiraca,Monitoramento,Procede / Leve,Em Andamento,jessika.silva,Analisar Causa
288,08/04/2025,Incidente/evento adverso,Sesi Arapiraca,Monitoramento,Procede / Leve,Em Andamento,jessika.silva,Analisar Causa
289,08/04/2025,Incidente/evento adverso,Sesi Arapiraca,Monitoramento,Incidente (Sem Dano),Concluído,fania.silva,Concluído
290,08/04/2025,Incidente/evento adverso,Sesi Arapiraca,Monitoramento,Procede / Moderado,Concluído,fania.silva,Concluído
291,09/04/2025,Incidente/evento adverso,Sesi Arapiraca,Monitoramento,Procede / Não Classificado,Concluído,fania.silva,Concluído
292,15/04/2025,Incidente/evento adverso,Sesi Cambona,Monitoramento,Incidente / Circunstância Risco,Concluído,mylena.soares,Concluído
293,16/04/2025,Incidente/evento adverso,Sesi Arapiraca,Monitoramento,Incidente (Sem Dano),Concluído,fania.silva,Concluído
298,29/04/2025,Divergência/desatualização cadastro clientes,Sesi Arapiraca,Auditoria Int.,Incidente (Sem Dano),Concluído,fania.silva,Concluído
299,02/05/2025,Incidente/evento adverso,Sesi Senai Arapiraca,Monitoramento,Incidente / Circunstância Risco,Concluído,mylena.soares,Concluído
301,07/05/2025,Queda,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,mylena.soares,Concluído
302,07/05/2025,Identificação Errada do Paciente,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,mylena.soares,Concluído
303,08/05/2025,Incidente/evento adverso,Sesi Cambona,Notif. Clínicas,Procede / Não Classificado,Concluído,alana.barros,Concluído
305,08/05/2025,Queda,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,fania.silva,Concluído
306,08/05/2025,Queda,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,mylena.soares,Concluído
307,12/05/2025,Cadastro incorreto ou incompleto,Sesi Arapiraca,Auditoria Int.,Incidente / Não Classificado,Concluído,fania.silva,Concluído
309,13/05/2025,Perda ou extravio de documentos,Sesi Cambona,Auditoria Int.,Procede / Não Classificado,Concluído,rosimeire.silva,Concluído
310,13/05/2025,Preparo errado do medicamento,Sesi Tabuleiro,Notif. Clínicas,Procede / Não Classificado,Concluído,mylena.soares,Concluído
313,20/05/2025,Não execução ou execução parcial,Sesi Cambona,Pesquisa Sat.,Não Procede / Não Classif.,Concluído,mylena.soares,Concluído
315,23/05/2025,Incidente/evento adverso,Sesi Cambona,Monitoramento,Incidente / Circunstância Risco,Concluído,mylena.soares,Concluído
317,29/05/2025,Dados inconsistentes,Sesi Tabuleiro,Monitoramento,Incidente / Circunstância Risco,Concluído,mylena.soares,Concluído
319,02/06/2025,Cadastro incorreto ou incompleto,Sesi Arapiraca,Auditoria Int.,Incidente / Circunstância Risco,Concluído,mylena.soares,Concluído
322,06/06/2025,Cadastro incorreto ou incompleto,Sesi Cambona,Monitoramento,Incidente / Circunstância Risco,Concluído,mylena.soares,Concluído
325,11/06/2025,Incidente/evento adverso,Sesi Cambona,Monitoramento,Incidente / Circunstância Risco,Concluído,mylena.soares,Concluído
326,11/06/2025,Incidente/evento adverso,Sesi Cambona,Monitoramento,Incidente / Circunstância Risco,Concluído,mylena.soares,Concluído
336,01/07/2025,Identificação Errada do Paciente,Sesi Cambona,Monitoramento,Incidente (Dano Leve),Concluído,fania.silva,Concluído
337,01/07/2025,Identificação Errada do Paciente,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,larize.costa,Concluído
338,03/07/2025,Identificação Errada do Paciente,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,larize.costa,Concluído
341,07/07/2025,Cadastro incorreto ou incompleto,Sesi Arapiraca,Auditoria Int.,Incidente / Circunstância Risco,Concluído,sarah.ferro,Concluído
342,07/07/2025,Não colocação da pulseira de Risco,Sesi Arapiraca,Notif. Clínicas,Incidente / Circunstância Risco,Em Andamento,jessika.silva,Analisar Causa
343,07/07/2025,Cadastro incorreto ou incompleto,Sesi Arapiraca,Auditoria Int.,Incidente / Não Classificado,Concluído,mylena.soares,Concluído
344,07/07/2025,Identificação Errada do Paciente,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,larize.costa,Concluído
345,08/07/2025,Divergência/desatualização cadastro clientes,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,larize.costa,Concluído
346,08/07/2025,Divergência/desatualização cadastro clientes,Sesi Tabuleiro,Notif. Clínicas,Incidente / Não Classificado,Concluído,mylena.soares,Concluído
347,10/07/2025,Divergência/desatualização cadastro clientes,Sesi Tabuleiro,Auditoria Int.,Incidente / Circunstância Risco,Concluído,larize.costa,Concluído
349,11/07/2025,Armazenamento inadequado dos medicamentos,Sesi Tabuleiro,Notif. Clínicas,Procede / Não Classificado,Concluído,mylena.soares,Concluído
351,09/07/2025,Atraso na liberação de laudos,Sesi Tabuleiro,Notif. Clínicas,Incidente (Sem Dano),Concluído,fania.silva,Concluído
358,16/07/2025,Não colocação da pulseira de Risco,Sesi Tabuleiro,Notif. Clínicas,Não Classificado,Em Andamento,N/A,Alterar Descrição
359,16/07/2025,Não colocação da pulseira de Risco,Sesi Tabuleiro,Notif. Clínicas,Não Classificado,Em Andamento,N/A,Alterar Descrição
360,16/07/2025,Identificação Errada do Paciente,Sesi Tabuleiro,Notif. Clínicas,Não Classificado,Em Andamento,N/A,Alterar Descrição
361,17/07/2025,Falha no registro em prontuário,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,fania.silva,Concluído
363,22/07/2025,Preparo errado do medicamento,Sesi Tabuleiro,Notif. Clínicas,Incidente (Sem Dano),Concluído,fania.silva,Concluído
371,29/07/2025,Falha de integração entre sistemas,Sesi Cambona,Auditoria Int.,Procede / Não Classificado,Concluído,fania.silva,Concluído
374,01/08/2025,Identificação Errada do Paciente,Sesi Tabuleiro,Notif. Clínicas,Incidente (Sem Dano),Concluído,fania.silva,Concluído
375,01/08/2025,Incidente/evento adverso,Sesi Cambona,Notif. Clínicas,Procede / Não Classificado,Concluído,fania.silva,Concluído
376,01/08/2025,Inexistência do Controle de Saída,Sesi Tabuleiro,Notif. Clínicas,Procede / Não Classificado,Concluído,fania.silva,Concluído
382,08/08/2025,Equipamento não funcionante,SST Indústria,Notif. Clínicas,Procede / Não Classificado,Concluído,carolina.albuquerque,Concluído
383,07/08/2025,Atraso na liberação de laudos,Sesi Cambona,Notif. Clínicas,Incidente (Dano Leve),Concluído,fania.silva,Concluído
384,01/08/2025,Incidente/evento adverso,Sesi Arapiraca,Notif. Clínicas,Incidente (Dano Leve),Em Andamento,sarah.ferro,Validar Execução
388,28/08/2025,Outros,SST Indústria,Monitoramento,Incidente (Sem Dano),Em Andamento,isabella.vieira,Analisar Causa
398,15/09/2025,Inconsistência de informações,Central Relacion.,Monitoramento,Procede / Não Classificado,Concluído,isabela.gomes,Concluído
404,20/10/2025,Retificação e/ou troca de laudos,Sesi Arapiraca,Notif. Clínicas,Incidente / Circunstância Risco,Em Andamento,sarah.ferro,Analisar Causa
405,20/10/2025,Retificação e/ou troca de laudos,Sesi Arapiraca,Notif. Clínicas,Incidente / Circunstância Risco,Em Andamento,sarah.ferro,Avaliar Ocorrência
408,17/10/2025,Falha controle entrada/saída equipamentos,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Em Andamento,mylena.soares,Fazer Revisão
411,27/10/2025,Demora no atendimento,Sesi Tabuleiro,Notif. Clínicas,Procede / Não Classificado,Concluído,carolina.albuquerque,Concluído
413,27/10/2025,Atraso na liberação de laudos,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Concluído,fania.silva,Concluído
414,27/10/2025,Identificação Errada do Paciente,Sesi Tabuleiro,Notif. Clínicas,Incidente (Dano Leve),Concluído,larize.costa,Concluído
418,04/11/2025,Retificação e/ou troca de laudos,Sesi Cambona,Notif. Clínicas,Incidente (Dano Leve),Em Andamento,andrezza.barros,Analisar Causa
421,14/11/2025,Identificação Errada do Paciente,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Em Andamento,larize.costa,Gerenciar Plano
422,14/11/2025,Identificação Errada do Paciente,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Em Andamento,larize.costa,Analisar Causa
423,14/11/2025,Identificação Errada do Paciente,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Em Andamento,larize.costa,Analisar Causa
425,13/11/2025,Cadastro incorreto ou incompleto,Sesi Cambona,Notif. Clínicas,Incidente / Circunstância Risco,Em Andamento,andrezza.barros,Analisar Causa
427,24/11/2025,Não colocação da pulseira de Risco,Sesi Tabuleiro,Notif. Clínicas,Não Classificado,Em Andamento,N/A,Alterar Descrição
442,05/12/2025,Falha no registro em prontuário,Sesi Tabuleiro,Notif. Clínicas,Não Classificado,Em Andamento,N/A,Alterar Descrição
443,09/12/2025,Divergência/desatualização cadastro clientes,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Em Andamento,larize.costa,Analisar Causa
445,11/12/2025,Identificação Errada do Paciente,Sesi Tabuleiro,Notif. Clínicas,Incidente / Circunstância Risco,Em Andamento,larize.costa,Analisar Causa`;

// Helper para classificar a severidade
const classifySeverity = (tipoSeveridade: string): string => {
  const lower = tipoSeveridade.toLowerCase();
  
  if (lower.includes('massivo')) return 'Massivo';
  if (lower.includes('severo')) return 'Severo';
  if (lower.includes('moderado')) return 'Moderado';
  if (lower.includes('leve') && !lower.includes('dano leve')) return 'Leve';
  if (lower.includes('dano leve')) return 'Dano Leve';
  if (lower.includes('sem dano')) return 'Sem Dano';
  if (lower.includes('near miss')) return 'Near Miss';
  if (lower.includes('circunstância risco') || lower.includes('circunstancia risco')) return 'Circunstância de Risco';
  if (lower.includes('não classificado') || lower.includes('nao classificado') || lower === 'não classificado') return 'Não Classificado';
  if (lower.includes('não procede')) return 'Não Procede';
  
  return 'Não Classificado';
};

// Helper para determinar tipo de incidente OMS
const classifyOMS = (tipoSeveridade: string, tipoOcorrencia: string): string => {
  const lower = tipoSeveridade.toLowerCase();
  const tipoLower = tipoOcorrencia.toLowerCase();
  
  if (lower.includes('incidente')) {
    if (lower.includes('dano leve')) return 'Incidente com Dano Leve';
    if (lower.includes('sem dano')) return 'Incidente sem Dano';
    if (lower.includes('near miss')) return 'Near Miss';
    if (lower.includes('circunstância')) return 'Circunstância de Risco';
    return 'Incidente';
  }
  
  if (tipoLower.includes('queda')) return 'Queda';
  if (tipoLower.includes('identificação errada')) return 'Identificação Errada';
  if (tipoLower.includes('medicamento')) return 'Medicamento';
  if (tipoLower.includes('laudo')) return 'Documentação';
  if (tipoLower.includes('cadastro') || tipoLower.includes('divergência')) return 'Administração';
  
  return 'Não Classificado';
};

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

    // Parse Date - DD/MM/YYYY -> YYYY-MM-DD
    let dateStr = values[1];
    let isoDate = new Date().toISOString().split('T')[0];

    if (dateStr && dateStr.includes('/')) {
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        let year = parts[2];
        // Handle 2-digit year
        if (year.length === 2) {
          year = year.startsWith('2') ? `20${year}` : `20${year}`;
        }
        isoDate = `${year}-${month}-${day}`;
      }
    }

    const tipoSeveridade = values[5]?.trim() || 'Não Classificado';
    const tipoOcorrencia = values[2]?.trim() || 'Não Especificado';

    return {
      id: values[0] || `ID-${index}`,
      date: isoDate,
      type: tipoOcorrencia,
      unit: values[3]?.trim() || 'Desconhecida',
      severity: classifySeverity(tipoSeveridade),
      oms: classifyOMS(tipoSeveridade, tipoOcorrencia),
      status: values[6]?.trim() || 'Desconhecido',
      responsible: values[7]?.trim() || 'N/A',
      phase: values[8]?.trim() || 'Notificado',
      process: values[4]?.trim() || 'Geral', // Origem
      description: `Ocorrência: ${tipoOcorrencia}`
    };
  });

  return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
