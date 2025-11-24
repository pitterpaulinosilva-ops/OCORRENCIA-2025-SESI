import { useEffect, useState } from 'react';

const SIDEBAR_STATE_KEY = 'sidebar-state';
const SIDEBAR_COLLAPSED_KEY = 'sidebar-collapsed';

export interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
  toggle: () => void;
  toggleCollapse: () => void;
  open: () => void;
  close: () => void;
}

export function useSidebar(): SidebarState {
  // Initialize from localStorage or defaults
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem(SIDEBAR_STATE_KEY);
    return stored ? JSON.parse(stored) : false;
  });

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    return stored ? JSON.parse(stored) : false;
  });

  // Persist isOpen to localStorage
  useEffect(() => {
    localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(isOpen));
  }, [isOpen]);

  // Persist isCollapsed to localStorage
  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggle = () => setIsOpen(prev => !prev);
  const toggleCollapse = () => setIsCollapsed(prev => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    isCollapsed,
    toggle,
    toggleCollapse,
    open,
    close,
  };
}
