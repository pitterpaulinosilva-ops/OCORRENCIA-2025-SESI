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
    <Card className="overflow-hidden border-border shadow-lg animate-in slide-in-from-top-4 duration-300">
      {/* Header */}
      <CardHeader className="bg-muted/50 border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600">
              <BrainCircuit size={20} className="text-white" />
            </div>
            <h3 className="font-bold text-lg text-foreground">Análise Inteligente</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </Button>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-6">
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
