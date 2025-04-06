import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { colors, typography, borders, spacing } from "@/theme/styles"

/**
 * FilterButton component for filtering todos by status
 * @param {Object} props - Component props
 * @param {string} props.title - Button title
 * @param {number} props.count - Number of todos with this status
 * @param {boolean} props.isActive - Whether this filter is currently active
 * @param {Function} props.onPress - Function to call when button is pressed
 * @param {string} [props.color] - Optional color override for the count badge
 */
const FilterButton = ({ title, count, isActive, onPress, color }) => {
    return (
        <TouchableOpacity style={[styles.button, isActive && styles.activeButton]} onPress={onPress}>
            <Text style={[styles.title, isActive && styles.activeTitle]}>{title}</Text>
            {count > 0 && (
                <Text style={[styles.count, isActive && styles.activeCount, color && { backgroundColor: color }]}>{count}</Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        marginRight: spacing.sm,
        backgroundColor: colors.paper,
        ...borders.solid,
    },
    activeButton: {
        backgroundColor: colors.darkGray,
    },
    title: {
        ...typography.caption,
        color: colors.darkGray,
    },
    activeTitle: {
        color: colors.paper,
    },
    count: {
        marginLeft: spacing.xs,
        paddingHorizontal: spacing.xs,
        paddingVertical: 1,
        minWidth: 18,
        textAlign: "center",
        ...typography.small,
        backgroundColor: colors.accent,
        color: colors.white,
        overflow: "hidden",
    },
    activeCount: {
        backgroundColor: colors.paper,
        color: colors.darkGray,
    },
})

export default FilterButton

