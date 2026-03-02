import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
	const posts = await getCollection('blog');
	return rss({
		title: 'Lucas Wang | Blog',
		description: 'Software Engineering thoughts',
		site: context.site || 'https://vlucaswang.com',
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/blog/${post.id}/`,
		})),
	});
}
