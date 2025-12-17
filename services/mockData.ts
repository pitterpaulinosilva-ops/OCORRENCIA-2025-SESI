import { Incident } from '../types';

const RAW_CSV_DATA = `Código,Data,Ocorrência,Notificadora,Notificada,Origem,Tipo de Ocorrência,Severidade/Gravidade,Tipo de Incidente - OMS,Status,Responsável,Fase
219,24/04/2024,Falta de aderência da execução com o processo documentado,Financeiro,Unidade Sesi Tabuleiro,Monitoramento de Processos,Procede,Massivo,Não Classificado,Concluído,ianara.silva,Concluída
233,13/06/2024,Identificação Errada do Paciente,SST e Saúde Complementar,Unidade Sesi Cambona,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Evento com Nenhum Dano (Saúde),Não Classificado,Concluído,carolina.albuquerque,Concluída
238,25/06/2024,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Cambona,Central de Relacionamento,Monitoramento Interno,Procede,Leve,Não Classificado,Concluído,isabela.gomes,Concluída
248,22/10/2024,Comprometimento ou falha na execução do serviço,SST para Indústria,Unidade Sesi Cambona,Monitoramento de Processos,Procede,Leve,Não Classificado,Concluído,alana.barros,Concluída
249,25/10/2024,Vazamento de dados,SST e Saúde Complementar,Marketing,Pesquisa de Satisfação,Procede,Massivo,Não Classificado,Concluído,carolina.pontes,Concluída
253,29/11/2024,Identificação Errada do Paciente,Saúde,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Procede,Moderado,Não Classificado,Concluído,fania.silva,Concluída
254,29/11/2024,Cadastro incorreto ou incompleto,Produto e Cliente,SST para Indústria,Pesquisa de Satisfação,Procede,Moderado,Não Classificado,Concluído,kledson.cavalcante,Concluída
256,21/01/2025,Preparo errado do medicamento,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Procede,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída
257,21/01/2025,Recoleta de exames laboratoriais,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída
258,22/01/2025,Recoleta de exames laboratoriais,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Procede,Não Classificado,Não Classificado,Concluído,fania.silva,Concluída
260,28/01/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Evento com Dano Leve (Saúde),Não Classificado,Concluído,fania.silva,Concluída
267,26/02/2025,Incidente/evento adverso ocorrido no serviço de saúde,Presidência,Unidade Sesi Cambona,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Near Miss (Saúde),Não Classificado,Concluído,fania.silva,Concluída
268,27/02/2025,Recoleta de exames laboratoriais,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída
271,10/03/2025,Insatisfação do cliente com o atendimento,Unidade Sesi Cambona,Unidade Sesi Cambona,Monitoramento de Processos,Não Procede,Não Classificado,Não Classificado,Concluído,carolina.albuquerque,Concluída
274,10/03/2025,Análise de Ocorrência,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Auditoria Interna,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída
276,14/03/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Evento com Dano Leve (Saúde),Não Classificado,Concluído,carolina.albuquerque,Concluída
284,03/04/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Tabuleiro,Saúde,Feedback de clientes,Procede,Moderado,Não Classificado,Concluído,carolina.albuquerque,Concluída
285,04/04/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Senai Arapiraca,Unidade Senai Arapiraca,Monitoramento Interno,Procede,Moderado,Não Classificado,Concluído,fania.silva,Concluída
286,07/04/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Senai Arapiraca,Unidade Sesi Arapiraca,Monitoramento Interno,Incidente envolvendo o Paciente,Leve,Não Classificado,Em Andamento,jessika.silva,Analisar Causa/Plano
287,08/04/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Senai Arapiraca,Unidade Sesi Arapiraca,Monitoramento Interno,Procede,Leve,Não Classificado,Em Andamento,jessika.silva,Analisar Causa/Plano
288,08/04/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Arapiraca,Unidade Sesi Arapiraca,Monitoramento Interno,Procede,Leve,Não Classificado,Em Andamento,jessika.silva,Analisar Causa/Plano
290,08/04/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Arapiraca,Unidade Sesi Arapiraca,Monitoramento Interno,Procede,Moderado,Não Classificado,Concluído,fania.silva,Concluída
291,09/04/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Arapiraca,Unidade Sesi Arapiraca,Monitoramento Interno,Procede,Não Classificado,Não Classificado,Concluído,fania.silva,Concluída
292,15/04/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Cambona,Unidade Sesi Cambona,Monitoramento de Processos,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída
298,29/04/2025,Divergência ou desatualização dos dados de cadastro de clientes,Unidade Sesi Senai Arapiraca,Unidade Sesi Arapiraca,Auditoria Interna,Incidente envolvendo o Paciente,Evento com Nenhum Dano (Saúde),Não Classificado,Concluído,fania.silva,Concluída
299,02/05/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Senai Arapiraca,Unidade Sesi Senai Arapiraca,Monitoramento Interno,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída
302,07/05/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída
303,08/05/2025,Incidente/evento adverso ocorrido no serviço de saúde,SST para Indústria,Unidade Sesi Cambona,Notificação Clínicas Sesi,Procede,Não Classificado,Não Classificado,Concluído,alana.barros,Concluída
305,08/05/2025,Queda,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída
306,08/05/2025,Queda,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída
307,12/05/2025,Cadastro incorreto ou incompleto,SST para Indústria,Unidade Sesi Arapiraca,Auditoria Interna,Incidente envolvendo o Paciente,Não Classificado,Não Classificado,Concluído,fania.silva,Concluída
309,13/05/2025,Perda ou extravio de documentos,Unidade Sesi Tabuleiro,Unidade Sesi Cambona,Auditoria Interna,Procede,Não Classificado,Não Classificado,Concluído,rosimeire.silva,Concluída
310,13/05/2025,Preparo errado do medicamento,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Procede,Não Classificado,Não Classificado,Concluído,mylena.soares,Concluída
313,20/05/2025,Não execução ou execução parcial da atividade,SST para Indústria,Unidade Sesi Cambona,Pesquisa de Satisfação,Não Procede,Não Classificado,Não Classificado,Concluído,mylena.soares,Concluída
315,23/05/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Cambona,Unidade Sesi Cambona,Monitoramento Interno,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída
317,29/05/2025,Dados inconsistentes,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Monitoramento de Processos,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída
319,02/06/2025,Cadastro incorreto ou incompleto,Unidade Sesi Arapiraca,Unidade Sesi Arapiraca,Auditoria Interna,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída
322,06/06/2025,Cadastro incorreto ou incompleto,Unidade Sesi Tabuleiro,Unidade Sesi Cambona,Monitoramento de Processos,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída
324,10/06/2025,Não execução ou execução parcial da atividade,SST para Indústria,Unidade Sesi Arapiraca,Auditoria Interna,Procede,Não Classificado,Não Classificado,Em Andamento,thiana.cysneiros,Analisar Causa/Plano
325,11/06/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Cambona,Unidade Sesi Cambona,Monitoramento Interno,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída
326,11/06/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Cambona,Unidade Sesi Cambona,Monitoramento Interno,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,mylena.soares,Concluída
336,01/07/2025,Identificação Errada do Paciente,Unidade Sesi Cambona,Unidade Sesi Cambona,Monitoramento de Processos,Incidente envolvendo o Paciente,Evento com Dano Leve (Saúde),Não Classificado,Concluído,fania.silva,Concluída
337,01/07/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,larize.costa,Concluída
338,03/07/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,larize.costa,Concluída
341,07/07/2025,Cadastro incorreto ou incompleto,Unidade Sesi Arapiraca,Unidade Sesi Arapiraca,Auditoria Interna,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,sarah.ferro,Concluída
343,07/07/2025,Cadastro incorreto ou incompleto,Unidade Sesi Arapiraca,Unidade Sesi Arapiraca,Auditoria Interna,Incidente envolvendo o Paciente,Não Classificado,Não Classificado,Concluído,mylena.soares,Concluída
344,07/07/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,larize.costa,Concluída
347,10/07/2025,Divergência ou desatualização dos dados de cadastro de clientes,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Auditoria Interna,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,larize.costa,Concluída
349,11/07/2025,Armazenamento inadequado dos medicamentos,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Procede,Não Classificado,Não Classificado,Concluído,mylena.soares,Concluída
350,10/07/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Evento com Nenhum Dano (Saúde),Não Classificado,Concluído,fania.silva,Concluída
351,09/07/2025,Atraso na liberação de laudos,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Evento com Nenhum Dano (Saúde),Não Classificado,Concluído,fania.silva,Concluída
356,09/07/2025,Divergência ou desatualização dos dados de cadastro de clientes,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Procede,Não Classificado,Não Classificado,Concluído,fania.silva,Concluída
357,09/07/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Monitoramento Interno,Procede,Não Classificado,Não Classificado,Concluído,mylena.soares,Concluída
358,16/07/2025,Não colocação da pulseira de Identificação de Risco,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Não Classificado,Não Classificado,Não Classificado,Em Andamento,N/A,Alterar Descrição
359,16/07/2025,Não colocação da pulseira de Identificação de Risco,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Não Classificado,Não Classificado,Não Classificado,Em Andamento,N/A,Alterar Descrição
360,16/07/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Não Classificado,Não Classificado,Não Classificado,Em Andamento,N/A,Alterar Descrição
361,17/07/2025,Falha no registro em prontuário,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Não Classificado,Concluído,fania.silva,Concluída
363,22/07/2025,Preparo errado do medicamento,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Evento com Nenhum Dano (Saúde),Não Classificado,Concluído,fania.silva,Concluída
371,29/07/2025,Falha de integração entre sistemas,Unidade Sesi Tabuleiro,Unidade Sesi Cambona,Auditoria Interna,Procede,Não Classificado,Não Classificado,Concluído,fania.silva,Concluída
374,01/08/2025,Identificação Errada do Paciente,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Evento com Nenhum Dano (Saúde),Não Classificado,Concluído,fania.silva,Concluída
375,01/08/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Tabuleiro,Unidade Sesi Cambona,Notificação Clínicas Sesi,Procede,Não Classificado,Não Classificado,Concluído,fania.silva,Concluída
379,05/08/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Tabuleiro,SST para Indústria,Monitoramento Interno,Não Classificado,Não Classificado,Não Classificado,Concluído,N/A,Concluída
383,07/08/2025,Atraso na liberação de laudos,SST para Indústria,Unidade Sesi Cambona,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Evento com Dano Leve (Saúde),Não Classificado,Concluído,fania.silva,Concluída
384,01/08/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Arapiraca,Unidade Sesi Arapiraca,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Evento com Dano Leve (Saúde),Não Classificado,Em Andamento,sarah.ferro,Validar Execução
388,28/08/2025,Outros,Unidade Sesi Tabuleiro,SST para Indústria,Monitoramento de Processos,Incidente envolvendo o Paciente,Evento com Nenhum Dano (Saúde),Não Classificado,Em Andamento,isabella.vieira,Analisar Causa/Plano
398,15/09/2025,Inconsistência de informações,Unidade Sesi Cambona,Central de Relacionamento,Monitoramento de Processos,Procede,Não Classificado,Não Classificado,Concluído,isabela.gomes,Concluída
402,15/10/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Senai Arapiraca,Unidade Sesi Arapiraca,Monitoramento Interno,Não Procede,Não Classificado,Não Classificado,Concluído,N/A,Concluída
404,20/10/2025,Retificação e/ou troca de laudos,Unidade Sesi Arapiraca,Unidade Sesi Arapiraca,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Administração clínica,Em Andamento,sarah.ferro,Analisar Causa/Plano
405,20/10/2025,Retificação e/ou troca de laudos,Unidade Sesi Arapiraca,Unidade Sesi Arapiraca,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Administração clínica,Em Andamento,sarah.ferro,Avaliar Ocorrência
407,23/10/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Arapiraca,Unidade Senai Arapiraca,Monitoramento Interno,Não Classificado,Não Classificado,Não Classificado,Em Andamento,N/A,Alterar Descrição
408,17/10/2025,Falha do controle de entrada/saída dos equipamentos terceiros,SST para Indústria,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Dispositivo/equipamento,Em Andamento,mylena.soares,Fazer Revisão
411,27/10/2025,Demora no atendimento do paciente,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Procede,Não Classificado,Não Classificado,Concluído,carolina.albuquerque,Concluída
413,27/10/2025,Atraso na liberação de laudos,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Documentação,Concluído,fania.silva,Concluída
418,04/11/2025,Retificação e/ou troca de laudos,Unidade Sesi Cambona,Unidade Sesi Cambona,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Evento com Dano Leve (Saúde),Documentação,Em Andamento,andrezza.barros,Analisar Causa/Plano
425,13/11/2025,Cadastro incorreto ou incompleto,Unidade Sesi Cambona,Unidade Sesi Cambona,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Administração clínica,Em Andamento,andrezza.barros,Analisar Causa/Plano
427,24/11/2025,Não colocação da pulseira de Identificação de Risco,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Não Classificado,Não Classificado,Não Classificado,Em Andamento,N/A,Alterar Descrição
439,26/11/2025,Incidente/evento adverso ocorrido no serviço de saúde,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Incidente envolvendo o Paciente,Circunstância de Risco (Saúde),Processo/procedimento clínico,Em Andamento,fania.silva,Analisar Causa/Plano
442,05/12/2025,Falha no registro em prontuário,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Notificação Clínicas Sesi,Não Classificado,Não Classificado,Não Classificado,Em Andamento,N/A,Alterar Descrição
444,10/12/2025,Divergência ou desatualização dos dados de cadastro de clientes,Unidade Sesi Tabuleiro,Unidade Sesi Tabuleiro,Monitoramento de Processos,Procede,Não Classificado,Não Classificado,Em Andamento,carolina.albuquerque,Analisar Causa/Plano`;

