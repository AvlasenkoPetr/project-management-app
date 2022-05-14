export type GetUserByIdResponseType = {
  id: string;
  name: string;
  login: string;
};

export type UpdateUserByIdResponseType = {
  id: string;
  name: string;
  login: string;
};

export type UpdateUserByIdRequestType = {
  id: string;
  body: {
    name: string;
    login: string;
    password: string;
  };
};

export type SignInResponseType = {
  token: string;
};

export type SignInRequestType = {
  login: string;
  password: string;
};

export type SignUpResponseType = {
  name: string;
  login: string;
  id: string;
};
export type SignUpRequestType = {
  name: string;
  login: string;
  password: string;
};

export type BoardType = {
  id: string;
  title: string;
  description: string;
};

export type GetBoardByIdType = {
  id: string;
  title: string;
  columns: GetColumnByIdType[];
};

export type GetColumnByIdType = {
  id: string;
  title: string;
  order: number;
  tasks: TaskType[];
};

export type ColumnType = {
  id: string;
  title: string;
  order: number;
};

export type TaskType = {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: {
    filename: string;
    fileSize: number;
  }[];
};

export type CreateNewTaskRequestType = {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
  };
};

export type TaskResponseType = {
  boardId: string;
  columnId: string;
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
};

export type UpdateTaskRequestType = {
  boardId: string;
  columnId: string;
  taskId: string;
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
  };
};
