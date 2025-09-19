import React from 'react';

interface Props { style?: 'wave' | 'angle' | 'curve'; className?: string; invert?: boolean; }

export default function SectionSeparator({ style='wave', className='', invert }: Props){
  const common = 'w-full h-auto block';
  const fill = invert ? '#000' : '#f8f8f4';
  if(style==='angle') return (
    <svg className={common+" "+className} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 120L1440 0V120H0Z" fill={fill} /></svg>
  );
  if(style==='curve') return (
    <svg className={common+" "+className} viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0C360 120 1080 120 1440 0V160H0V0Z" fill={fill} /></svg>
  );
  return (
    <svg className={common+" "+className} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 80C240 140 480 20 720 60C960 100 1200 20 1440 80V120H0V80Z" fill={fill} /></svg>
  );
}
