import Parser from 'rss-parser';

const parser = new Parser();

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
  categories?: string[];
  isoDate?: string;
}

export async function getMediumPosts(username: string = 'vedhasagaran7', limit: number = 5): Promise<MediumPost[]> {
  try {
    const feed = await parser.parseURL(`https://medium.com/feed/@${username}`);

    const posts = feed.items.slice(0, limit).map(item => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      content: item.content || '',
      contentSnippet: item.contentSnippet || '',
      guid: item.guid || '',
      categories: item.categories,
      isoDate: item.isoDate,
    }));

    return posts;
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
}
