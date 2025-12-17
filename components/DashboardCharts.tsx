import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import { Incident } from '../types';
import { Calendar, AlertTriangle, Building2, FolderOpen, Users, Activity, RefreshCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTheme } from '../hooks/use-theme';

interface ChartsProps {
  data: Incident[];
}

// Corporate Palette
const COLORS = {
  success: '#10b981', // Green
  warning: '#f59e0b', // Amber
  danger: '#ef4444', // Red
  info: '#3b82f6', // Blue
  primary: '#1e40af', // Dark Blue
  secondary: '#64748b', // Slate
  chart1: '#06b6d4', // Cyan
  chart2: '#ec4899', // Pink
  chart3: '#8b5cf6', // Violet
  chart4: '#f97316', // Orange
};

// Semantic Severity Color Mapper
const getSeverityColor = (name: string): string => {
  const s = name.toLowerCase();
  if (s.includes('massivo')) return '#7c2d12'; // Brown-Red (Most severe)
  if (s.includes('severo')) return '#991B1B'; // Dark Red
  if (s.includes('moderado')) return COLORS.danger; // Red
  if (s.includes('dano leve')) return COLORS.chart4; // Orange
  if (s.includes('leve') && !s.includes('dano')) return '#fb923c'; // Light Orange
  if (s.includes('sem dano') || s.includes('nenhum dano')) return COLORS.success; // Green
  if (s.includes('near miss')) return COLORS.info; // Blue
  if (s.includes('circunstância') || s.includes('risco')) return '#EAB308'; // Yellow
  if (s.includes('não classificado') || s.includes('nao classif')) return COLORS.secondary; // Gray
  if (s.includes('não procede')) return '#a1a1aa'; // Zinc
  return COLORS.secondary;
};

const getStatusColor = (status: string): string => {
  const s = status.toLowerCase();
  if (s.includes('conclu')) return COLORS.success;
  if (s.includes('andamento')) return COLORS.warning;
  return COLORS.secondary;
};

const ChartHeader: React.FC<{ icon: React.ElementType, title: string, subtitle?: string }> = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-start gap-3">
    <Icon className="text-muted-foreground mt-0.5" size={20} />
    <div>
      <h3 className="text-foreground font-bold text-base leading-tight">{title}</h3>
      {subtitle && <p className="text-muted-foreground text-xs mt-1">{subtitle}</p>}
    </div>
  </div>
);

// Theme-aware chart colors
const getChartColors = (isDark: boolean) => ({
  grid: isDark ? '#334155' : '#e2e8f0',
  axis: isDark ? '#94a3b8' : '#64748b',
  tooltipBg: isDark ? '#1e293b' : '#ffffff',
  tooltipBorder: isDark ? '#334155' : '#e2e8f0',
  cursor: isDark ? '#1e293b' : '#f8fafc',
});

