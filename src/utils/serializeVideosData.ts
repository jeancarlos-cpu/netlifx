export default function serializeVideosData(data: VideosData) {
  return data.items.map((video) => {
    const id = video.id.videoId ? video.id.videoId : video.id;
    const imgUrl = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
    return {
      id,
      imgUrl,
      title: video.snippet.title,
      description: video.snippet.description,
      publishedAt: video.snippet.publishedAt,
      channelTitle: video.snippet.channelTitle,
      viewCount: video?.statistics?.viewCount ?? 0,
    };
  });
}
