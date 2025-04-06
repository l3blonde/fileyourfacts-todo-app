"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, Easing } from "react-native"
import Svg, { Path, G } from "react-native-svg"
import { colors, typography } from "@/theme/styles"


const LOGO_PATH =
    "M64.31 183.46L.71 119.4 25.07 95.49 64.31 133.39 76.04 122.11 38.38 85.57 64.31 60.31 101.3 98.2 197.39 1.22 197.39 50.38 64.31 183.46"

const LOGO_DURATION = 2000
const TEXT_DURATION = 1000
const CHECKBOX_DURATION = 800
const TOTAL_DURATION = 5000

interface AnimatedSplashScreenProps {
    onAnimationComplete: () => void
}

const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({ onAnimationComplete }) => {
    const logoPathAnimation = useRef(new Animated.Value(0)).current
    const logoOpacity = useRef(new Animated.Value(0)).current
    const textAnimation = useRef(new Animated.Value(0)).current
    const checkbox1Animation = useRef(new Animated.Value(0)).current
    const checkbox1Check = useRef(new Animated.Value(0)).current
    const checkbox2Animation = useRef(new Animated.Value(0)).current
    const checkbox2Check = useRef(new Animated.Value(0)).current
    const checkbox3Animation = useRef(new Animated.Value(0)).current
    const checkbox3Check = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.sequence([
            Animated.timing(logoPathAnimation, {
                toValue: 1,
                duration: LOGO_DURATION,
                useNativeDriver: true,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),

            Animated.timing(textAnimation, {
                toValue: 1,
                duration: TEXT_DURATION,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),

            Animated.parallel([
                Animated.timing(checkbox1Animation, {
                    toValue: 1,
                    duration: CHECKBOX_DURATION,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
                Animated.timing(checkbox1Check, {
                    toValue: 1,
                    duration: CHECKBOX_DURATION,
                    delay: CHECKBOX_DURATION * 0.5,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
            ]),

            Animated.parallel([
                Animated.timing(checkbox2Animation, {
                    toValue: 1,
                    duration: CHECKBOX_DURATION,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
                Animated.timing(checkbox2Check, {
                    toValue: 1,
                    duration: CHECKBOX_DURATION,
                    delay: CHECKBOX_DURATION * 0.5,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
            ]),

            Animated.parallel([
                Animated.timing(checkbox3Animation, {
                    toValue: 1,
                    duration: CHECKBOX_DURATION,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
                Animated.timing(checkbox3Check, {
                    toValue: 1,
                    duration: CHECKBOX_DURATION,
                    delay: CHECKBOX_DURATION * 0.5,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
            ]),
        ]).start()

        const timer = setTimeout(() => {
            onAnimationComplete()
        }, TOTAL_DURATION)

        return () => clearTimeout(timer)
    }, [])

    const strokeDashoffset = logoPathAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1000, 0],
    })

    return (
        <View style={styles.container}>
            {/* Logo Animation */}
            <View style={styles.logoContainer}>
                <Svg width={120} height={120} viewBox="0 0 197.89 184.17">
                    <G>
                        <AnimatedPath
                            d={LOGO_PATH}
                            fill="transparent"
                            stroke={colors.darkGray}
                            strokeWidth={3}
                            strokeDasharray={1000}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </G>
                </Svg>

                <Animated.Text
                    style={[
                        styles.appName,
                        {
                            opacity: textAnimation,
                            transform: [
                                {
                                    translateY: textAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [20, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    FileYourFacts
                </Animated.Text>
            </View>

            {/* Slogan with Checkboxes */}
            <View style={styles.sloganContainer}>
                {/* Checkbox 1 */}
                <Animated.View
                    style={[
                        styles.checkboxRow,
                        {
                            opacity: checkbox1Animation,
                            transform: [
                                {
                                    translateX: checkbox1Animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-20, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.checkbox}>
                        <Animated.View
                            style={[styles.checkmark, { opacity: checkbox1Check, transform: [{ scale: checkbox1Check }] }]}
                        />
                    </View>
                    <Text style={styles.sloganText}>Complete One Todo Today</Text>
                </Animated.View>

                {/* Checkbox 2 */}
                <Animated.View
                    style={[
                        styles.checkboxRow,
                        {
                            opacity: checkbox2Animation,
                            transform: [
                                {
                                    translateX: checkbox2Animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-20, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.checkbox}>
                        <Animated.View
                            style={[styles.checkmark, { opacity: checkbox2Check, transform: [{ scale: checkbox2Check }] }]}
                        />
                    </View>
                    <Text style={styles.sloganText}>Check One Overdue</Text>
                </Animated.View>

                {/* Checkbox 3 */}
                <Animated.View
                    style={[
                        styles.checkboxRow,
                        {
                            opacity: checkbox3Animation,
                            transform: [
                                {
                                    translateX: checkbox3Animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-20, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.checkbox}>
                        <Animated.View
                            style={[styles.checkmark, { opacity: checkbox3Check, transform: [{ scale: checkbox3Check }] }]}
                        />
                    </View>
                    <Text style={styles.sloganText}>Plan One for Tomorrow</Text>
                </Animated.View>
            </View>
        </View>
    )
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.paper,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 60,
    },
    appName: {
        ...typography.title,
        fontSize: 28,
        marginTop: 20,
        color: colors.darkGray,
    },
    sloganContainer: {
        alignItems: "flex-start",
        width: "80%",
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: colors.darkGray,
        marginRight: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    checkmark: {
        width: 14,
        height: 14,
        backgroundColor: colors.darkGray,
    },
    sloganText: {
        ...typography.body,
        fontSize: 18,
        color: colors.darkGray,
    },
})

export default AnimatedSplashScreen

