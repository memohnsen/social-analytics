import TextInput from '@/components/TextInput';
import { TabBarContext } from '@/context/TabBarContext';
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Chip, Label } from 'heroui-native';
import { use, useState } from 'react';
import { Platform, ScrollView, useColorScheme, View } from 'react-native';

const STATUS_OPTIONS = ['posted', 'idea', 'scheduled', 'draft', 'ad', 'ready']
const TYPE_OPTIONS = ['reel', 'carousel', 'picture', 'trial reel', 'ad', 'voiceover']

const ContentDetails = () => {
  const colorScheme = useColorScheme()
  const { id } = useLocalSearchParams<{ id: string }>()
  const contentDetails = useQuery(api.contentKanban.getContentDetails, { id: id as Id<"contentKanban"> });
  
  // CHIP STATE
  const [statusSelected, setStatusSelected] = useState("idea")
  const [typeSelected, setTypeSelected] = useState("reel")
  
  // TEXT STATE
  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [script, setScript] = useState("")
  const [link, setLink] = useState("")
  const [followers, setFollowers] = useState("")
  const [views, setViews] = useState("")
  const [likes, setLikes] = useState("")
  const [comments, setComments] = useState("")
  const [shares, setShares] = useState("")
  
  // HIDE TAB BAR
  const { setIsTabBarHidden } = use(TabBarContext);

  useFocusEffect(() => {
    setIsTabBarHidden(true);
    return () => setIsTabBarHidden(false);
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal',
          title: contentDetails ? contentDetails.title : "Content",
          headerLargeTitleEnabled: false,
          headerTransparent: true,
          headerTitleStyle: {
            color: colorScheme === 'dark' ? '#fff' : '#000'
          },
        }}
      /> 
      <Stack.Toolbar placement='right'>
        <Stack.Toolbar.Button >
          Save
        </Stack.Toolbar.Button>
      </Stack.Toolbar>

      <ScrollView
        className='bg-background flex-1 pt-4'
        contentInsetAdjustmentBehavior='automatic'
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <TextInput 
          title="Title" 
          placeholder={contentDetails ? contentDetails.title : "Content"} 
          keyboardType='default' 
          autoCaptalize='words'
          value={title} 
          onChangeText={setTitle} 
        />

        <View className='mb-4'>
          <Label className='text-primary-text text-lg pl-5 mb-2'>Post Status</Label>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className='px-4'>
            {STATUS_OPTIONS.map(item => (
                <Chip 
                  size="lg" 
                  key={item} 
                  className='mr-2'
                  onPress={() => setStatusSelected(item)}
                  variant= {item.toLowerCase() === statusSelected.toLowerCase() ? "primary" : "secondary"}
                >
                  {item.capitalize()}
                </Chip>
            ))}
          </ScrollView>
        </View>

        <View className='mb-4'>
          <Label className='text-primary-text text-lg pl-5 mb-2'>Post Type</Label>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className='px-4'>
            {TYPE_OPTIONS.map(item => (
                <Chip 
                  size="lg" 
                  key={item} 
                  className='mr-2'
                  onPress={() => setTypeSelected(item)}
                  variant={item.toLowerCase() === typeSelected.toLowerCase() ? "primary" : "secondary"}
                >
                  {item.capitalize()}
                </Chip>
            ))}
          </ScrollView>
        </View>

        <TextInput 
          title="Caption" 
          placeholder='Enter Your Caption...'  
          keyboardType='default' 
          largeHeight={true} 
          autoCaptalize='sentences'
          value={caption} 
          onChangeText={setCaption} 
        />

        <TextInput 
          title="Script" 
          placeholder='Enter Your Script...'  
          keyboardType='default' 
          largeHeight={true} 
          autoCaptalize='sentences'
          value={script} 
          onChangeText={setScript} 
        />

        <TextInput 
          title="Link" 
          placeholder='Enter Your Link...'  
          keyboardType='default'  
          value={link} 
          onChangeText={setLink} 
        />

        <TextInput 
          title="Followers at Next Post?" 
          placeholder='Enter Your Followers...'  
          keyboardType='numeric'  
          value={followers} 
          onChangeText={setFollowers} 
        />


        <TextInput 
          title="Views at Next Post?" 
          placeholder='Enter Your Views...'  
          keyboardType='numeric'  
          value={views} 
          onChangeText={setViews} 
        />

        <TextInput 
          title="Likes at Next Post?" 
          placeholder='Enter Your Likes...'  
          keyboardType='numeric'  
          value={likes} 
          onChangeText={setLikes} 
        />

        <TextInput 
          title="Comments at Next Post?" 
          placeholder='Enter Your Comments...'  
          keyboardType='numeric'  
          value={comments} 
          onChangeText={setComments} 
        />

        <TextInput 
          title="Shares at Next Post?" 
          placeholder='Enter Your Shares...'  
          keyboardType='numeric'  
          value={shares} 
          onChangeText={setShares} 
        />
      </ScrollView>
    </>
  )
}

export default ContentDetails