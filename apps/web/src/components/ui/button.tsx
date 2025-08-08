import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: ' justify-center bg-primary text-primary-foreground hover:bg-primary/90',
                highlighted:
                    ' justify-center bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary/40 shadow-md hover:bg-primary/80',
                destructive:
                    ' justify-center bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    ' justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary:
                    ' justify-center bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: ' justify-center hover:bg-accent hover:text-accent-foreground',
                link: ' justify-center text-primary underline-offset-4 hover:underline',
                location:
                    ' justify-center flex gap-2 px-4 py-2 rounded-lg bg-blue-800 text-white text-sm font-medium shadow hover:bg-blue-500 transition-colors border border-teal-700',
                wide_blue:
                    ' justify-center w-full bg-blue-600 text-white text-left font-semibold py-4 px-6 rounded-md hover:bg-blue-700 transition disabled:opacity-50 text-lg',
                confirmed_step:
                    'w-full bg-gray-100 text-gray-800 font-medium py-4 px-6 rounded-md border border-gray-300 hover:bg-gray-200 flex items-center justify-between text-sm',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-13 rounded-md px-6',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
