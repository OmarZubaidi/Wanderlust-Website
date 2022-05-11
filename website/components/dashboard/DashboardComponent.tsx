import React from 'react';
import styles from '../../styles/dashboard/index.module.scss';
import { Trip } from '../../types/trip.type';
import { SideBar } from './SideBar';

type Props = {
  children?: React.ReactNode;
  trips: Trip[];
};

export const DashboardComponent: React.FC<Props> = ({ children, trips }) => {
  return (
    <div>
      <header className={styles.dashboard_header}></header>
      <main className={styles.container}>
        <SideBar trips={trips} />
        {children}
      </main>
    </div>
  );
};
