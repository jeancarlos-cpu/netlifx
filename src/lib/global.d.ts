declare type VideosData = {
  items: {
    id: {
      videoId: string;
    };
    snippet: {
      publishedAt: string;
      title: string;
      description: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
    };
  }[];
};
