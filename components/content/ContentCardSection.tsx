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
  filters
}: ContentCard & { filters: string[] }) => {

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
          {datePosted && filters.includes("date") &&
            <Chip>{formatDate(datePosted)}</Chip>
          }
        </View>

        {collaboratedWith && filters.includes("collab") &&
          <View className='flex-row mb-2 gap-2'>
            {collaboratedWith.map((item) =>
              <Chip>{item}</Chip>
            )}
          </View>
        }

        {followerCountAtPost && filters.includes("followers") &&
          <Card.Description>Followers At Post: {followerCountAtPost.toLocaleString()}</Card.Description>
        }
        {viewsAtNextPost && filters.includes("views") &&
          <Card.Description>24hr Views: {viewsAtNextPost.toLocaleString()}</Card.Description>
        }
        {likesAtNextPost && filters.includes("likes") &&
          <Card.Description>24hr Likes: {likesAtNextPost.toLocaleString()}</Card.Description>
        }
        {commentsAtNextPost && filters.includes("comments") &&
          <Card.Description>24hr Comments: {commentsAtNextPost.toLocaleString()}</Card.Description>
        }
        {sharesAtNextPost && filters.includes("shares") &&
          <Card.Description>24hr Shares: {sharesAtNextPost.toLocaleString()}</Card.Description>
        }
      </Card>
    </TouchableOpacity>
  )
}