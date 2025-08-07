export type Todo = {
  id: string;
  text: string;
  isComplete: boolean;
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
};
