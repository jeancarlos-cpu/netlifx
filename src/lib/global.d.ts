declare type VideosData = {
  items: {
    id: {
      videoId: string;
    };
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
