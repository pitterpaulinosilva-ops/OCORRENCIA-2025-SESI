import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '../../hooks/use-theme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  showTooltip?: boolean;
  iconOnly?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className,
  showTooltip = true,
  iconOnly = true
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "min-w-[44px] min-h-[44px] relative",
        "hover:bg-accent hover:text-accent-foreground",
        "transition-all duration-200",
        className
      )}
      title={showTooltip ? (isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro') : undefined}
      aria-label={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
    >
      <Sun 
        className={cn(
          "h-5 w-5 transition-all duration-300",
          isDark ? "rotate-0 scale-100" : "rotate-90 scale-0 absolute"
        )} 
      />
      <Moon 
        className={cn(
          "h-5 w-5 transition-all duration-300",
          isDark ? "rotate-90 scale-0 absolute" : "rotate-0 scale-100"
        )} 
      />
      {!iconOnly && (
        <span className="ml-2 hidden sm:inline">
          {isDark ? 'Claro' : 'Escuro'}
        </span>
      )}
    </Button>
  );
};
