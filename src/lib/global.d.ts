declare type VideosData = {
  items: {
    id: { videoId: string; kind: string } & string;
    snippet: {
      publishedAt: string;
      channelTitle: string;
      title: string;
      description: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
    };
    statistics?: {
      viewCount: string;
    };
  }[];
};
