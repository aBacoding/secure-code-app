import * as React from 'react';
import { type JSX, Fragment } from 'react';
import { cn } from '@/shared/libs/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

function Input({ className, type, ...props }: React.ComponentProps<'input'>): JSX.Element {
  const [inputType, setInputType] = React.useState<string>(type ?? 'text');

  return (
    <div className="relative">
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
      <button
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 flex size-3.5 items-center justify-center"
        onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}
      >
        {type === 'password' && (
          <Fragment>
            {inputType === 'password' && <EyeIcon size={16} className="flex-shrink-0 cursor-pointer" />}
            {inputType === 'text' && <EyeOffIcon size={16} className="flex-shrink-0 cursor-pointer" />}
          </Fragment>
        )}
      </button>
    </div>
  );
}

export { Input };
