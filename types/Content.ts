export interface ContentCard {
    _id: string
    title: string
    status: 'posted' | 'idea' | 'scheduled' | 'draft' | 'ad' | 'ready'
    type?: 'reel' | 'carousel' | 'picture' | 'trial reel' | 'ad' | 'voiceover' | null
    caption?: string | null
    script?: string | null
    collaboratedWith?: string[] | null
    datePosted?: string | null
    link?: string | null
    followerCountAtPost?: number | null
    viewsAtNextPost?: number | null
    likesAtNextPost?: number | null
    commentsAtNextPost?: number | null
    sharesAtNextPost?: number | null
}