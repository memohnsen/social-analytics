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
        <Card.Body>
          <Card.Title key={_id} numberOfLines={2}>{title}</Card.Title>

          <View className='flex-row my-2 gap-2'>
            <Chip style={{ backgroundColor: getStatusColors(status)}}>
              <Chip.Label>{status.capitalize()}</Chip.Label>
            </Chip>
            {type ? (
              <Chip style={{ backgroundColor: getTypeColors(type)}}>
                <Chip.Label>{type.capitalize()}</Chip.Label>
              </Chip>
            ) : null}
            {datePosted && filters.includes("date") ? (
              <Chip>
                <Chip.Label>{formatDate(datePosted)}</Chip.Label>
              </Chip>
            ) : null}
          </View>

          {collaboratedWith?.length && filters.includes("collab") ? (
            <View className='flex-row mb-2 gap-2'>
              {collaboratedWith.map((item) =>
                <Chip key={item}>
                  <Chip.Label>{item}</Chip.Label>
                </Chip>
              )}
            </View>
          ) : null}

          {filters.includes("followers") && followerCountAtPost != null ? (
            <Card.Description>Followers At Post: {followerCountAtPost.toLocaleString()}</Card.Description>
          ) : null}
          {filters.includes("views") && viewsAtNextPost != null ? (
            <Card.Description>24hr Views: {viewsAtNextPost.toLocaleString()}</Card.Description>
          ) : null}
          {filters.includes("likes") && likesAtNextPost != null ? (
            <Card.Description>24hr Likes: {likesAtNextPost.toLocaleString()}</Card.Description>
          ) : null}
          {filters.includes("comments") && commentsAtNextPost != null ? (
            <Card.Description>24hr Comments: {commentsAtNextPost.toLocaleString()}</Card.Description>
          ) : null}
          {filters.includes("shares") && sharesAtNextPost != null ? (
            <Card.Description>24hr Shares: {sharesAtNextPost.toLocaleString()}</Card.Description>
          ) : null}
        </Card.Body>
      </Card>
    </TouchableOpacity>
  )
}