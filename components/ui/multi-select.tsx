import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiSelectProps {
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    className?: string;
    id?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
    options,
    selected,
    onChange,
    placeholder = "Selecione...",
    className,
    id,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Fechar ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (option: string) => {
        if (selected.includes(option)) {
            onChange(selected.filter(s => s !== option));
        } else {
            onChange([...selected, option]);
        }
    };

    const handleSelectAll = () => {
        if (selected.length === options.length) {
            onChange([]);
        } else {
            onChange([...options]);
        }
    };

    const displayText = () => {
        if (selected.length === 0) return placeholder;
        if (selected.length === 1) return selected[0];
        if (selected.length === options.length) return "Todos";
        return `${selected.length} selecionados`;
    };

    const isSelected = (option: string) => selected.includes(option);
    const isAllSelected = selected.length === options.length;

    return (
        <div ref={containerRef} className={cn("relative", className)}>
            {/* Trigger Button */}
            <button
                id={id}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border",
                    "bg-background px-3 py-2 text-sm",
                    "border-input ring-offset-background",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "hover:bg-accent/50 transition-colors"
                )}
            >
                <span className={cn(
                    "truncate",
                    selected.length === 0 && "text-muted-foreground"
                )}>
                    {displayText()}
                </span>
                <ChevronDown className={cn(
                    "h-4 w-4 opacity-50 transition-transform",
                    isOpen && "rotate-180"
                )} />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="absolute z-50 mt-1 w-full rounded-md border shadow-lg max-h-60 overflow-auto"
                    style={{
                        backgroundColor: '#ffffff',
                        borderColor: '#e2e8f0'
                    }}
                >
                    {/* Select All Option */}
                    <button
                        type="button"
                        onClick={handleSelectAll}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium hover:bg-slate-50 border-b border-slate-200"
                        style={{ backgroundColor: '#ffffff' }}
                    >
                        <div
                            className="flex h-5 w-5 items-center justify-center rounded border-2 transition-all"
                            style={{
                                backgroundColor: isAllSelected ? '#2563eb' : '#ffffff',
                                borderColor: isAllSelected ? '#2563eb' : '#cbd5e1',
                            }}
                        >
                            {isAllSelected && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                        </div>
                        <span className="text-slate-700">Selecionar Todos</span>
                    </button>

                    {/* Options */}
                    {options.map((option) => {
                        const checked = isSelected(option);
                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => toggleOption(option)}
                                className="flex w-full items-center gap-3 px-3 py-2.5 text-sm hover:bg-slate-50 transition-colors"
                                style={{ backgroundColor: '#ffffff' }}
                            >
                                <div
                                    className="flex h-5 w-5 items-center justify-center rounded border-2 transition-all"
                                    style={{
                                        backgroundColor: checked ? '#2563eb' : '#ffffff',
                                        borderColor: checked ? '#2563eb' : '#cbd5e1',
                                    }}
                                >
                                    {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                                </div>
                                <span className="truncate text-slate-700">{option}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
