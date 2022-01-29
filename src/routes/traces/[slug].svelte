<script context="module">
	import ghostAPI from '$lib/ghost'
	export const load = async ({ params, fetch }) => {
		// The params object will contain all of the parameters in the route.

		const { slug } = params
		const posts = await ghostAPI.posts.browse({
			limit: 5,
			filter: `tag:${slug}`,
		})

		if (!posts || !posts.length) {
			// We can create a custom error and return it.
			// SvelteKit will automatically show us an error page that we'll learn to customise later on.
			const error = new Error(
				`Les posts de la classe ${slug} n'ont pas été retrouvés.`,
			)
			return { status: 404, error }
		} else {
			return { props: { posts } }
		}
	}
</script>

<script>
	import { onMount } from 'svelte'

	export let posts
	console.log('posts', posts)

	// onMount(async () => {
	// 	// Install the marked package first!
	// 	// Run this command: npm i marked

	// 	// We're using this style of importing because "marked" uses require, which won't work when we import it with SvelteKit.
	// 	// Check the "How do I use a client-side only library" in the FAQ: https://kit.svelte.dev/faq
	// 	const marked = (await import('marked')).default
	// 	content = marked(post.content)
	// })
</script>

<svelte:head>
	<link rel="stylesheet" href="/ghost.css" />
</svelte:head>

{#each posts as post}
	<div class="gh-canvas">
		<h1 class="font-bold">{post.title}</h1>
		<div class="gh-content ">
			{@html post.html}
		</div>
	</div>
{/each}

<style>
	h1 {
		margin: 2em 0 0.5em;
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: -0.015em;
		line-height: 1.15;
	}
</style>