export const DashboardCharts: React.FC<ChartsProps> = ({ data }) => {
  const { isDark } = useTheme();
  const chartColors = getChartColors(isDark);

  // Custom tooltip style
  const tooltipStyle = {
    backgroundColor: chartColors.tooltipBg,
    border: `1px solid ${chartColors.tooltipBorder}`,
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  };

  // 1. Monthly Evolution (Stacked Bar: Concluido vs Em Andamento)
  const monthlyData = useMemo(() => {
    const agg: Record<string, { name: string, Concluído: number, 'Em Andamento': number, sortKey: string }> = {};

    data.forEach(d => {
      // Garantir que a data está no formato correto
      const dateParts = d.date.split('-'); // YYYY-MM-DD
      if (dateParts.length !== 3) return;

      const year = dateParts[0];
      const month = dateParts[1];
      const sortKey = `${year}-${month}`;

      // Criar nome do mês em português
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const monthIndex = parseInt(month) - 1;
      const yearShort = year.substring(2);
      const displayName = `${monthNames[monthIndex]}. de ${yearShort}`;

      if (!agg[sortKey]) {
        agg[sortKey] = {
          name: displayName,
          Concluído: 0,
          'Em Andamento': 0,
          sortKey: sortKey
        };
      }

      const statusKey = d.status === 'Concluído' ? 'Concluído' : 'Em Andamento';
      agg[sortKey][statusKey]++;
    });

    // Ordenar por chave e remover sortKey do resultado
    return Object.keys(agg)
      .sort()
      .map(k => ({
        name: agg[k].name,
        Concluído: agg[k].Concluído,
        'Em Andamento': agg[k]['Em Andamento']
      }));
  }, [data]);

  // 2. OMS Type (Bar Chart)
  const omsData = useMemo(() => {
    const agg: Record<string, number> = {};
    data.forEach(d => agg[d.oms] = (agg[d.oms] || 0) + 1);

    // Defined colors for specific OMS categories if needed
    const omsColors: Record<string, string> = {
      'Não Classificado': '#94a3b8',
      'Administração clínica': '#004080',
      'Documentação': '#ff6600',
      'Dispositivo/equipamento médico': '#cc0000'
    };

    return Object.entries(agg)
      .sort((a, b) => new Date(a[0]) > new Date(b[0]) ? 1 : -1) // Assuming time sort isn't applicable, sort by name? Or usually date for OMS trends. Let's stick to simple mapping if it was time based. 
    // Actually, typically OMS is categorical. Let's group by Month AND OMS for the chart shown in image 2 (looks like a time series with multiple bars per month)
    // Let's re-do OMS to be Monthly Grouped Bar
    return [];
  }, [data]);

  const omsTimeData = useMemo(() => {
    const agg: Record<string, any> = {};

    data.forEach(d => {
      // Garantir que a data está no formato correto
      const dateParts = d.date.split('-'); // YYYY-MM-DD
      if (dateParts.length !== 3) return;

      const year = dateParts[0];
      const month = dateParts[1];
      const sortKey = `${year}-${month}`;

      // Criar nome do mês em português
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const monthIndex = parseInt(month) - 1;
      const yearShort = year.substring(2);
      const displayName = `${monthNames[monthIndex]}. de ${yearShort}`;

      if (!agg[sortKey]) agg[sortKey] = { name: displayName };

      agg[sortKey][d.oms] = (agg[sortKey][d.oms] || 0) + 1;
    });

    return Object.keys(agg).sort().map(k => agg[k]);
  }, [data]);

  // Unique OMS keys from data
  const omsKeysFromData = useMemo(() => {
    const keys = new Set<string>();
    data.forEach(d => keys.add(d.oms));
    // Ordenar para que "Não Classificado" fique por último
    const keysArray = Array.from(keys);
    keysArray.sort((a, b) => {
      if (a === 'Não Classificado') return 1;
      if (b === 'Não Classificado') return -1;
      return a.localeCompare(b);
    });
    return keysArray;
  }, [data]);

  // Mapa de cores vibrantes para cada tipo OMS - Cinza para Não Classificado
  const omsColorMap: Record<string, string> = {
    'Não Classificado': '#9ca3af', // Gray-400 - sempre cinza
    'Administração clínica': '#3b82f6', // Blue-500
    'Documentação': '#f59e0b', // Amber-500
    'Dispositivo/equipamento': '#ef4444', // Red-500
    'Processo/procedimento clínico': '#8b5cf6', // Violet-500
    'Medicamento': '#ec4899', // Pink-500
    'Infraestrutura': '#14b8a6', // Teal-500
    'Comportamento': '#f97316', // Orange-500
    'Recursos/Gestão': '#06b6d4', // Cyan-500
    'Nutrição': '#84cc16', // Lime-500
    'Sangue/hemoderivados': '#dc2626', // Red-600
    'Oxigênio/gases': '#0ea5e9', // Sky-500
  };

  // Gerar cores para cada key, usando cores vibrantes para tipos não mapeados
  const fallbackColors = ['#6366f1', '#a855f7', '#d946ef', '#22c55e', '#eab308', '#0891b2'];
  let fallbackIndex = 0;

  const omsColors = omsKeysFromData.map(k => {
    if (omsColorMap[k]) {
      return omsColorMap[k];
    }
    // Cor fallback vibrante para tipos não mapeados (exceto Não Classificado)
    if (k === 'Não Classificado') {
      return '#9ca3af'; // Sempre cinza
    }
    const color = fallbackColors[fallbackIndex % fallbackColors.length];
    fallbackIndex++;
    return color;
  });


  // 3. Phase (Horizontal Bar)
  const phaseData = useMemo(() => {
    const agg: Record<string, number> = {};
    data.forEach(d => {
      // Normalize phase names
      let p = d.phase;
      if (p === 'Concluída') p = 'Concluída';
      else if (p.includes('Analisar Causa')) p = 'Analisar Causa';
      else if (p.includes('Gerenciar Plano')) p = 'Gerenciar Plano';
      else if (p.includes('Avaliar')) p = 'Avaliar Ocorrência';
      else if (p.includes('Ação Imediata')) p = 'Ação Imediata';
      agg[p] = (agg[p] || 0) + 1;
    });
    return Object.entries(agg)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => a.name === 'Concluída' ? -1 : 1); // Concluída usually on top or bottom. Let's sort by value.
  }, [data]);

  // 4. Units (Horizontal Bar)
  const unitData = useMemo(() => {
    const agg: Record<string, number> = {};
    data.forEach(d => {
      let u = d.unit.replace('Unidade ', '').replace('Sesi ', '');
      agg[u] = (agg[u] || 0) + 1;
    });
    return Object.entries(agg)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  // 5. Types (Horizontal Bar)
  const typeData = useMemo(() => {
    const agg: Record<string, number> = {};
    data.forEach(d => {
      let t = d.type;
      if (t.includes('Incidente/evento')) t = 'Incidente/evento';
      if (t.includes('Identificação Errada')) t = 'Ident. Errada';
      if (t.includes('Retificação')) t = 'Retif./troca laudos';
      if (t.includes('Atraso')) t = 'Atraso laudos';
      if (t.includes('Recoleta')) t = 'Recoleta exames';
      if (t.includes('Divergência')) t = 'Divergência dados';
      agg[t] = (agg[t] || 0) + 1;
    });
    return Object.entries(agg)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value); // Fixed: sorted descending by value
  }, [data]);

  // 6. Severity (Horizontal Bar)
  const severityData = useMemo(() => {
    const agg: Record<string, number> = {};
    data.forEach(d => {
      let s = d.severity.replace('Evento com ', '').replace(' (Saúde)', '');
      if (s === 'Leve') s = 'Leve'; // Keep as is
      agg[s] = (agg[s] || 0) + 1;
    });
    return Object.entries(agg)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value); // Descending
  }, [data]);

  // 7. Responsible (Stacked Horizontal Bar)
  const responsibleData = useMemo(() => {
    const agg: Record<string, { name: string, Concluídas: number, 'Em Andamento': number, total: number }> = {};
    data.forEach(d => {
      const r = d.responsible.split('.')[0] + '.' + (d.responsible.split('.')[1] || '');
      if (!agg[r]) agg[r] = { name: r, Concluídas: 0, 'Em Andamento': 0, total: 0 };

      if (d.status === 'Concluído') agg[r].Concluídas++;
      else agg[r]['Em Andamento']++;
      agg[r].total++;
    });
    return Object.values(agg).sort((a, b) => b.total - a.total).slice(0, 10);
  }, [data]);

  // 8. Process/Origem (Horizontal Bar)
  const processData = useMemo(() => {
    const agg: Record<string, number> = {};
    data.forEach(d => {
      // d.process agora contém a Origem (Monitoramento, Notif. Clínicas, etc.)
      let p = d.process;
      if (p.includes('Notif.')) p = 'Notif. Clínicas';
      else if (p.includes('Auditoria')) p = 'Auditoria Int.';
      else if (p.includes('SAC') || p.includes('Ouvidoria')) p = 'SAC/Ouvidoria';
      else if (p.includes('Feedback')) p = 'Feedback Clientes';
      else if (p.includes('Pesquisa')) p = 'Pesquisa Sat.';
      agg[p] = (agg[p] || 0) + 1;
    });
    return Object.entries(agg)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  return (
    <div className="space-y-6">

      {/* Row 1: Monthly Evolution */}
      <Card>
        <CardHeader>
          <ChartHeader icon={Calendar} title="Abertura de Ocorrências por Mês" />
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                <XAxis dataKey="name" stroke={chartColors.axis} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke={chartColors.axis} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: chartColors.cursor }} contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                <Bar dataKey="Concluído" stackId="a" fill={COLORS.success} radius={[0, 0, 0, 0]} />
                <Bar dataKey="Em Andamento" stackId="a" fill={COLORS.warning} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2 italic">Histórico de ocorrências de Nov/2022 a Dez/2025</p>
        </CardContent>
      </Card>

      {/* Row 2: OMS Type */}
      <Card>
        <CardHeader>
          <ChartHeader icon={FolderOpen} title="Tipo de Incidente - OMS por Mês" />
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={omsTimeData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                <XAxis dataKey="name" stroke={chartColors.axis} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke={chartColors.axis} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: chartColors.cursor }} contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                {omsKeysFromData.map((key, idx) => (
                  <Bar key={key} dataKey={key} stackId="a" fill={omsColors[idx]} radius={idx === omsKeysFromData.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2 italic">Classificação dos incidentes conforme padrão OMS</p>
        </CardContent>
      </Card>

      {/* Row 3: Phase & Units */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card>
          <CardHeader>
            <ChartHeader icon={RefreshCcw} title="Fase da Ocorrência" />
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={phaseData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={chartColors.grid} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke={chartColors.axis} tick={{ fontSize: 12 }} width={100} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: chartColors.cursor }} contentStyle={tooltipStyle} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                    {phaseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={
                        entry.name === 'Concluída' ? COLORS.success :
                          entry.name === 'Analisar Causa' ? COLORS.info :
                            entry.name === 'Ação Imediata' ? COLORS.warning : COLORS.chart3
                      } />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2 italic">Acompanhamento do fluxo de tratamento das ocorrências</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <ChartHeader icon={Building2} title="Unidades Notificadas" subtitle="Onde ocorreram as ocorrências" />
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={unitData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={chartColors.grid} />
                  <XAxis type="number" stroke={chartColors.axis} />
                  <YAxis dataKey="name" type="category" stroke={chartColors.axis} tick={{ fontSize: 12 }} width={120} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: chartColors.cursor }} contentStyle={tooltipStyle} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                    {unitData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={isDark ? (index === 0 ? '#3b82f6' : index === 1 ? '#60a5fa' : '#93c5fd') : (index === 0 ? '#004080' : index === 1 ? '#1e5aa0' : '#3b7ec0')} opacity={1 - (index * 0.15)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Row 4: Types (Full Width) */}
      <Card>
        <CardHeader>
          <ChartHeader icon={FolderOpen} title="Tipos de Ocorrência" subtitle={`${typeData.length} tipos identificados`} />
        </CardHeader>
        <CardContent>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={typeData}
                layout="vertical"
                margin={{ left: 20, right: 40, top: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={chartColors.grid} />
                <XAxis
                  type="number"
                  stroke={chartColors.axis}
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke={chartColors.axis}
                  tick={{ fontSize: 12, fontWeight: 500 }}
                  width={180}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value: number) => [`${value} ocorrências`, 'Quantidade']}
                  cursor={{ fill: chartColors.cursor }}
                />
                <Bar
                  dataKey="value"
                  radius={[0, 6, 6, 0]}
                  barSize={28}
                  label={{
                    position: 'right',
                    fill: isDark ? '#e2e8f0' : '#334155',
                    fontSize: 12,
                    fontWeight: 600
                  }}
                >
                  {typeData.map((entry, index) => {
                    // Paleta de cores vibrantes e profissionais
                    const colorPalette = [
                      '#3b82f6', // Blue - Incidente/evento
                      '#ef4444', // Red - Identificação Errada
                      '#10b981', // Emerald - Queda
                      '#f59e0b', // Amber - Cadastro
                      '#8b5cf6', // Violet - Divergência
                      '#ec4899', // Pink - Preparo medicamento
                      '#06b6d4', // Cyan - Recoleta
                      '#f97316', // Orange - Atraso
                      '#14b8a6', // Teal
                      '#6366f1', // Indigo
                      '#84cc16', // Lime
                      '#a855f7', // Purple
                      '#22c55e', // Green
                      '#0ea5e9', // Sky
                      '#d946ef', // Fuchsia
                    ];
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={colorPalette[index % colorPalette.length]}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3 italic">
            "Incidente/evento adverso" representa {typeData.length > 0 ? Math.round((typeData[0]?.value / data.length) * 100) : 0}% do total de ocorrências
          </p>
        </CardContent>
      </Card>

      {/* Row 5: Severity */}
      <Card>
        <CardHeader>
          <ChartHeader icon={AlertTriangle} title="Severidade/Gravidade" />
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke={chartColors.grid} />
                <XAxis type="number" stroke={chartColors.axis} />
                <YAxis dataKey="name" type="category" stroke={chartColors.axis} tick={{ fontSize: 12 }} width={120} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getSeverityColor(entry.name)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Row 6: Responsible & Process */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <ChartHeader icon={Users} title="Top Responsáveis" />
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responsibleData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={chartColors.grid} />
                  <XAxis type="number" stroke={chartColors.axis} />
                  <YAxis dataKey="name" type="category" stroke={chartColors.axis} tick={{ fontSize: 11 }} width={100} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: chartColors.cursor }} contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
                  <Bar dataKey="Concluídas" stackId="a" fill={COLORS.success} radius={[0, 0, 0, 0]} barSize={24} />
                  <Bar dataKey="Em Andamento" stackId="a" fill={COLORS.chart4} radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <ChartHeader icon={Activity} title="Origem das Ocorrências" />
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={chartColors.grid} />
                  <XAxis type="number" stroke={chartColors.axis} />
                  <YAxis dataKey="name" type="category" stroke={chartColors.axis} tick={{ fontSize: 11 }} width={130} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: chartColors.cursor }} contentStyle={tooltipStyle} />
                  <Bar dataKey="value" fill="#ff6f00" radius={[0, 4, 4, 0]} barSize={32}>
                    {processData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#ff6f00' : '#ff9e40'} fillOpacity={1 - (index * 0.1)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};