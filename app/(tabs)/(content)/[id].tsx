import ChipRow from '@/components/content/ChipRow';
import TextInput from '@/components/TextInput';
import { TabBarContext } from '@/context/TabBarContext';
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { use, useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, useColorScheme } from 'react-native';

const STATUS_OPTIONS = ['posted', 'idea', 'scheduled', 'draft', 'ad', 'ready'] as const
const TYPE_OPTIONS = ['reel', 'carousel', 'picture', 'trial reel', 'ad', 'voiceover'] as const

const ContentDetails = () => {
  const colorScheme = useColorScheme()
  const { id } = useLocalSearchParams<{ id: string }>()

  // DATABASE FUNCTIONS
  const contentDetails = useQuery(api.contentKanban.getContentDetails, { id: id as Id<"contentKanban"> });
  const updateContentDetails = useMutation(api.contentKanban.updateContentDetails);

  const updateDetails = async () => {
    let alertTitle = ""
    let alertBody = ""

    try {
      await updateContentDetails({
        id: id as Id<"contentKanban">, 
        title: title,
        caption: caption,
        script: script,
        link: link,
        collaboratedWith: collab.length !== 0 ? collab.split(",") : null,
        followerCountAtPost: parseInt(followers),
        viewsAtNextPost: parseInt(views),
        likesAtNextPost: parseInt(likes),
        commentsAtNextPost: parseInt(comments),
        sharesAtNextPost: parseInt(shares),
        status: statusSelected,
        type: typeSelected,
      })

      alertTitle = "Success!"
      alertBody = "Content Successfully Updated"
      updateAlert(alertTitle, alertBody, () => router.dismissTo("/(content)"))

    } catch (error) {
      alertTitle = "Error"
      alertBody = `Content Failed to Update: ${error instanceof Error ? error.message : "Something went wrong"}`
      updateAlert(alertTitle, alertBody, () => {})
    }
  }

  const updateAlert = (title: string, body: string, onPress: () => void) => {
    Alert.alert(title, body, [{
      text: "OK",
      onPress: onPress
    }])
  }

  // FIELDS STATE
  const [statusSelected, setStatusSelected] = useState<typeof STATUS_OPTIONS[number]>("idea")
  const [typeSelected, setTypeSelected] = useState<typeof TYPE_OPTIONS[number]>("reel")
  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [script, setScript] = useState("")
  const [link, setLink] = useState("")
  const [followers, setFollowers] = useState("")
  const [views, setViews] = useState("")
  const [likes, setLikes] = useState("")
  const [comments, setComments] = useState("")
  const [shares, setShares] = useState("")
  const [collab, setCollab] = useState("")

  useEffect(() => {
    if (contentDetails) {
      setStatusSelected(contentDetails.status)
      setTypeSelected(contentDetails.type ? contentDetails.type : "reel")
      setTitle(contentDetails ? contentDetails.title : "Content")
      setCaption(contentDetails.caption ? contentDetails.caption : "")
      setScript(contentDetails.script ? contentDetails.script : "")
      setLink(contentDetails.link ? contentDetails.link : "")
      setFollowers(contentDetails.followerCountAtPost ? contentDetails.followerCountAtPost.toString() : "")
      setViews(contentDetails.viewsAtNextPost ? contentDetails.viewsAtNextPost.toString() : "")
      setLikes(contentDetails.likesAtNextPost ? contentDetails.likesAtNextPost.toString() : "")
      setComments(contentDetails.commentsAtNextPost ? contentDetails.commentsAtNextPost.toString() : "")
      setShares(contentDetails.sharesAtNextPost ? contentDetails.sharesAtNextPost.toString() : "")
      setCollab(contentDetails.collaboratedWith ? contentDetails.collaboratedWith.join(", ") : "")
    }
  }, [contentDetails])
  
  // HIDE TAB BAR
  const { setIsTabBarHidden } = use(TabBarContext);

  useFocusEffect(() => {
    setIsTabBarHidden(true);
    return () => setIsTabBarHidden(false);
  });

  return (
    <>
      <Stack.Toolbar placement='right'>
        <Stack.Toolbar.Button 
          variant='done'
          tintColor="#7f2ccb"
          onPress={updateDetails}
        >
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

        <ChipRow 
          title="Post Status"
          array={STATUS_OPTIONS} 
          setter={setStatusSelected} 
          itemState={statusSelected}        
        />

        <ChipRow 
          title="Post Type"
          array={TYPE_OPTIONS} 
          setter={setTypeSelected} 
          itemState={typeSelected}        
        />

        <TextInput 
          title="Collab?" 
          placeholder='@meetcalapp, @theartofbarbell, ...'  
          keyboardType='default' 
          value={collab}  
          onChangeText={setCollab} 
        />

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