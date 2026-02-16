import { ContentCardSection } from '@/components/content/ContentCardSection';
import { api } from "@/convex/_generated/api";
import { FlashList } from '@shopify/flash-list';
import { useQuery } from "convex/react";
import { Stack } from 'expo-router';
import { useMemo, useState } from 'react';

const ContentPage = () => {
    const content = useQuery(api.contentKanban.getContentKanban);
    const [selected, setSelected] = useState("A to Z")
    const [shownFilters, setShownFilters] = useState<string[]>(["collab", "date"])

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

    return (
        <>
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

            <FlashList 
                data={sortedContent}  
                className='bg-background px-4 pt-2' 
                contentInsetAdjustmentBehavior='automatic'     
                renderItem={({ item }) =>
                    <ContentCardSection {...item} filters={shownFilters} />
                } 
            />

        </>
    )
}

export default ContentPage
