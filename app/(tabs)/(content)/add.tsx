import ChipRow from '@/components/content/ChipRow';
import TextInput from '@/components/TextInput';
import { STATUS_OPTIONS, TYPE_OPTIONS } from '@/constants/content';
import { TabBarContext } from '@/context/TabBarContext';
import { api } from "@/convex/_generated/api";
import { updateAlert } from '@/utils/alert';
import { formatDateToDatabase } from '@/utils/formatDate';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useMutation } from "convex/react";
import { router, Stack, useFocusEffect } from 'expo-router';
import { Label } from 'heroui-native';
import { use, useState } from 'react';
import { Platform, ScrollView } from 'react-native';

const AddContent = () => {
  // HIDE TAB BAR
  const { setIsTabBarHidden } = use(TabBarContext);

  useFocusEffect(() => {
    setIsTabBarHidden(true);
    return () => setIsTabBarHidden(false);
  });

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
  const [date, setDate] = useState(new Date())

  // DATABASE FUNCTIONS
  const updateContentDetails = useMutation(api.contentKanban.insertContent);

  const insertItem = async () => {
    let alertTitle = ""
    let alertBody = ""

    try {
      if (title) {
        await updateContentDetails({
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
          datePosted: formatDateToDatabase(date.toLocaleDateString())
        })

        alertTitle = "Success!"
        alertBody = "Content Successfully Updated"
        updateAlert(alertTitle, alertBody, () => router.dismissTo("/(content)"))
      } else {
        alertTitle = "Error!"
        alertBody = "Please fill out all required fields"
        updateAlert(alertTitle, alertBody, () => {})
      }
    } catch (error) {
      alertTitle = "Error"
      alertBody = `Content Failed to Update: ${error instanceof Error ? error.message + date : "Something went wrong"}`
      updateAlert(alertTitle, alertBody, () => {})
    }
  }

  return (
    <>
      <Stack.Toolbar placement='right'>
        <Stack.Toolbar.Button 
          variant='done'
          tintColor="#7f2ccb"
          onPress={insertItem}
        >
          Add
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
          title="Title*" 
          placeholder="Enter Your Title..." 
          keyboardType='default' 
          autoCaptalize='words'
          value={title} 
          onChangeText={setTitle} 
        />

        <ChipRow 
          title="Post Status*"
          array={STATUS_OPTIONS} 
          setter={setStatusSelected} 
          itemState={statusSelected}        
        />

        <ChipRow 
          title="Post Type*"
          array={TYPE_OPTIONS} 
          setter={setTypeSelected} 
          itemState={typeSelected}        
        />

        <Label className='text-primary-text text-lg pl-5 mb-2'>Post Date</Label>
        <RNDateTimePicker 
          mode="date"
          value={date}
          onChange={(event, selectedDate) => setDate(selectedDate ? selectedDate : new Date())}
          style={{ marginLeft: 8, marginBottom: 16}}
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

export default AddContent