import { Stack } from "expo-router"
import { useColorScheme } from "react-native"


const AddLayout = () => {
    const colorScheme = useColorScheme()

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                headerShown: true,
                headerBackButtonDisplayMode: 'minimal',
                title: 'Add Content',
                headerLargeTitleEnabled: false,
                headerTransparent: true,
                headerTitleStyle: {
                    color: colorScheme === 'dark' ? '#fff' : '#000'
                }
                }}
            />   
        </Stack>
    )
}

export default AddLayout