import React from 'react';
import { Calendar, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FilterState } from '@/types';

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
    filters.units.length > 0 ||
    filters.severities.length > 0 ||
    filters.startDate ||
    filters.endDate;

  const activeFilterCount = [
    filters.units.length > 0,
    filters.severities.length > 0,
    filters.startDate,
    filters.endDate,
  ].filter(Boolean).length;

  const handleClearFilters = () => {
    onFilterChange({
      units: [],
      severities: [],
      startDate: '',
      endDate: '',
    });
  };

  const removeUnit = (unit: string) => {
    onFilterChange({
      ...filters,
      units: filters.units.filter(u => u !== unit),
    });
  };

  const removeSeverity = (severity: string) => {
    onFilterChange({
      ...filters,
      severities: filters.severities.filter(s => s !== severity),
    });
  };

  return (
    <Card className="p-5 shadow-sm border-border">
      <div className={cn(
        "flex flex-wrap gap-4 items-end",
        isMobile && "flex-col items-stretch"
      )}>
        {/* Filter Label */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-sm font-bold uppercase tracking-wide">Filtros</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
          <div className="h-4 w-px bg-border mx-2" />
        </div>

        {/* Unit Filter - Multi Select */}
        <div className={cn("flex-1 min-w-[200px]", isMobile && "w-full")}>
          <Label htmlFor="unit-filter" className="text-xs font-medium text-muted-foreground mb-1 block">
            Unidade
          </Label>
          <MultiSelect
            id="unit-filter"
            options={units}
            selected={filters.units}
            onChange={(selected) => onFilterChange({ ...filters, units: selected })}
            placeholder="Todas Unidades"
          />
        </div>

        {/* Severity Filter - Multi Select */}
        <div className={cn("flex-1 min-w-[200px]", isMobile && "w-full")}>
          <Label htmlFor="severity-filter" className="text-xs font-medium text-muted-foreground mb-1 block">
            Severidade
          </Label>
          <MultiSelect
            id="severity-filter"
            options={severities}
            selected={filters.severities}
            onChange={(selected) => onFilterChange({ ...filters, severities: selected })}
            placeholder="Todas Classificações"
          />
        </div>

        {/* Start Date */}
        <div className={cn("flex-1 min-w-[140px]", isMobile && "w-full")}>
          <Label htmlFor="start-date" className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
            <Calendar size={12} /> Data Inicial
          </Label>
          <input
            id="start-date"
            type="date"
            value={filters.startDate}
            onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value })}
            className="w-full h-10 bg-background border border-border text-foreground text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
          />
        </div>

        {/* End Date */}
        <div className={cn("flex-1 min-w-[140px]", isMobile && "w-full")}>
          <Label htmlFor="end-date" className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
            <Calendar size={12} /> Data Final
          </Label>
          <input
            id="end-date"
            type="date"
            value={filters.endDate}
            onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value })}
            className="w-full h-10 bg-background border border-border text-foreground text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
          />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="default"
            onClick={handleClearFilters}
            className="border-border hover:bg-accent"
          >
            <X size={16} />
            <span className="ml-2">Limpar Filtros</span>
          </Button>
        )}

        {/* Result Count */}
        <div className={cn(
          "flex items-center gap-2 bg-muted px-3 py-2 rounded-full border border-border",
          isMobile ? "w-full justify-center" : "ml-auto"
        )}>
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-semibold text-muted-foreground">
            {resultCount} {resultCount === 1 ? 'registro' : 'registros'}
          </span>
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {/* Unit Badges */}
          {filters.units.map((unit) => (
            <Badge key={`unit-${unit}`} variant="secondary" className="gap-1">
              Unidade: {unit}
              <button
                onClick={() => removeUnit(unit)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </Badge>
          ))}

          {/* Severity Badges */}
          {filters.severities.map((severity) => (
            <Badge key={`severity-${severity}`} variant="secondary" className="gap-1">
              Severidade: {severity}
              <button
                onClick={() => removeSeverity(severity)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </Badge>
          ))}

          {/* Date Badges */}
          {filters.startDate && (
            <Badge variant="secondary" className="gap-1">
              De: {new Date(filters.startDate).toLocaleDateString('pt-BR')}
              <button
                onClick={() => onFilterChange({ ...filters, startDate: '' })}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
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
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
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
