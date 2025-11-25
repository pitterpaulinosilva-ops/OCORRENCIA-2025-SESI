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
      "sticky top-0 z-30 bg-background border-b border-border shadow-sm transition-all duration-300",
      "h-16 flex items-center justify-between",
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
          "font-bold text-foreground tracking-tight",
          isMobile ? "text-sm" : "text-lg"
        )}>
          {isMobile ? "Ocorrências NSP" : "Gestão de Ocorrências do NSP"}
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
          className="border-border hover:bg-accent"
          aria-label="Importar arquivo CSV ou Excel"
        >
          <Upload size={16} className="text-primary" />
          {!isMobile && <span className="ml-2">Importar CSV/Excel</span>}
        </Button>

        <Button
          size={isMobile ? "icon" : "default"}
          onClick={onExport}
          className="bg-primary hover:bg-primary/90 shadow-md"
          aria-label="Exportar dados para CSV"
        >
          <Download size={16} />
          {!isMobile && <span className="ml-2">Exportar</span>}
        </Button>
      </div>
    </header>
  );
};
