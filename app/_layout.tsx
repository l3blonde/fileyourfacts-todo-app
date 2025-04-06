"use client"

import { useEffect, useState, useCallback } from "react"
import { Stack } from "expo-router"
import useTodoStore from "@/store/todoStore"
import AnimatedSplashScreen from "@/components/AnimatedSplashScreen"
import * as SplashScreen from "expo-splash-screen"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [isAppReady, setIsAppReady] = useState(false)
    const [isSplashAnimationComplete, setIsSplashAnimationComplete] = useState(false)
    const initializeStore = useTodoStore((state) => state.initializeStore)

    useEffect(() => {
        const prepare = async () => {
            try {
                await initializeStore()
            } catch (e) {
                console.warn(e)
            } finally {
                setIsAppReady(true)
            }
        }

        prepare()
    }, [])

    const onAnimationComplete = useCallback(() => {
        setIsSplashAnimationComplete(true)
    }, [])

    const onLayoutRootView = useCallback(async () => {
        if (isAppReady && isSplashAnimationComplete) {
            await SplashScreen.hideAsync()
        }
    }, [isAppReady, isSplashAnimationComplete])

    if (!isAppReady || !isSplashAnimationComplete) {
        return <AnimatedSplashScreen onAnimationComplete={onAnimationComplete} />
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
            onLayout={onLayoutRootView}
        />
    )
}

