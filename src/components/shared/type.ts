import { Dispatch, ReactNode, SetStateAction } from 'react';

export type TSelectProps = {
  options: { id: string; label: string; value: string }[];
  placeholder: string;
  className?: string;
  formField: {
    value: string | undefined;
    onChange: (value: string) => void;
    ref: any;
  };
};
export type SheetProps = {
  children: ReactNode;
  side: 'top' | 'bottom' | 'left' | 'right';
  trigger: any;
  className?: string;
  triggerClass?: string;
  label?: string;
  title?: string;
  description?: string;
  onClick?: () => void;
  open?: boolean;
  onChange?: Dispatch<SetStateAction<boolean>>;
};
export type TModalProps = {
  trigger: ReactNode;
  children: ReactNode;
  title: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export type TFileUploadProps = {
  formField: {
    value: File[] | undefined | string | string[];
    onChange: (files: File[]) => void;
  };
  maxFiles?: number;
  multiple?: boolean;
  showGrid?: boolean;
};
