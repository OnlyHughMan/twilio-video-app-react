import React from 'react';
import { ModernRouterProvider } from './router';

export default function ModernApp() {
  return (
    <div className="h-full w-full bg-black text-white">
      <ModernRouterProvider />
    </div>
  );
}
