import axios from 'axios';
import serializeVideosData from '../utils/serializeVideosData';
import fakeData from '../../videos.dev.json';

export default async function fetchVideos(params: string) {
  if (process.env.NEXT_PUBLIC_ENV === 'development') {
    return serializeVideosData(fakeData);
  }
  try {
    const ytApiKey = process.env.YOUTUBE_API_KEY;
    const baseUrl = 'https://youtube.googleapis.com/youtube/v3';
    const { data } = await axios.get<VideosData>(
      `${baseUrl}/${params}&maxResults=25&key=${ytApiKey}`,
    );
    const videos = serializeVideosData(data);

    return videos;
  } catch {
    return [];
  }
}
