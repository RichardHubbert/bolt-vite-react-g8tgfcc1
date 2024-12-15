import { Save } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface SaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  saving?: boolean;
}

export function SaveButton({ saving, className, children, ...props }: SaveButtonProps) {
  return (
    <Button
      className={cn(
        'relative transition-all duration-200',
        saving && 'pl-8', // Extra padding when saving to accommodate the spinner
        className
      )}
      disabled={saving}
      {...props}
    >
      {saving && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
        </div>
      )}
      <Save className={cn(
        "w-4 h-4 transition-all duration-200",
        saving ? "mr-2 opacity-0" : "mr-2"
      )} />
      <span className={cn(
        "transition-all duration-200",
        saving && "opacity-70"
      )}>
        {saving ? 'Saving...' : children || 'Save'}
      </span>
    </Button>
  );
}