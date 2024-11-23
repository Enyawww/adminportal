import React from 'react';
import { TopBar } from './TopBar';
import { Grid } from './Grid';
import { Analysis } from './Analysis';

export const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar/>
      <Analysis/>
      <Grid/>      
    </div>
  );
};
