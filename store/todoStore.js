import { create } from "zustand"
import { isAfter, startOfDay } from "date-fns"

// Define the todo status types
export const TODO_STATUS = {
  PLANNED: "planned",
  PENDING: "pending",
  DONE: "done",
  OVERDUE: "overdue",
}

/**
 * @typedef {Object} Todo
 * @property {string} id - Unique identifier
 * @property {string} title - Todo title
 * @property {string} [notes] - Optional notes
 * @property {string} [deadline] - Optional deadline date (ISO string)
 * @property {string} status - Todo status (one of TODO_STATUS)
 * @property {string} createdAt - Creation date (ISO string)
 */

/**
 * @typedef {Object} TodoInput
 * @property {string} title - Todo title
 * @property {string} [notes] - Optional notes
 * @property {string} [deadline] - Optional deadline date (ISO string)
 */

// Create the store with in-memory state
const useTodoStore = create((set, get) => ({
  /**
   * @type {Todo[]}
   */
  todos: [],

  // Initialize the store (no-op for in-memory state)
  initializeStore: () => {
    // This is a no-op for in-memory state
    // We could add some sample todos here if desired
    console.log("Todo store initialized")
  },

  // Add a new todo
  /**
   * @param {TodoInput} todo
   */
  addTodo: (todo) => {
    // Determine initial status based on deadline
    // If there's no deadline, it's PENDING
    // If there is a deadline, it's PLANNED
    const initialStatus = todo.deadline ? TODO_STATUS.PLANNED : TODO_STATUS.PENDING

    const newTodo = {
      id: Date.now().toString(),
      title: todo.title,
      notes: todo.notes || "",
      deadline: todo.deadline || null,
      status: initialStatus,
      createdAt: new Date().toISOString(),
    }

    set((state) => ({
      todos: [...state.todos, newTodo],
    }))
  },

  // Update an existing todo
  updateTodo: (id, updatedData) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id !== id) return todo

        // Determine if status should change based on deadline change
        let newStatus = todo.status

        // If deadline was added to a PENDING todo
        if (!todo.deadline && updatedData.deadline && todo.status === TODO_STATUS.PENDING) {
          newStatus = TODO_STATUS.PLANNED
        }
        // If deadline was removed from a PLANNED todo
        else if (
            todo.deadline &&
            !updatedData.deadline &&
            (todo.status === TODO_STATUS.PLANNED || todo.status === TODO_STATUS.OVERDUE)
        ) {
          newStatus = TODO_STATUS.PENDING
        }
        // If todo is DONE, keep it DONE regardless of deadline changes
        else if (todo.status === TODO_STATUS.DONE) {
          newStatus = TODO_STATUS.DONE
        }

        return {
          ...todo,
          title: updatedData.title || todo.title,
          notes: updatedData.notes !== undefined ? updatedData.notes : todo.notes,
          deadline: updatedData.deadline !== undefined ? updatedData.deadline : todo.deadline,
          status: newStatus,
        }
      })

      return { todos: updatedTodos }
    })

    // After updating, check if any todos are now overdue
    get().updateOverdueTodos()
  },

  // Toggle todo status (cycle through statuses)
  toggleTodoStatus: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id !== id) return todo

        // Determine the next status based on current status and deadline
        let nextStatus

        switch (todo.status) {
          case TODO_STATUS.PLANNED:
            nextStatus = TODO_STATUS.DONE
            break
          case TODO_STATUS.PENDING:
            nextStatus = TODO_STATUS.DONE
            break
          case TODO_STATUS.DONE:
            // If it has a deadline, go back to PLANNED
            // If it doesn't have a deadline, go back to PENDING
            nextStatus = todo.deadline ? TODO_STATUS.PLANNED : TODO_STATUS.PENDING
            break
          case TODO_STATUS.OVERDUE:
            nextStatus = TODO_STATUS.DONE
            break
          default:
            nextStatus = todo.deadline ? TODO_STATUS.PLANNED : TODO_STATUS.PENDING
        }

        return { ...todo, status: nextStatus }
      }),
    }))
  },

  // Delete a todo
  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }))
  },

  // Get a specific todo by ID
  getTodoById: (id) => {
    const state = get()
    return state.todos.find((todo) => todo.id === id) || null
  },

  // Update overdue todos
  updateOverdueTodos: () => {
    const today = startOfDay(new Date())

    set((state) => ({
      todos: state.todos.map((todo) => {
        // Skip if no deadline or already done
        if (!todo.deadline || todo.status === TODO_STATUS.DONE) {
          return todo
        }

        const deadlineDate = new Date(todo.deadline)

        // Check if deadline is before today
        if (isAfter(today, deadlineDate) && todo.status !== TODO_STATUS.OVERDUE) {
          return { ...todo, status: TODO_STATUS.OVERDUE }
        }

        return todo
      }),
    }))
  },

  // Recategorize todos based on deadline presence
  recategorizeTodos: () => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        // Skip if already done or overdue
        if (todo.status === TODO_STATUS.DONE || todo.status === TODO_STATUS.OVERDUE) {
          return todo
        }

        // If it has a deadline, it should be PLANNED
        // If it doesn't have a deadline, it should be PENDING
        const correctStatus = todo.deadline ? TODO_STATUS.PLANNED : TODO_STATUS.PENDING

        if (todo.status !== correctStatus) {
          return { ...todo, status: correctStatus }
        }

        return todo
      }),
    }))
  },
}))

export default useTodoStore

