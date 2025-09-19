import { cn } from '@/lib/cn';

interface Props { style?: 'wave' | 'angle' | 'curve'; className?: string; invert?: boolean; }

export default function SectionSeparator({ style='wave', className, invert }: Props){
  const common = 'w-full h-auto block';
  if(style==='angle') return (
    <svg className={cn(common,className)} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 120L1440 0V120H0Z" fill={invert?"#000":"#fff"} /></svg>
  );
  if(style==='curve') return (
    <svg className={cn(common,className)} viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0C360 120 1080 120 1440 0V160H0V0Z" fill={invert?"#000":"#fff"} /></svg>
  );
  return (
    <svg className={cn(common,className)} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 80C240 140 480 20 720 60C960 100 1200 20 1440 80V120H0V80Z" fill={invert?"#000":"#fff"} /></svg>
  );
}
