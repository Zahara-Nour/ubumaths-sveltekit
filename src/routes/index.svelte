<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/posts');
		const data = await res.json();

		return { props: { posts: data } };
	};
</script>

<script>
	import Button, { Label } from '@smui/button';
    export let posts;
	let convertLatexToMarkup;
	let markup = '';
	import('https://unpkg.com/mathlive/dist/mathlive.min.mjs')
		.then((m) => {
			convertLatexToMarkup = m.convertLatexToMarkup;
		})
		.catch((e) => {
			console.log('erreur', e);
		});

	$: if (convertLatexToMarkup) {
		markup = convertLatexToMarkup('\\frac{3}{4}');
	}

	// let markup = convertLatexToMarkup('\\frac{3}{4}');
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button>
	<Label>Default</Label>
</Button>
{@html markup}

<img src="https://blog.ubumaths.net/content/images/2022/01/Untitled--9--1.jpg"
        class="kg-image" alt loading="lazy" 
        srcset="https://blog.ubumaths.net/content/images/size/w600/2022/01/Untitled--9--1.jpg 600w,
        https://blog.ubumaths.net/content/images/size/w1000/2022/01/Untitled--9--1.jpg 1000w,
        https://blog.ubumaths.net/content/images/size/w1600/2022/01/Untitled--9--1.jpg 1600w,
        https://blog.ubumaths.net/content/images/size/w2400/2022/01/Untitled--9--1.jpg 2400w" sizes="(min-width:
        720px) 720px">

{#each posts as post}
	<div
		class=''
	>
		<h4 class="font-bold">{post.title}</h4>
		{@html post.html}
	</div>
{/each}
