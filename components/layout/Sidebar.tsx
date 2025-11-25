import React from 'react';
import { 
  BarChart3, 
  FileText, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  isMobile: boolean;
  onToggle: () => void;
  onToggleCollapse: () => void;
  onClose: () => void;
  onGenerateAnalysis?: () => void;
  analyzing?: boolean;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: BarChart3, label: 'Dashboard', active: true },
  { icon: FileText, label: 'Relatórios' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isCollapsed,
  isMobile,
  onToggle,
  onToggleCollapse,
  onClose,
  onGenerateAnalysis,
  analyzing = false,
}) => {
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between p-6 border-b border-slate-700/50",
        isCollapsed && !isMobile && "justify-center p-4"
      )}>
        {(!isCollapsed || isMobile) && (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <Activity className="text-white" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight">Painel Sesi</span>
              <span className="text-xs text-slate-400">Gestão de Ocorrências</span>
            </div>
          </div>
        )}
        {isCollapsed && !isMobile && (
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
            <Activity className="text-white" size={20} />
          </div>
        )}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="text-slate-400 hover:text-white hover:bg-slate-800 -mr-2"
            aria-label={isCollapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2" role="navigation" aria-label="Menu principal">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                item.active
                  ? "bg-blue-900/30 border border-blue-900/50 text-blue-400 font-medium"
                  : "text-slate-400 hover:text-white hover:bg-slate-800",
                isCollapsed && !isMobile && "justify-center px-2"
              )}
              aria-label={item.label}
              aria-current={item.active ? "page" : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              {(!isCollapsed || isMobile) && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* AI Analysis Card */}
      <div className={cn(
        "p-6 bg-slate-950/50",
        isCollapsed && !isMobile && "p-4"
      )}>
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-xl p-5 shadow-xl">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-500/20 rounded-full blur-xl" />
          
          <div className="relative">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-white/20 backdrop-blur-sm">
              <Sparkles className="text-white" size={isCollapsed && !isMobile ? 20 : 24} />
            </div>
            
            {(!isCollapsed || isMobile) && (
              <>
                <h3 className="text-sm font-bold text-white mb-1 text-center">
                  Análise com IA
                </h3>
                <p className="text-xs text-blue-100/80 mb-4 text-center leading-relaxed">
                  Insights inteligentes sobre suas ocorrências
                </p>
                <Button
                  onClick={onGenerateAnalysis}
                  disabled={analyzing}
                  className="w-full bg-white text-indigo-700 hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl transition-all"
                  size="sm"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={16} />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" size={16} />
                      Gerar Insights
                    </>
                  )}
                </Button>
              </>
            )}
            {isCollapsed && !isMobile && (
              <Button
                onClick={onGenerateAnalysis}
                disabled={analyzing}
                variant="ghost"
                size="icon"
                className="w-full text-white hover:bg-white/20"
                title="Gerar Insights com IA"
              >
                {analyzing ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile: render as Sheet (overlay)
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetContent side="left" className="w-64 p-0 bg-slate-900 text-white border-slate-800">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: render as fixed sidebar
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-slate-900 text-white shadow-xl transition-all duration-300 ease-in-out z-40",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {sidebarContent}
    </aside>
  );
};
