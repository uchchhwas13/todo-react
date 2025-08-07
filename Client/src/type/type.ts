export type TodoModel = {
  _id: string;
  text: string;
  isComplete: boolean;
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
};
export type AddTodoPayload = { text: string; isComplete: boolean };
