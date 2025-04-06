"use client"

import { useEffect } from "react"
import { Tabs } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { colors, borders } from "@/theme/styles"
import useTodoStore from "@/store/todoStore"
import Logo from "@/components/Logo"

export default function TabsLayout() {
    const updateOverdueTodos = useTodoStore((state) => state.updateOverdueTodos)
    const recategorizeTodos = useTodoStore((state) => state.recategorizeTodos)

    useEffect(() => {
        recategorizeTodos()

        updateOverdueTodos()

        const interval = setInterval(() => {
            updateOverdueTodos()
        }, 86400000)

        return () => clearInterval(interval)
    }, [])

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: colors.paper,
                    ...borders.solid,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderBottomWidth: 0,
                    height: 60,
                },
                tabBarActiveTintColor: colors.darkGray,
                tabBarInactiveTintColor: colors.gray,
                headerStyle: {
                    backgroundColor: colors.paper,
                    ...borders.solid,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTitleStyle: {
                    color: colors.darkGray,
                    fontWeight: "500",
                },
                headerTitle: () => <Logo size={28} color={colors.darkGray} />,
                headerTitleAlign: "center",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Todos",
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Feather name="list" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="calendar"
                options={{
                    title: "Calendar",
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Feather name="calendar" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="add"
                options={{
                    title: "Add Todo",
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Feather name="plus-circle" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}

