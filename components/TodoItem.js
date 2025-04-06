import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import { format } from "date-fns"
import { colors, typography, borders, spacing } from "@/theme/styles"
import { TODO_STATUS } from "@/store/todoStore"
import { router } from "expo-router"

const TodoItem = ({ todo, onToggleStatus, onDelete }) => {
    const formattedDeadline = todo.deadline ? format(new Date(todo.deadline), "MMM d, yyyy") : null
    const getStatusIcon = () => {
        switch (todo.status) {
            case TODO_STATUS.DONE:
                return { name: "check-square", color: colors.green }
            case TODO_STATUS.PENDING:
                return { name: "square", color: colors.gray }
            case TODO_STATUS.OVERDUE:
                return { name: "alert-circle", color: colors.red }
            default:
                return { name: "square", color: colors.darkGray }
        }
    }

    const statusIcon = getStatusIcon()

    const handleEditTodo = () => {
        router.push({
            pathname: "/(tabs)/edit",
            params: { id: todo.id },
        })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.statusButton} onPress={() => onToggleStatus(todo.id)}>
                <Feather name={statusIcon.name} size={20} color={statusIcon.color} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.content} onPress={handleEditTodo}>
                <Text style={[styles.title, todo.status === TODO_STATUS.DONE && styles.completedTitle]}>{todo.title}</Text>

                {todo.notes ? (
                    <Text style={styles.notes} numberOfLines={2}>
                        {todo.notes}
                    </Text>
                ) : null}

                {formattedDeadline ? (
                    <View style={styles.deadlineContainer}>
                        <Feather name="calendar" size={12} color={colors.gray} />
                        <Text style={[styles.deadline, todo.status === TODO_STATUS.OVERDUE && styles.overdueDeadline]}>
                            {formattedDeadline}
                        </Text>
                    </View>
                ) : null}
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(todo.id)}>
                <Feather name="trash-2" size={18} color={colors.gray} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.md,
        marginBottom: spacing.md,
        backgroundColor: colors.cream,
        ...borders.solid,
    },
    statusButton: {
        marginRight: spacing.md,
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flex: 1,
        paddingVertical: spacing.xs,
    },
    title: {
        ...typography.body,
        marginBottom: spacing.xs,
    },
    completedTitle: {
        textDecorationLine: "line-through",
        color: colors.gray,
    },
    notes: {
        ...typography.caption,
        marginBottom: spacing.sm,
    },
    deadlineContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    deadline: {
        ...typography.small,
        marginLeft: spacing.xs,
    },
    overdueDeadline: {
        color: colors.red,
    },
    deleteButton: {
        padding: spacing.sm,
    },
})

export default TodoItem

