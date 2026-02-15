import { ContentCard } from '@/types/Content'
import '@/utils/capitalize'
import { getStatusColors, getTypeColors } from '@/utils/colors'
import { formatDate } from '@/utils/formatDate'
import { router } from 'expo-router'
import { Card, Chip } from 'heroui-native'
import { TouchableOpacity, View } from 'react-native'

export const ContentCardSection = ({
  _id,
  title,
  status,
  type,
  caption,
  script,
  collaboratedWith,
  datePosted,
  link,
  followerCountAtPost,
  viewsAtNextPost,
  likesAtNextPost,
  commentsAtNextPost,
  sharesAtNextPost,
}: ContentCard) => {

  return (
    <TouchableOpacity onPress={() => router.push(`/${_id}`)}>
      <Card className='mb-4'>
        <Card.Title key={_id} numberOfLines={2}>{title}</Card.Title>

        <View className='flex-row my-2 gap-2'>
          <Chip style={{ backgroundColor: getStatusColors(status)}}>
            {status.capitalize()}
          </Chip>
          {type && 
            <Chip style={{ backgroundColor: getTypeColors(type)}}>
              {type.capitalize()}
            </Chip>
          }
          {datePosted &&
            <Chip>{formatDate(datePosted)}</Chip>
          }
        </View>

        {collaboratedWith &&
          <View className='flex-row mb-2 gap-2'>
            {collaboratedWith.map((item) =>
              <Chip>{item}</Chip>
            )}
          </View>
        }

        {followerCountAtPost &&
          <Card.Description>Followers At Post: {followerCountAtPost}</Card.Description>
        }
        {viewsAtNextPost &&
          <Card.Description>24hr Views: {viewsAtNextPost}</Card.Description>
        }
        {likesAtNextPost &&
          <Card.Description>24hr Likes: {likesAtNextPost}</Card.Description>
        }
        {commentsAtNextPost &&
          <Card.Description>24hr Comments: {commentsAtNextPost}</Card.Description>
        }
        {sharesAtNextPost &&
          <Card.Description>24hr Shares: {sharesAtNextPost}</Card.Description>
        }
      </Card>
    </TouchableOpacity>
  )
}