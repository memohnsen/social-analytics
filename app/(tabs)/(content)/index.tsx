import { storage } from '@/app/_layout';
import { ContentCardSection } from '@/components/content/ContentCardSection';
import { api } from "@/convex/_generated/api";
import { FlashList } from '@shopify/flash-list';
import { useQuery } from "convex/react";
import { Stack } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, useColorScheme, View } from 'react-native';

type ContentViewOptions = "kanban" | "list"

const ContentPage = () => {
    const content = useQuery(api.contentKanban.getContentKanban);
    const colorScheme = useColorScheme()
    const [selected, setSelected] = useState("A to Z")
    const [shownFilters, setShownFilters] = useState<string[]>(["collab"])
    const [contentView, setContentView] = useState<ContentViewOptions>("kanban")

    // SET MMKV TO STATE
    useEffect(() => {
        const storedFilters = storage.getString("filters")
        if (storedFilters) {
            const parsedFilters = JSON.parse(storedFilters)
            setShownFilters(parsedFilters)
        }
    }, [])
    
    // UPDATE MMKV ON STATE CHANGE
    useEffect(() => {
        const serializedFilterArray = JSON.stringify(shownFilters)
        storage.set("filters", serializedFilterArray)
    }, [shownFilters])

    const sortedContent = useMemo(() => {
        if (!content) return []
        const items = [...content]

        if (selected === "A to Z") {
            items.sort((a, b) => a.title.localeCompare(b.title))
        } else if (selected === "Z to A") {
            items.sort((a, b) => b.title.localeCompare(a.title))
        } else if (selected === "Earliest") {
            items.sort((a, b) => {
                if (!a.datePosted && !b.datePosted) {
                    return a.title.localeCompare(b.title)
                }
                if (!a.datePosted){
                    return 1
                }
                if (!b.datePosted) {
                    return -1
                }
                return a.datePosted.localeCompare(b.datePosted)
            })
        } else {
            items.sort((a, b) => {
                if (!a.datePosted && !b.datePosted) {
                    return a.title.localeCompare(b.title)
                }
                if (!a.datePosted){
                    return 1
                }
                if (!b.datePosted) {
                    return -1
                }
                return b.datePosted.localeCompare(a.datePosted)
            })
        }

        return items
    }, [content, selected])

    const handleFiltering = (name: string) => {
        if (shownFilters.includes(name)) {
            setShownFilters(prev => prev.filter(item => item !== name))
        } else {
            setShownFilters(prev => [...prev, name])
        }
    }

    const kanbanIdeaColumn = useMemo(() => {
        if (!content) return []
        const items = [...sortedContent]
        const filteredArray = items.filter(item => item.status.toLowerCase() === "idea")
        return filteredArray
    }, [sortedContent])

    const kanbanPostedColumn = useMemo(() => {
        if (!content) return []
        const items = [...sortedContent]
        const filteredArray = items.filter(item => item.status.toLowerCase() === "posted")
        return filteredArray
    }, [sortedContent])

    const kanbanScheduledColumn = useMemo(() => {
        if (!content) return []
        const items = [...sortedContent]
        const filteredArray = items.filter(item => item.status.toLowerCase() === "scheduled")
        return filteredArray
    }, [sortedContent])

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: 'Content',
                    headerLargeTitleEnabled: contentView === "list" ? true : false,
                    headerBackButtonDisplayMode: 'minimal',
                    headerTransparent: true,
                    headerTitleStyle: {
                        color: colorScheme === 'dark' ? '#fff' : '#000'
                    }
                }}
            /> 
            <Stack.Toolbar placement='right'>
                <Stack.Toolbar.Menu 
                    icon="line.3.horizontal.decrease" 
                    tintColor="#7f2ccb" 
                    variant="prominent"
                    title="Filter"
                >
                    <Stack.Toolbar.MenuAction 
                        isOn={shownFilters.includes("caption")}
                        onPress={() => handleFiltering("caption")}
                    >
                        Caption
                    </Stack.Toolbar.MenuAction>
                    <Stack.Toolbar.MenuAction 
                        isOn={shownFilters.includes("collab")}
                        onPress={() => handleFiltering("collab")}
                    >
                        Collab
                    </Stack.Toolbar.MenuAction>
                    <Stack.Toolbar.MenuAction 
                        isOn={shownFilters.includes("date")}
                        onPress={() => handleFiltering("date")}
                    >
                        Date
                    </Stack.Toolbar.MenuAction>
                    <Stack.Toolbar.MenuAction 
                        isOn={shownFilters.includes("followers")}
                        onPress={() => handleFiltering("followers")}
                    >
                        Followers
                    </Stack.Toolbar.MenuAction>
                    <Stack.Toolbar.MenuAction 
                        isOn={shownFilters.includes("views")}
                        onPress={() => handleFiltering("views")}
                    >
                        Views
                    </Stack.Toolbar.MenuAction>
                    <Stack.Toolbar.MenuAction 
                        isOn={shownFilters.includes("likes")}
                        onPress={() => handleFiltering("likes")}
                    >
                        Likes
                    </Stack.Toolbar.MenuAction>
                    <Stack.Toolbar.MenuAction 
                        isOn={shownFilters.includes("comments")}
                        onPress={() => handleFiltering("comments")}
                    >
                        Comments
                    </Stack.Toolbar.MenuAction>
                    <Stack.Toolbar.MenuAction 
                        isOn={shownFilters.includes("shares")}
                        onPress={() => handleFiltering("shares")}
                    >
                        Shares
                    </Stack.Toolbar.MenuAction>
                </Stack.Toolbar.Menu>
                <Stack.Toolbar.Menu 
                    icon="arrow.up.arrow.down" 
                    tintColor="#7f2ccb" 
                    variant="prominent"
                    title="Sort By"
                >
                    <Stack.Toolbar.MenuAction 
                        isOn={selected === "A to Z"}
                        onPress={() => setSelected("A to Z")}
                    >
                        A to Z
                    </Stack.Toolbar.MenuAction>
                    <Stack.Toolbar.MenuAction 
                        isOn={selected === "Z to A"}
                        onPress={() => setSelected("Z to A")}
                    >
                        Z to A
                    </Stack.Toolbar.MenuAction>
                    <Stack.Toolbar.MenuAction 
                        isOn={selected === "Earliest"}
                        onPress={() => setSelected("Earliest")}
                    >
                        Earliest
                    </Stack.Toolbar.MenuAction>
                    <Stack.Toolbar.MenuAction 
                        isOn={selected === "Latest"}
                        onPress={() => setSelected("Latest")}
                    >
                        Latest
                    </Stack.Toolbar.MenuAction>
                </Stack.Toolbar.Menu>
            </Stack.Toolbar>

            {contentView === "list" ? (
                <FlashList 
                    data={sortedContent}  
                    className='bg-background px-4 pt-2' 
                    contentInsetAdjustmentBehavior='automatic'     
                    renderItem={({ item }) =>
                        <ContentCardSection {...item} filters={shownFilters} />
                    } 
                    ListEmptyComponent={<View></View>}
                />
            ) : (
                // page needs h scroll view
                // each columnn needs individual v scroll
                // flash list each column by status
                // filtering by status - const filteredItemsByStatus = items.filter(item => item.status.toLowerCase() === "posted") 
                // gesture handler to drag to diff columns

                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    className='bg-background px-4 pt-2 flex-row flex-1'
                >
                    <FlashList 
                        data={kanbanIdeaColumn}  
                        className='bg-background mr-6 pt-1 w-100' 
                        contentInsetAdjustmentBehavior='automatic'     
                        renderItem={({ item }) =>
                            <ContentCardSection {...item} filters={shownFilters} />
                        } 
                        ListEmptyComponent={<View></View>}
                        ListHeaderComponent={
                            <Text className='text-primary-text text-2xl mb-2 font-bold'>Idea</Text>
                        }
                    />
                    <FlashList 
                        data={kanbanScheduledColumn}  
                        className='bg-background mr-6 pt-1 w-100' 
                        contentInsetAdjustmentBehavior='automatic'     
                        renderItem={({ item }) =>
                            <ContentCardSection {...item} filters={shownFilters} />
                        } 
                        ListEmptyComponent={<View></View>}
                        ListHeaderComponent={
                            <Text className='text-primary-text text-2xl mb-2 font-bold'>Scheduled</Text>
                        }
                    />
                    <FlashList 
                        data={kanbanPostedColumn}  
                        className='bg-background mr-6 pt-1 w-100' 
                        contentInsetAdjustmentBehavior='automatic'     
                        renderItem={({ item }) =>
                            <ContentCardSection {...item} filters={shownFilters} />
                        } 
                        ListEmptyComponent={<View></View>}
                        ListHeaderComponent={
                            <Text className='text-primary-text text-2xl mb-2 font-bold'>Posted</Text>
                        }
                    />
                </ScrollView>
            )}
            

        </>
    )
}

export default ContentPage
