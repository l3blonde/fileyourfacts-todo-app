"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { Feather } from "@expo/vector-icons"
import useTodoStore, { TODO_STATUS, type Todo } from "../../store/todoStore"
import TodoItem from "../../components/TodoItem"
import FilterButton from "../../components/FilterButton"
import { colors, typography, borders, shadows } from "@/theme/styles"
import { isToday, isTomorrow, isThisMonth, parseISO, format } from "date-fns"

const FILTER_TYPES = {
    ALL: "all",
    TODAY: "today",
    TOMORROW: "tomorrow",
    THIS_MONTH: "this_month",
    PLANNED: TODO_STATUS.PLANNED,
    PENDING: TODO_STATUS.PENDING,
    DONE: TODO_STATUS.DONE,
    OVERDUE: TODO_STATUS.OVERDUE,
}

export default function OverviewScreen() {
    const [filter, setFilter] = useState(FILTER_TYPES.ALL)
    const todos = useTodoStore((state) => state.todos)
    const toggleTodoStatus = useTodoStore((state) => state.toggleTodoStatus)
    const deleteTodo = useTodoStore((state) => state.deleteTodo)

    const currentDate = new Date()
    const formattedDate = format(currentDate, "EEEE, MMMM d, yyyy")

    const filteredTodos = todos.filter((todo: Todo) => {
        if (filter === FILTER_TYPES.ALL) return true
        if (filter === FILTER_TYPES.PLANNED) return todo.status === FILTER_TYPES.PLANNED
        if (filter === FILTER_TYPES.PENDING) return todo.status === FILTER_TYPES.PENDING
        if (filter === FILTER_TYPES.DONE) return todo.status === FILTER_TYPES.DONE
        if (filter === FILTER_TYPES.OVERDUE) return todo.status === FILTER_TYPES.OVERDUE
        if (!todo.deadline) return false

        const deadlineDate = parseISO(todo.deadline)

        if (filter === FILTER_TYPES.TODAY) return isToday(deadlineDate)
        if (filter === FILTER_TYPES.TOMORROW) return isTomorrow(deadlineDate)
        if (filter === FILTER_TYPES.THIS_MONTH) return isThisMonth(deadlineDate)

        return false
    })

    const counts = {
        [FILTER_TYPES.ALL]: todos.length,
        [FILTER_TYPES.TODAY]: todos.filter((todo: Todo) => todo.deadline && isToday(parseISO(todo.deadline))).length,
        [FILTER_TYPES.TOMORROW]: todos.filter((todo: Todo) => todo.deadline && isTomorrow(parseISO(todo.deadline))).length,
        [FILTER_TYPES.THIS_MONTH]: todos.filter((todo: Todo) => todo.deadline && isThisMonth(parseISO(todo.deadline)))
            .length,
        [FILTER_TYPES.PLANNED]: todos.filter((todo: Todo) => todo.status === FILTER_TYPES.PLANNED).length,
        [FILTER_TYPES.PENDING]: todos.filter((todo: Todo) => todo.status === FILTER_TYPES.PENDING).length,
        [FILTER_TYPES.DONE]: todos.filter((todo: Todo) => todo.status === FILTER_TYPES.DONE).length,
        [FILTER_TYPES.OVERDUE]: todos.filter((todo: Todo) => todo.status === FILTER_TYPES.OVERDUE).length,
    }

    return (
        <View style={styles.container}>
            {/* Date header */}
            <View style={styles.dateHeader}>
                <Text style={styles.dateText}>{formattedDate}</Text>
                <View style={styles.dateLine} />
            </View>

            {/* Filters */}
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FilterButton
                        title="All"
                        count={counts[FILTER_TYPES.ALL]}
                        isActive={filter === FILTER_TYPES.ALL}
                        onPress={() => setFilter(FILTER_TYPES.ALL)}
                    />
                    <FilterButton
                        title="Today"
                        count={counts[FILTER_TYPES.TODAY]}
                        isActive={filter === FILTER_TYPES.TODAY}
                        onPress={() => setFilter(FILTER_TYPES.TODAY)}
                        color={colors.green}
                    />
                    <FilterButton
                        title="Tomorrow"
                        count={counts[FILTER_TYPES.TOMORROW]}
                        isActive={filter === FILTER_TYPES.TOMORROW}
                        onPress={() => setFilter(FILTER_TYPES.TOMORROW)}
                    />
                    <FilterButton
                        title="This Month"
                        count={counts[FILTER_TYPES.THIS_MONTH]}
                        isActive={filter === FILTER_TYPES.THIS_MONTH}
                        onPress={() => setFilter(FILTER_TYPES.THIS_MONTH)}
                    />
                    <FilterButton
                        title="Planned"
                        count={counts[FILTER_TYPES.PLANNED]}
                        isActive={filter === FILTER_TYPES.PLANNED}
                        onPress={() => setFilter(FILTER_TYPES.PLANNED)}
                    />
                    <FilterButton
                        title="Pending"
                        count={counts[FILTER_TYPES.PENDING]}
                        isActive={filter === FILTER_TYPES.PENDING}
                        onPress={() => setFilter(FILTER_TYPES.PENDING)}
                    />
                    <FilterButton
                        title="Done"
                        count={counts[FILTER_TYPES.DONE]}
                        isActive={filter === FILTER_TYPES.DONE}
                        onPress={() => setFilter(FILTER_TYPES.DONE)}
                    />
                    <FilterButton
                        title="Overdue"
                        count={counts[FILTER_TYPES.OVERDUE]}
                        isActive={filter === FILTER_TYPES.OVERDUE}
                        onPress={() => setFilter(FILTER_TYPES.OVERDUE)}
                        color={colors.red}
                    />
                </ScrollView>
            </View>

            {/* Section title */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    {filter === FILTER_TYPES.ALL
                        ? "All Tasks"
                        : filter === FILTER_TYPES.TODAY
                            ? "Today's Tasks"
                            : filter === FILTER_TYPES.TOMORROW
                                ? "Tomorrow's Tasks"
                                : filter === FILTER_TYPES.THIS_MONTH
                                    ? "This Month's Tasks"
                                    : filter === FILTER_TYPES.PLANNED
                                        ? "Planned Tasks"
                                        : filter === FILTER_TYPES.PENDING
                                            ? "Pending Tasks"
                                            : filter === FILTER_TYPES.DONE
                                                ? "Completed Tasks"
                                                : "Overdue Tasks"}
                </Text>
            </View>

            {filteredTodos.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Feather name="book-open" size={48} color={colors.taupe} />
                    <Text style={styles.emptyText}>No tasks found</Text>
                    <Text style={styles.emptySubtext}>
                        {filter === FILTER_TYPES.ALL
                            ? "Your page is blank. Add a task to get started."
                            : `You don't have any tasks for ${filter.replace("_", " ").toLowerCase()}.`}
                    </Text>
                </View>
            ) : (
                <ScrollView style={styles.todoList}>
                    {filteredTodos.map((todo: Todo) => (
                        <TodoItem key={todo.id} todo={todo} onToggleStatus={toggleTodoStatus} onDelete={deleteTodo} />
                    ))}
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.paper,
    },
    dateHeader: {
        paddingTop: 16,
        paddingHorizontal: 20,
        paddingBottom: 8,
    },
    dateText: {
        fontSize: typography.subtitle.fontSize,
        fontWeight: typography.subtitle.fontWeight,
        color: typography.subtitle.color,
        textAlign: "center",
    },
    dateLine: {
        height: 1,
        backgroundColor: colors.taupe,
        marginTop: 8,
        marginHorizontal: 40,
    },
    filterContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.taupe,
        borderStyle: "dashed",
    },
    sectionHeader: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.taupe,
        borderStyle: "dashed",
    },
    sectionTitle: {
        fontSize: typography.body.fontSize,
        fontWeight: typography.body.fontWeight,
        color: typography.body.color,
    },
    todoList: {
        flex: 1,
        padding: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: typography.subtitle.fontSize,
        fontWeight: typography.subtitle.fontWeight,
        color: typography.subtitle.color,
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: typography.caption.fontSize,
        fontWeight: typography.caption.fontWeight,
        color: typography.caption.color,
        textAlign: "center",
        marginTop: 8,
        maxWidth: "80%",
    },
})