// Helper para classificar a severidade
const classifySeverity = (severidade: string): string => {
  const s = severidade.toLowerCase().trim();

  if (s === '-' || s === '' || s.includes('não classificado')) return 'Não Classificado';
  if (s.includes('massivo')) return 'Massivo';
  if (s.includes('moderado')) return 'Moderado';
  if (s.includes('leve') && !s.includes('dano')) return 'Leve';
  if (s.includes('dano leve')) return 'Dano Leve';
  if (s.includes('nenhum dano') || s.includes('sem dano')) return 'Sem Dano';
  if (s.includes('near miss')) return 'Near Miss';
  if (s.includes('circunstância') || s.includes('risco')) return 'Circunstância de Risco';

  return severidade.trim() || 'Não Classificado';
};

// Helper para classificar tipo de ocorrência
const classifyType = (tipo: string): string => {
  const t = tipo.toLowerCase().trim();

  if (t === '-' || t === '' || t.includes('não classificado')) return 'Não Classificado';
  if (t.includes('incidente') && t.includes('paciente')) return 'Incidente c/ Paciente';
  if (t.includes('procede')) return 'Procede';
  if (t.includes('não procede')) return 'Não Procede';

  return tipo.trim() || 'Não Classificado';
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
    // Handle dates with annotations like "10/03/2025 (inc. 11/03)"
    let dateStr = values[1]?.split('(')[0].trim() || '';
    let isoDate = new Date().toISOString().split('T')[0];

    if (dateStr && dateStr.includes('/')) {
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        let year = parts[2];
        // Handle 2-digit year
        if (year.length === 2) {
          year = `20${year}`;
        }
        isoDate = `${year}-${month}-${day}`;
      }
    }

    // Map fields according to new structure:
    // 0: Código, 1: Data, 2: Ocorrência, 3: Notificadora, 4: Notificada (Unit)
    // 5: Origem (Process), 6: Tipo de Ocorrência, 7: Severidade, 8: OMS, 9: Status, 10: Responsável, 11: Fase

    const tipoOcorrencia = values[6]?.trim() || 'Não Classificado';
    const severidade = values[7]?.trim() || 'Não Classificado';
    const oms = values[8]?.trim() || 'Não Classificado';

    return {
      id: values[0] || `ID-${index}`,
      date: isoDate,
      type: values[2]?.trim() || 'Não Especificado', // Ocorrência (descrição)
      unit: values[4]?.trim().replace('Unidade ', '') || 'Desconhecida', // Notificada
      severity: classifySeverity(severidade),
      oms: oms,
      status: values[9]?.trim() || 'Desconhecido',
      responsible: values[10]?.trim() || 'N/A',
      phase: values[11]?.trim() || 'Não Informado',
      process: values[5]?.trim() || 'Geral', // Origem
      description: `${values[2]?.trim() || 'Ocorrência'} - Tipo: ${classifyType(tipoOcorrencia)}`
    };
  });

  return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
