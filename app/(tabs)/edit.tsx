"use client"

import { useState, useEffect } from "react"
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Modal,
    ActivityIndicator,
} from "react-native"
import { Stack, router, useLocalSearchParams } from "expo-router"
import { format } from "date-fns"
import useTodoStore from "@/store/todoStore"
import { colors, typography, borders, shadows } from "@/theme/styles"
import { Calendar } from "react-native-calendars"
import { Feather } from "@expo/vector-icons"

export default function EditTodoScreen() {
    const { id } = useLocalSearchParams<{ id: string }>()

    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")
    const [deadline, setDeadline] = useState<Date | null>(null)
    const [showCalendar, setShowCalendar] = useState(false)
    const [loading, setLoading] = useState(true)

    const getTodoById = useTodoStore((state) => state.getTodoById)
    const updateTodo = useTodoStore((state) => state.updateTodo)

    useEffect(() => {
        if (id) {
            const todo = getTodoById(id)
            if (todo) {
                setTitle(todo.title)
                setNotes(todo.notes || "")
                setDeadline(todo.deadline ? new Date(todo.deadline) : null)
            }
            setLoading(false)
        }
    }, [id])

    const handleUpdateTodo = () => {
        if (!title.trim() || !id) return

        updateTodo(id, {
            title: title.trim(),
            notes: notes.trim(),
            deadline: deadline ? deadline.toISOString() : null,
        })

        router.navigate("/(tabs)")
    }

    const setTodayDeadline = () => {
        setDeadline(new Date())
    }

    const setTomorrowDeadline = () => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        setDeadline(tomorrow)
    }

    const setWeekendDeadline = () => {
        const weekend = new Date()
        const daysUntilWeekend = (6 - weekend.getDay()) % 7
        weekend.setDate(weekend.getDate() + daysUntilWeekend)
        setDeadline(weekend)
    }

    const setNextWeekDeadline = () => {
        const nextWeek = new Date()
        nextWeek.setDate(nextWeek.getDate() + 7)
        setDeadline(nextWeek)
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.darkGray} />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
        >
            <Stack.Screen
                options={{
                    title: "Edit Task",
                }}
            />

            <ScrollView style={styles.form}>
                <View style={styles.formSection}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={[styles.input, styles.inputText]}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="What needs to be done?"
                        placeholderTextColor={colors.gray}
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Notes</Text>
                    <TextInput
                        style={[styles.input, styles.inputText, styles.textArea]}
                        value={notes}
                        onChangeText={setNotes}
                        placeholder="Add some details..."
                        placeholderTextColor={colors.gray}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Deadline</Text>
                    <View style={styles.deadlineGrid}>
                        <TouchableOpacity style={styles.deadlineButton} onPress={setTodayDeadline}>
                            <Text style={styles.deadlineButtonText}>Today</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deadlineButton} onPress={setTomorrowDeadline}>
                            <Text style={styles.deadlineButtonText}>Tomorrow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deadlineButton} onPress={setWeekendDeadline}>
                            <Text style={styles.deadlineButtonText}>
                                Weekend ({format(new Date().setDate(new Date().getDate() + ((6 - new Date().getDay()) % 7)), "EEE")})
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deadlineButton} onPress={setNextWeekDeadline}>
                            <Text style={styles.deadlineButtonText}>
                                Next Week (
                                {format(new Date().setDate(new Date().getDate() + ((1 + 7 - new Date().getDay()) % 7)), "EEE")})
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.calendarButton} onPress={() => setShowCalendar(true)}>
                        <Feather name="calendar" size={18} color={colors.darkGray} />
                        <Text style={styles.calendarButtonText}>Choose specific date...</Text>
                    </TouchableOpacity>

                    {deadline && (
                        <View style={styles.selectedDeadline}>
                            <Text style={styles.selectedDeadlineText}>Deadline: {format(deadline, "MMMM d, yyyy")}</Text>
                            <TouchableOpacity style={styles.clearDateButton} onPress={() => setDeadline(null)}>
                                <Text style={styles.clearDateText}>Clear</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Calendar Modal */}
                    <Modal visible={showCalendar} transparent animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.calendarContainer}>
                                <View style={styles.calendarHeader}>
                                    <Text style={styles.calendarTitle}>Select Date</Text>
                                    <TouchableOpacity onPress={() => setShowCalendar(false)}>
                                        <Feather name="x" size={24} color={colors.darkGray} />
                                    </TouchableOpacity>
                                </View>

                                <Calendar
                                    minDate={new Date().toISOString().split("T")[0]}
                                    onDayPress={(day: {
                                        dateString: string
                                        day: number
                                        month: number
                                        year: number
                                        timestamp: number
                                    }) => {
                                        setDeadline(new Date(day.timestamp))
                                        setShowCalendar(false)
                                    }}
                                    theme={{
                                        backgroundColor: colors.paper,
                                        calendarBackground: colors.paper,
                                        textSectionTitleColor: colors.darkGray,
                                        selectedDayBackgroundColor: colors.darkGray,
                                        selectedDayTextColor: colors.paper,
                                        todayTextColor: colors.darkGray,
                                        dayTextColor: colors.darkGray,
                                        arrowColor: colors.darkGray,
                                        monthTextColor: colors.darkGray,
                                        textDayFontFamily: "System",
                                        textMonthFontFamily: "System",
                                        textDayHeaderFontFamily: "System",
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.updateButton, !title.trim() && styles.updateButtonDisabled]}
                    onPress={handleUpdateTodo}
                    disabled={!title.trim()}
                >
                    <Text style={styles.updateButtonText}>Update Task</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.paper,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.paper,
    },
    form: {
        flex: 1,
        padding: 16,
    },
    formSection: {
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: colors.taupe,
        borderStyle: "dashed",
        paddingBottom: 16,
    },
    label: {
        fontSize: typography.subtitle.fontSize,
        fontWeight: typography.subtitle.fontWeight,
        color: typography.subtitle.color,
        marginBottom: 12,
    },
    input: {
        backgroundColor: colors.cream,
        borderWidth: 1,
        borderColor: colors.taupe,
        borderStyle: "solid",
        padding: 12,
    },
    inputText: {
        fontSize: typography.body.fontSize,
        fontWeight: typography.body.fontWeight,
        color: typography.body.color,
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: "top",
    },
    deadlineGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    deadlineButton: {
        backgroundColor: colors.cream,
        borderWidth: 1,
        borderColor: colors.taupe,
        borderStyle: "solid",
        padding: 12,
        width: "48%",
        alignItems: "center",
        marginBottom: 8,
    },
    deadlineButtonText: {
        fontSize: typography.caption.fontSize,
        fontWeight: typography.caption.fontWeight,
        color: typography.caption.color,
    },
    calendarButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.cream,
        borderWidth: 1,
        borderColor: colors.taupe,
        borderStyle: "solid",
        padding: 12,
        marginBottom: 16,
    },
    calendarButtonText: {
        fontSize: typography.caption.fontSize,
        fontWeight: typography.caption.fontWeight,
        color: typography.caption.color,
        marginLeft: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    calendarContainer: {
        width: "90%",
        backgroundColor: colors.paper,
        borderWidth: 1,
        borderColor: colors.taupe,
        borderStyle: "solid",
        padding: 16,
        ...shadows.subtle,
    },
    calendarHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.taupe,
        borderStyle: "dashed",
        paddingBottom: 8,
    },
    calendarTitle: {
        fontSize: typography.subtitle.fontSize,
        fontWeight: typography.subtitle.fontWeight,
        color: typography.subtitle.color,
    },
    selectedDeadline: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.cream,
        borderWidth: 1,
        borderColor: colors.taupe,
        borderStyle: "solid",
        padding: 12,
    },
    selectedDeadlineText: {
        fontSize: typography.caption.fontSize,
        fontWeight: typography.caption.fontWeight,
        color: typography.caption.color,
    },
    clearDateButton: {
        padding: 5,
    },
    clearDateText: {
        fontSize: typography.small.fontSize,
        fontWeight: typography.small.fontWeight,
        color: colors.red,
    },
    buttonContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: colors.taupe,
        borderStyle: "solid",
    },
    updateButton: {
        backgroundColor: colors.darkGray,
        padding: 16,
        alignItems: "center",
    },
    updateButtonDisabled: {
        backgroundColor: colors.gray,
    },
    updateButtonText: {
        fontSize: typography.body.fontSize,
        fontWeight: typography.body.fontWeight,
        color: colors.paper,
    },
})
