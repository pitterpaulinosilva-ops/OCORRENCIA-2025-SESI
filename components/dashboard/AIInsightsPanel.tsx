import React from 'react';
import { BrainCircuit, X, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface AIInsightsPanelProps {
  analysis: string | null;
  isLoading: boolean;
  error?: string | null;
  onClose: () => void;
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({
  analysis,
  isLoading,
  error,
  onClose,
}) => {
  if (!analysis && !isLoading && !error) {
    return null;
  }

  return (
    <Card className="overflow-hidden border-indigo-100 dark:border-indigo-900 shadow-lg shadow-indigo-100/50 dark:shadow-indigo-900/30 animate-in slide-in-from-top-4 duration-300">
      {/* Header with Gradient */}
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-700 dark:to-blue-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit size={24} className="text-white" />
            <h3 className="font-bold text-lg !text-white">Análise Inteligente</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="!text-white/90 hover:!text-white hover:bg-white/20"
          >
            <X size={20} />
          </Button>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-6 bg-indigo-50/30 dark:bg-indigo-950/30">
        {/* Loading State */}
        {isLoading && (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao gerar análise</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Analysis Content */}
        {analysis && !isLoading && !error && (
          <div className="prose prose-sm prose-indigo dark:prose-invert max-w-none">
            <div className="text-foreground whitespace-pre-line leading-relaxed">
              {analysis}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
