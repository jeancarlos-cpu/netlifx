import axios from 'axios';
import serializeVideosData from '../utils/serializeVideosData';

export default async function fetchVideos(params: string) {
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
