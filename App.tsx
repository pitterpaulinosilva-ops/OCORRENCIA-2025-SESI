import React, { useState, useEffect, useMemo } from 'react';
import { BarChart3, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { Incident } from './types';
import { generateMockData } from './services/mockData';
import { DashboardCharts } from './components/DashboardCharts';
import { analyzeIncidents } from './services/geminiService';
import { MainLayout } from './components/layout/MainLayout';
import { KPICard } from './components/dashboard/KPICard';
import { FilterBar } from './components/dashboard/FilterBar';
import { AIInsightsPanel } from './components/dashboard/AIInsightsPanel';
import { Toaster } from './components/ui/toaster';
import { useToast } from './hooks/use-toast';
import { useMobile } from './hooks/use-mobile';
import { useTheme } from './hooks/use-theme';
import * as XLSX from 'xlsx';

const App: React.FC = () => {
  const [data, setData] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const { toast } = useToast();
  const { isMobile } = useMobile();
  
  // Initialize theme hook to apply theme on mount
  useTheme();

  // Filter States
  const [filters, setFilters] = useState({
    unit: 'all',
    severity: 'all',
    startDate: '',
    endDate: '',
  });

  // Load Mock Data on Mount
  useEffect(() => {
    const mock = generateMockData();
    setData(mock);
    setLoading(false);
  }, []);

  // Filter Logic
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchUnit = filters.unit === 'all' || item.unit === filters.unit;
      const matchSeverity = filters.severity === 'all' || item.severity === filters.severity;
      
      let matchDate = true;
      if (filters.startDate) {
        matchDate = matchDate && new Date(item.date) >= new Date(filters.startDate);
      }
      if (filters.endDate) {
        matchDate = matchDate && new Date(item.date) <= new Date(filters.endDate);
      }

      return matchUnit && matchSeverity && matchDate;
    });
  }, [data, filters]);

  // KPI Calculations
  const metrics = useMemo(() => {
    const total = filteredData.length;
    const concluded = filteredData.filter(d => d.status === 'Concluído').length;
    const inProgress = filteredData.filter(d => d.status !== 'Concluído').length;
    const percentage = total > 0 ? Math.round((concluded / total) * 100) : 0;

    return { total, concluded, inProgress, percentage };
  }, [filteredData]);

  const uniqueUnits = useMemo(() => Array.from(new Set(data.map(d => d.unit))), [data]);
  const uniqueSeverities = useMemo(() => Array.from(new Set(data.map(d => d.severity))), [data]);

  // Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const jsonData = XLSX.utils.sheet_to_json(ws) as any[];
        
        const mappedData: Incident[] = jsonData.map((row, idx) => {
          let dateStr = row['Data'] || row['DATA'] || row['date'];
          
          if (dateStr instanceof Date) {
             dateStr = dateStr.toISOString().split('T')[0];
          } else if (typeof dateStr === 'string') {
             if (dateStr.includes('(')) dateStr = dateStr.split('(')[0].trim();
             
             if (dateStr.includes('/')) {
                const parts = dateStr.split('/');
                if (parts.length === 3) {
                   dateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
                }
             }
          } else if (typeof dateStr === 'number') {
             const dateObj = new Date(Math.round((dateStr - 25569)*86400*1000));
             dateStr = dateObj.toISOString().split('T')[0];
          }

          if (!dateStr || dateStr.length < 10) {
              dateStr = new Date().toISOString().split('T')[0];
          }

          return {
            id: row['Código'] || row['id'] || `IMP-${idx}`,
            date: dateStr,
            type: row['Tipo de Ocorrência'] || row['type'] || 'Não Especificado',
            oms: row['Tipo de Incidente - OMS por Mês'] || row['Tipo de Incidente (OMS)'] || row['oms'] || 'Não Classificado',
            phase: row['Fase'] || row['phase'] || 'Não Informado',
            unit: row['Notificada'] || row['unit'] || 'Desconhecida',
            severity: row['Severidade/Gravidade'] || row['severity'] || 'Não Classificado',
            responsible: row['Responsável'] || row['responsible'] || 'Sistema',
            process: row['Processo'] || row['process'] || 'Geral',
            status: row['Status'] || row['status'] || 'Desconhecido',
            description: row['description'] || `Ocorrência importada: ${row['Tipo de Ocorrência']}`
          };
        });

        if (mappedData.length === 0) {
           throw new Error("Nenhum dado válido encontrado.");
        }

        mappedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setData(mappedData);
        
        toast({
          title: "Arquivo importado com sucesso!",
          description: `${mappedData.length} registros foram carregados.`,
          variant: "success",
        });
      } catch (err) {
        toast({
          title: "Erro ao processar arquivo",
          description: "Verifique se o formato é Excel/CSV válido e contém os cabeçalhos corretos.",
          variant: "destructive",
        });
        console.error(err);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleExport = () => {
    try {
      const headers = ['Código', 'Data', 'Tipo de Ocorrência', 'Notificada', 'Severidade', 'Tipo de Incidente - OMS por Mês', 'Status', 'Responsável', 'Fase', 'Processo'];
      const csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + filteredData.map(e => `"${e.id}","${e.date}","${e.type}","${e.unit}","${e.severity}","${e.oms}","${e.status || ''}","${e.responsible}","${e.phase}","${e.process}"`).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "relatorio_ocorrencias.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Relatório exportado!",
        description: `${filteredData.length} registros foram exportados com sucesso.`,
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Erro ao exportar",
        description: "Não foi possível exportar o relatório.",
        variant: "destructive",
      });
    }
  };

  const handleGeminiAnalysis = async () => {
    setAnalyzing(true);
    setAiAnalysis(null);
    setAiError(null);
    
    try {
      const result = await analyzeIncidents(filteredData);
      setAiAnalysis(result);
      
      toast({
        title: "Análise concluída!",
        description: "A análise de IA foi gerada com sucesso.",
        variant: "success",
      });
    } catch (error) {
      const errorMessage = "Não foi possível gerar a análise. Tente novamente.";
      setAiError(errorMessage);
      
      toast({
        title: "Erro na análise",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCloseAnalysis = () => {
    setAiAnalysis(null);
    setAiError(null);
  };

  return (
    <>
      <MainLayout
        onFileUpload={handleFileUpload}
        onExport={handleExport}
        onGenerateAnalysis={handleGeminiAnalysis}
        analyzing={analyzing}
      >
        <div className="p-4 md:p-8 space-y-8">
          {/* Filter Bar */}
          <FilterBar
            units={uniqueUnits}
            severities={uniqueSeverities}
            filters={filters}
            onFilterChange={setFilters}
            resultCount={filteredData.length}
            isMobile={isMobile}
          />

          {/* AI Insights Panel */}
          {(aiAnalysis || analyzing || aiError) && (
            <AIInsightsPanel
              analysis={aiAnalysis}
              isLoading={analyzing}
              error={aiError}
              onClose={handleCloseAnalysis}
            />
          )}

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Total de Ocorrências"
              value={metrics.total}
              icon={BarChart3}
              color="blue"
            />
            <KPICard
              title="Concluídas"
              value={metrics.concluded}
              icon={CheckCircle2}
              color="green"
            />
            <KPICard
              title="Em Andamento"
              value={metrics.inProgress}
              icon={Clock}
              color="orange"
            />
            <KPICard
              title="% de Conclusão"
              value={`${metrics.percentage}%`}
              icon={TrendingUp}
              color="blue"
              showProgress
              progressValue={metrics.percentage}
            />
          </div>

          {/* Charts */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
          ) : (
            <DashboardCharts data={filteredData} />
          )}
        </div>
      </MainLayout>
      
      <Toaster />
    </>
  );
};

export default App;
