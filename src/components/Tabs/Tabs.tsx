import type { ReactNode } from 'react';
import styles from './Tabs.module.scss';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

/**
 * Componente Tabs
 * 
 * Sistema de pestañas reutilizable. Estilo "pills" con animación.
 */
const Tabs = ({ tabs, activeTab, onChange }: TabsProps) => {
  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map(tab => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          className={`${styles.tabs__btn} ${activeTab === tab.id ? styles['tabs__btn--active'] : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon && <span className={styles.tabs__icon}>{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;