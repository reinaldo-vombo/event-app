import { ReactNode } from 'react';

export type TSelectProps = {
  options: { id: string; label: string; value: string }[];
  placeholder: string;
  className?: string;
  formField: {
    value: string;
    onChange: (value: string) => void;
    ref: any;
  };
};
export type TModalProps = {
  trigger: ReactNode;
  children: ReactNode;
  title: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};
