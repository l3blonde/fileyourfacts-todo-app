"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { Stack } from "expo-router"
import { Calendar, type DateData } from "react-native-calendars"
import { format } from "date-fns"
import useTodoStore, { type Todo } from "@/store/todoStore"
import TodoItem from "@/components/TodoItem"
import { colors, typography, borders, shadows } from "@/theme/styles"
import { Feather } from "@expo/vector-icons"

interface MarkedDates {
    [date: string]: {
        selected?: boolean
        selectedColor?: string
        marked?: boolean
        dots?: Array<{ color: string }>
    }
}

export default function CalendarScreen() {
    const todos = useTodoStore((state) => state.todos)
    const toggleTodoStatus = useTodoStore((state) => state.toggleTodoStatus)
    const deleteTodo = useTodoStore((state) => state.deleteTodo)

    const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [markedDates, setMarkedDates] = useState<MarkedDates>({})

    const todosForSelectedDate = todos.filter((todo: Todo) => {
        if (!todo.deadline) return false
        return format(new Date(todo.deadline), "yyyy-MM-dd") === selectedDate
    })

    useEffect(() => {
        const newMarkedDates: MarkedDates = {}

        newMarkedDates[selectedDate] = { selected: true, selectedColor: colors.darkGray }

        todos.forEach((todo: Todo) => {
            if (!todo.deadline) return

            const dateStr = format(new Date(todo.deadline), "yyyy-MM-dd")

            if (dateStr === selectedDate) return

            let dotColor
            switch (todo.status) {
                case "done":
                    dotColor = colors.green
                    break
                case "overdue":
                    dotColor = colors.red
                    break
                default:
                    dotColor = colors.accent
            }

            if (newMarkedDates[dateStr]) {
                if (newMarkedDates[dateStr].dots) {
                    newMarkedDates[dateStr].dots!.push({ color: dotColor })
                } else {
                    newMarkedDates[dateStr].dots = [{ color: dotColor }]
                }
            } else {
                newMarkedDates[dateStr] = {
                    dots: [{ color: dotColor }],
                    marked: true,
                }
            }
        })

        setMarkedDates(newMarkedDates)
    }, [todos, selectedDate])

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Calendar",
                }}
            />

            <Calendar
                theme={{
                    calendarBackground: colors.paper,
                    textSectionTitleColor: colors.darkGray,
                    selectedDayBackgroundColor: colors.darkGray,
                    selectedDayTextColor: colors.paper,
                    todayTextColor: colors.darkGray,
                    dayTextColor: colors.darkGray,
                    textDisabledColor: colors.taupe,
                    dotColor: colors.accent,
                    selectedDotColor: colors.paper,
                    arrowColor: colors.darkGray,
                    monthTextColor: colors.darkGray,
                    indicatorColor: colors.darkGray,
                    textDayFontFamily: "System",
                    textMonthFontFamily: "System",
                    textDayHeaderFontFamily: "System",
                }}
                markingType={"multi-dot"}
                markedDates={markedDates}
                onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
            />

            <View style={styles.divider} />

            <View style={styles.todosContainer}>
                <Text style={styles.dateTitle}>{format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}</Text>

                {todosForSelectedDate.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Feather name="calendar" size={48} color={colors.taupe} />
                        <Text style={styles.emptyText}>No tasks for this date</Text>
                    </View>
                ) : (
                    <ScrollView style={styles.todoList}>
                        {todosForSelectedDate.map((todo: Todo) => (
                            <TodoItem key={todo.id} todo={todo} onToggleStatus={toggleTodoStatus} onDelete={deleteTodo} />
                        ))}
                    </ScrollView>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.paper,
    },
    divider: {
        height: 1,
        backgroundColor: colors.taupe,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: colors.taupe,
        borderStyle: "dashed",
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    todosContainer: {
        flex: 1,
        padding: 16,
    },
    dateTitle: {
        fontSize: typography.subtitle.fontSize,
        fontWeight: typography.subtitle.fontWeight,
        color: typography.subtitle.color,
        marginBottom: 16,
        textAlign: "center",
    },
    todoList: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: typography.body.fontSize,
        fontWeight: typography.body.fontWeight,
        color: typography.body.color,
        marginTop: 12,
    },
})
