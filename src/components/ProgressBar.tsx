import React from 'react';
import type { ProgressBarProps } from '../types';

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{
          width: `${progress}%`
        }}
      />
    </div>
  );
};