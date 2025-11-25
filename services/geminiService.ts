import { GoogleGenAI } from "@google/genai";
import { Incident } from "../types";

const processDataForAI = (data: Incident[]) => {
  // Create a lightweight summary to avoid token limits
  const summary = {
    total: data.length,
    bySeverity: data.reduce((acc, curr) => { acc[curr.severity] = (acc[curr.severity] || 0) + 1; return acc; }, {} as Record<string, number>),
    byType: data.reduce((acc, curr) => { acc[curr.type] = (acc[curr.type] || 0) + 1; return acc; }, {} as Record<string, number>),
    byUnit: data.reduce((acc, curr) => { acc[curr.unit] = (acc[curr.unit] || 0) + 1; return acc; }, {} as Record<string, number>),
    recentTrend: "Data indicates distribution across last 12 months."
  };
  return JSON.stringify(summary);
};

export const analyzeIncidents = async (data: Incident[]): Promise<string> => {
  // Use the provided API key
  const apiKey = "AIzaSyBfdTV13dMUmNbFSNSx6x7-3eSTIpN-Xis";
  
  if (!apiKey) {
    return "API Key não configurada. Por favor, configure a variável de ambiente GEMINI_API_KEY.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const dataSummary = processDataForAI(data);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Atue como um Especialista Sênior em Inteligência de Dados e Gestão de Riscos.
      Analise o seguinte resumo de dados de ocorrências de uma empresa (formato JSON):
      
      ${dataSummary}
      
      Forneça um relatório executivo breve (máximo 4 parágrafos) focando em:
      1. Pontos críticos que exigem atenção imediata.
      2. Padrões incomuns ou tendências preocupantes.
      3. Uma recomendação estratégica para a diretoria.
      
      Use formatação Markdown para deixar o texto legível e profissional. Use emojis corporativos com moderação.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || "Não foi possível gerar uma análise no momento.";
  } catch (error) {
    console.error("Erro ao consultar Gemini:", error);
    return "Ocorreu um erro ao processar a análise inteligente. Verifique sua conexão ou a chave de API.";
  }
};