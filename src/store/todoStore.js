import axios from "axios";
import { create } from "zustand";

const fetchTodo = async (set) => {
    set((state) => ({
        ...state,
        loading: true,
    }))
    try {
        const res = await axios.get("http://localhost:3000/data")
        const data = await res.data
        set((state) => ({
            ...state,
            loading: false,
            error: "",
            todo: data,
        }))
    } catch (err) {
        set((state) => ({
            ...state,
            loading: false,
            error: err.message,
            todo: [],
        }))
    }
}
const addTodo = async (set, task) => {
    set((state) => ({
        ...state,
        loading: true,
    }))
    try {
        const res = await axios.post("http://localhost:3000/data", task)
        const data = await res.data
        set((state) => ({
            ...state,
            loading: false,
            error: "",
            todo: [...state.todo, data],
        }))
    } catch (err) {
        set((state) => ({
            ...state,
            loading: false,
            error: err.message,
        }))
    }
}

const deleteTodo = async (set, id) => {
    set((state) => ({
        ...state,
        loading: true,
    }))
    try {
        const res = await axios.delete(`http://localhost:3000/data/${id}`)
        const data = await res.data
        set((state) => ({
            ...state,
            loading: false,
            error: "",
            todo: state.todo.filter(todo => todo.id !== data.id),
        }))
    } catch (err) {
        set((state) => ({
            ...state,
            loading: false,
            error: err.message,
        }))
    }
}

const editTodo = async (set, id, bool) => {
    try {
        const res = await axios.patch(`http://localhost:3000/data/${id}`, { completed: bool })
        const data = await res.data
        set((state) => ({
            ...state,
            loading: false,
            error: "",
            todo: state.todo.map(todo => todo.id == data.id ? data : todo),
        }))
    } catch (err) {
        set((state) => ({
            ...state,
            loading: false,
            error: err.message,
        }))
    }
}

const todoStore = (set) => ({
    loading: false,
    error: "",
    todo: [],
    fetchTodo: () => fetchTodo(set),
    addTodo: (task) => addTodo(set, task),
    deleteTodo: (id) => deleteTodo(set, id),
    editTodo: (id, bool) => editTodo(set, id, bool)
})

export const useTodoStore = create(todoStore)