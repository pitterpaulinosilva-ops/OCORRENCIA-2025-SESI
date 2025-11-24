import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'orange' | 'red';
  showProgress?: boolean;
  progressValue?: number;
}

const colorClasses = {
  blue: {
    border: 'border-t-[#004080]',
    icon: 'text-blue-600 bg-blue-50',
    text: 'text-blue-600',
  },
  green: {
    border: 'border-t-green-500',
    icon: 'text-green-600 bg-green-50',
    text: 'text-green-600',
  },
  orange: {
    border: 'border-t-orange-500',
    icon: 'text-orange-600 bg-orange-50',
    text: 'text-orange-600',
  },
  red: {
    border: 'border-t-red-500',
    icon: 'text-red-600 bg-red-50',
    text: 'text-red-600',
  },
};

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
  showProgress = false,
  progressValue = 0,
}) => {
  const colors = colorClasses[color];

  // Format number with thousand separators
  const formatNumber = (num: number | string): string => {
    if (typeof num === 'string') return num;
    return num.toLocaleString('pt-BR');
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-t-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
        colors.border
      )}
    >
      <CardContent className="p-6">
        {/* Icon */}
        <div className={cn(
          "inline-flex p-3 rounded-lg mb-4",
          colors.icon
        )}>
          <Icon size={24} />
        </div>

        {/* Value */}
        <div className="mb-2">
          <div className="text-4xl font-black text-slate-900">
            {formatNumber(value)}
          </div>
        </div>

        {/* Title */}
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          {title}
        </div>

        {/* Trend Indicator */}
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            {trend.isPositive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}

        {/* Progress Bar */}
        {showProgress && (
          <div className="mt-4">
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  color === 'blue' && "bg-[#004080]",
                  color === 'green' && "bg-green-500",
                  color === 'orange' && "bg-orange-500",
                  color === 'red' && "bg-red-500"
                )}
                style={{ width: `${Math.min(100, Math.max(0, progressValue))}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
