import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TodoItem {
    id: number;
    userId: number;
    title: string;
    completed: boolean
}
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodoList: builder.query<TodoItem[], void>({
            query: () => '/todos',
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation<TodoItem, Omit<TodoItem, "id">>({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation<void, TodoItem>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodod: builder.mutation<void, { id: number }>({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        })
    })
})

export const {
    useGetTodoListQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTododMutation
} = apiSlice;