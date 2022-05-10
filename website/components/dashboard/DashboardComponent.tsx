import React from 'react';
import styles from '../../styles/dashboard/index.module.scss';
import { SideBar } from './SideBar';

type Props = {
  children?: React.ReactNode;
};

export const DashboardComponent: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <header className={styles.dashboard_header}></header>
      <main className={styles.container}>
        <SideBar />
        {children}
      </main>
    </div>
  );
};
