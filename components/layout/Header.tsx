import React from 'react';
import { Menu, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
  isMobile: boolean;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
  sidebarCollapsed?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  isMobile,
  onFileUpload,
  onExport,
  sidebarCollapsed = false,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <header className={cn(
      "sticky top-0 z-30 transition-all duration-300",
      "h-16 flex items-center justify-between",
      "border-b border-border/50",
      // Glassmorphism effect - modern frosted glass look
      "bg-background/80 backdrop-blur-xl backdrop-saturate-150",
      // Subtle gradient overlay
      "bg-gradient-to-r from-background/90 via-background/80 to-background/90",
      // Enhanced shadow for depth
      "shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
      // Dark mode adjustments
      "dark:bg-background/70 dark:border-border/30 dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)]",
      isMobile ? "px-4" : "px-6 md:px-8"
    )}>
      <div className="flex items-center gap-4">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Abrir menu de navegação"
          >
            <Menu size={20} />
          </Button>
        )}
        <h1 className={cn(
          "font-bold tracking-tight text-foreground",
          isMobile ? "text-sm" : "text-lg"
        )}>
          {isMobile ? (
            <span>Ocorrências <span className="text-primary">NSP</span></span>
          ) : (
            <span>Gestão de <span className="text-primary font-extrabold">Ocorrências</span> do NSP</span>
          )}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.csv"
          onChange={onFileUpload}
          className="hidden"
        />

        <ThemeToggle />

        <Button
          variant="outline"
          size={isMobile ? "icon" : "default"}
          onClick={handleUploadClick}
          className={cn(
            "border-slate-300 dark:border-slate-600",
            "bg-white dark:bg-slate-800",
            "text-slate-700 dark:text-slate-200",
            "hover:bg-slate-100 dark:hover:bg-slate-700",
            "hover:border-primary dark:hover:border-primary",
            "shadow-sm hover:shadow-md",
            "transition-all duration-200"
          )}
          aria-label="Importar arquivo CSV ou Excel"
        >
          <Upload size={16} className="text-primary" />
          {!isMobile && <span className="ml-2 font-medium">Importar</span>}
        </Button>

        <Button
          size={isMobile ? "icon" : "default"}
          onClick={onExport}
          className={cn(
            "bg-primary hover:bg-primary/90",
            "text-white font-medium",
            "shadow-md hover:shadow-lg",
            "transition-all duration-200"
          )}
          aria-label="Exportar dados para CSV"
        >
          <Download size={16} />
          {!isMobile && <span className="ml-2">Exportar</span>}
        </Button>
      </div>
    </header>
  );
};
