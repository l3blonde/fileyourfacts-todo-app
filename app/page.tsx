import { View, StyleSheet } from "react-native"
import { colors } from "@/theme/styles"
import OverviewScreen from "./(tabs)/index"

export default function Page() {
    return (
        <View style={styles.container}>
            <OverviewScreen />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.paper,
    },
})
