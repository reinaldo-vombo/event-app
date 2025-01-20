export type TLayout = {
  children: React.ReactNode;
};
export type TState = {
  message: string;
  error?: boolean;
  status: number;
  success?: boolean;
  fields?: Record<string, string>;
  issues?: string[];
};
