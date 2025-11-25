import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
  onGenerateAnalysis?: () => void;
  analyzing?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  onFileUpload,
  onExport,
  onGenerateAnalysis,
  analyzing = false,
}) => {
  const { isMobile, isTablet, isDesktop } = useMobile();
  const { isOpen, isCollapsed, toggle, toggleCollapse, close } = useSidebar();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        onToggle={toggle}
        onToggleCollapse={toggleCollapse}
        onClose={close}
        onGenerateAnalysis={onGenerateAnalysis}
        analyzing={analyzing}
      />

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          !isMobile && (isCollapsed ? "ml-16" : "ml-64")
        )}
      >
        {/* Header */}
        <Header
          onMenuClick={toggle}
          isMobile={isMobile}
          onFileUpload={onFileUpload}
          onExport={onExport}
          sidebarCollapsed={isCollapsed}
        />

        {/* Main Content */}
        <main id="main-content" className="flex-1 overflow-y-auto custom-scrollbar" role="main" aria-label="Conteúdo principal">
          {children}
        </main>
      </div>
    </div>
  );
};
