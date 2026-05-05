'use client'
import { cn } from '@/lib/utils';
import { LucideIcon, Undo2 } from 'lucide-react';

interface ToolBarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolBarButton = ({ onClick, isActive, icon: Icon }: ToolBarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export default function Toolbar() {
  const sections: { icon: LucideIcon; label: string; isActive: boolean; onClick: () => void }[][] =
    [
      [
        {
          label: 'Undo',
          icon: Undo2,
          isActive: false,
          onClick: () => {
            console.log('Undo');
          },
        },
      ],
    ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-10 flex items-center gap-x-0.5 overflow-x-auto ">
      {sections[0].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
    </div>
  );
}
