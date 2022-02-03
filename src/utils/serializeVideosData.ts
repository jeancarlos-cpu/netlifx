export default function serializeVideosData(data: VideosData) {
  return data.items.map((video) => ({
    imgUrl: video.snippet.thumbnails.high.url,
    id: video.id.videoId ? video.id.videoId : video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    publishedAt: video.snippet.publishedAt,
    channelTitle: video.snippet.channelTitle,
    viewCount: video?.statistics?.viewCount ?? 0,
  }));
}
