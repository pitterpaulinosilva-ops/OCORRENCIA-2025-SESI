import React from 'react';
import { LayoutDashboard, FileSpreadsheet, BrainCircuit, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
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
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FileSpreadsheet, label: 'Relatórios' },
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
        "flex items-center justify-between p-6 border-b border-slate-800",
        isCollapsed && !isMobile && "justify-center p-4"
      )}>
        {(!isCollapsed || isMobile) && (
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <LayoutDashboard className="text-blue-500" size={24} />
            <span>Painel Sesi</span>
          </div>
        )}
        {isCollapsed && !isMobile && (
          <LayoutDashboard className="text-blue-500" size={24} />
        )}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="text-white hover:bg-slate-800"
            aria-label={isCollapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
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
        "p-6 bg-slate-950",
        isCollapsed && !isMobile && "p-4"
      )}>
        <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-xl p-5 text-center shadow-lg">
          <BrainCircuit className="mx-auto mb-3 text-white/90" size={isCollapsed && !isMobile ? 24 : 28} />
          {(!isCollapsed || isMobile) && (
            <>
              <p className="text-xs text-blue-100 mb-4 font-medium leading-relaxed">
                IA Analysis Engine<br />Ativado
              </p>
              <Button
                onClick={onGenerateAnalysis}
                disabled={analyzing}
                className="w-full bg-white text-blue-900 hover:bg-blue-50 font-bold shadow-md"
                size="sm"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Gerando...
                  </>
                ) : (
                  'Gerar Insights'
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
              className="w-full text-white hover:bg-blue-600/20"
            >
              {analyzing ? <Loader2 className="animate-spin" size={16} /> : <BrainCircuit size={16} />}
            </Button>
          )}
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
