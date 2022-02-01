export default function serializeVideosData(data: VideosData) {
  return data.items.map(({ snippet }) => ({
    imgUrl: snippet.thumbnails.high.url,
  }));
}
