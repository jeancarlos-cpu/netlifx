export default function serializeVideosData(data: VideosData) {
  return data.items.map((video) => ({
    imgUrl: video.snippet.thumbnails.high.url,
    id: video.id.videoId,
  }));
}
