import { View, Text, StyleSheet } from "react-native"
import Svg, { Polygon } from "react-native-svg"

const Logo = ({ size = 24, color = "#000000", showText = true }) => {
    const originalWidth = 197.89
    const originalHeight = 184.17

    const width = (originalWidth / originalHeight) * size

    return (
        <View style={styles.container}>
            {/* SVG Logo */}
            <View style={{ width, height: size }}>
                <Svg width="100%" height="100%" viewBox="0 0 197.89 184.17">
                    <Polygon
                        points="64.31 183.46 .71 119.4 25.07 95.49 64.31 133.39 76.04 122.11 38.38 85.57 64.31 60.31 101.3 98.2 197.39 1.22 197.39 50.38 64.31 183.46"
                        fill={color}
                        stroke={color}
                        strokeMiterlimit="10"
                    />
                </Svg>
            </View>

            {/* App name text */}
            {showText && (
                <Text
                    style={[
                        styles.text,
                        {
                            color: color,
                            fontSize: size * 0.7,
                            marginLeft: size * 0.5,
                        },
                    ]}
                >
                    FileYourFacts
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontWeight: "bold",
    },
})

export default Logo

