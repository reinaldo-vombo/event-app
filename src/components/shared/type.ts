export type TSelectProps = {
  options: { id: number; label: string; value: string }[];
  placeholder: string;
  className?: string;
  formField: {
    value: string;
    onChange: (value: string) => void;
    ref: any;
  };
};
