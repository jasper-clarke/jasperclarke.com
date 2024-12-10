import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { bundledLanguages, getSingletonHighlighter } from 'shiki';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import { transformerNotationHighlight } from '@shikijs/transformers';

const theme = 'github-dark-high-contrast';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await getSingletonHighlighter({
				themes: [theme],
				// this loads ALL languages. Will get better preformance by only calling what you need. Example: ["css", "javascript"]
				langs: Object.keys(bundledLanguages)
			});
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					theme,
					transformers: [transformerNotationHighlight()]
				})
			);
			return `{@html \`${html}\` }`;
		}
	},
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug]
};

export default {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
};
