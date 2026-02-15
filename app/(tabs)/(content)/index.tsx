import { ContentCardSection } from '@/components/content/ContentCardSection';
import { api } from "@/convex/_generated/api";
import { FlashList } from '@shopify/flash-list';
import { useQuery } from "convex/react";
import { router, Stack } from 'expo-router';

const ContentPage = () => {
    const content = useQuery(api.contentKanban.getContentKanban);

    return (
        <>
            <Stack.Toolbar placement='right'>
                <Stack.Toolbar.Button
                    tintColor="#7f2ccb"
                    variant="prominent"
                    onPress={() => router.push("/add")}
                    style={{ fontWeight: "bold" }}
                >
                    +
                </Stack.Toolbar.Button>
            </Stack.Toolbar>

            <FlashList 
                data={content}  
                className='bg-background px-4 pt-2' 
                contentInsetAdjustmentBehavior='automatic'     
                renderItem={({ item }) =>
                    <ContentCardSection {...item} />
                } 
            />

        </>
    )
}

export default ContentPage
