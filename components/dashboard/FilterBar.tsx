import React from 'react';
import { Calendar, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FilterState {
  unit: string;
  severity: string;
  startDate: string;
  endDate: string;
}

interface FilterBarProps {
  units: string[];
  severities: string[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultCount: number;
  isMobile?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  units,
  severities,
  filters,
  onFilterChange,
  resultCount,
  isMobile = false,
}) => {
  const hasActiveFilters =
    filters.unit !== 'all' ||
    filters.severity !== 'all' ||
    filters.startDate ||
    filters.endDate;

  const activeFilterCount = [
    filters.unit !== 'all',
    filters.severity !== 'all',
    filters.startDate,
    filters.endDate,
  ].filter(Boolean).length;

  const handleClearFilters = () => {
    onFilterChange({
      unit: 'all',
      severity: 'all',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <Card className="p-5 shadow-sm border-slate-100">
      <div className={cn(
        "flex flex-wrap gap-4 items-end",
        isMobile && "flex-col items-stretch"
      )}>
        {/* Filter Label */}
        <div className="flex items-center gap-2 text-slate-500">
          <span className="text-sm font-bold uppercase tracking-wide">Filtros</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
          <div className="h-4 w-px bg-slate-200 mx-2" />
        </div>

        {/* Unit Filter */}
        <div className={cn("flex-1 min-w-[200px]", isMobile && "w-full")}>
          <Label htmlFor="unit-filter" className="text-xs font-medium text-slate-400 mb-1 block">
            Unidade
          </Label>
          <Select
            value={filters.unit}
            onValueChange={(value) => onFilterChange({ ...filters, unit: value })}
          >
            <SelectTrigger id="unit-filter" className="bg-white border-slate-200">
              <SelectValue placeholder="Todas Unidades" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">Todas Unidades</SelectItem>
              {units.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Severity Filter */}
        <div className={cn("flex-1 min-w-[200px]", isMobile && "w-full")}>
          <Label htmlFor="severity-filter" className="text-xs font-medium text-slate-400 mb-1 block">
            Severidade
          </Label>
          <Select
            value={filters.severity}
            onValueChange={(value) => onFilterChange({ ...filters, severity: value })}
          >
            <SelectTrigger id="severity-filter" className="bg-white border-slate-200">
              <SelectValue placeholder="Todas Classificações" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">Todas Classificações</SelectItem>
              {severities.map((severity) => (
                <SelectItem key={severity} value={severity}>
                  {severity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Start Date */}
        <div className={cn("flex-1 min-w-[140px]", isMobile && "w-full")}>
          <Label htmlFor="start-date" className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
            <Calendar size={12} /> Data Inicial
          </Label>
          <input
            id="start-date"
            type="date"
            value={filters.startDate}
            onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value })}
            className="w-full h-10 bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* End Date */}
        <div className={cn("flex-1 min-w-[140px]", isMobile && "w-full")}>
          <Label htmlFor="end-date" className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
            <Calendar size={12} /> Data Final
          </Label>
          <input
            id="end-date"
            type="date"
            value={filters.endDate}
            onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value })}
            className="w-full h-10 bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="default"
            onClick={handleClearFilters}
            className="border-slate-200 hover:bg-slate-100"
          >
            <X size={16} />
            <span className="ml-2">Limpar Filtros</span>
          </Button>
        )}

        {/* Result Count */}
        <div className={cn(
          "flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-full border border-slate-200",
          isMobile ? "w-full justify-center" : "ml-auto"
        )}>
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-semibold text-slate-600">
            {resultCount} {resultCount === 1 ? 'registro' : 'registros'}
          </span>
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
          {filters.unit !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Unidade: {filters.unit}
              <button
                onClick={() => onFilterChange({ ...filters, unit: 'all' })}
                className="ml-1 hover:bg-slate-300 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </Badge>
          )}
          {filters.severity !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Severidade: {filters.severity}
              <button
                onClick={() => onFilterChange({ ...filters, severity: 'all' })}
                className="ml-1 hover:bg-slate-300 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </Badge>
          )}
          {filters.startDate && (
            <Badge variant="secondary" className="gap-1">
              De: {new Date(filters.startDate).toLocaleDateString('pt-BR')}
              <button
                onClick={() => onFilterChange({ ...filters, startDate: '' })}
                className="ml-1 hover:bg-slate-300 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </Badge>
          )}
          {filters.endDate && (
            <Badge variant="secondary" className="gap-1">
              Até: {new Date(filters.endDate).toLocaleDateString('pt-BR')}
              <button
                onClick={() => onFilterChange({ ...filters, endDate: '' })}
                className="ml-1 hover:bg-slate-300 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </Badge>
          )}
        </div>
      )}
    </Card>
  );
};
