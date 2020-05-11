export interface Post {
  subreddit?: string;
  authorFullname?: string;
  title?: string;
  subredditNamePrefixed?: string;
  thumbnailWidth?: number;
  thumbnail?: string;
  created?: number;
  previewImage?: string;
  previewVideo?: string;
  selfText?: string;
  selfTextHtml?: string;
  over18?: boolean;
  permalink?: string;
  url?: string;
  createdUtc?: number;
  isVideo?: boolean;
  videoUrl?: string;
  mediaEmbed?: string;
}
