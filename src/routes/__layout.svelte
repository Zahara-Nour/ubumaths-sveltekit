<script context="module">
	import ghostAPI from '$lib/ghost'
	export const load = async ({ fetch }) => {
		const tags = await ghostAPI.tags.browse({
			order: 'slug ASC',
			filter: 'description:Traces',
		})
		console.log('tags', tags)

		return { props: { tags } }
	}
</script>

<script>
	import TopAppBar, { Row, Section, Title as TitleBar } from '@smui/top-app-bar'
	import IconButton from '@smui/icon-button'
	import Drawer, {
		AppContent,
		Content,
		Header,
		Title,
		Subtitle,
		Scrim,
	} from '@smui/drawer'
	import Button, { Label } from '@smui/button'
	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list'
	import { H6 } from '@smui/common/elements'
	import { darkmode } from '../lib/stores'
	import { goto } from '$app/navigation'

	export let tags
	let active = 'Inbox'
	let prominent = false
	let dense = false
	let secondaryColor = false
	let miniWindow = false
	let showDrawer = false
	const setMiniWindow = () => (miniWindow = window.innerWidth < 600)
	const toggleDrawer = () => {
		showDrawer = !showDrawer
	}
	const switchTheme = () => darkmode.update((mode) => !mode)

	const setActive = (value) => {
		active = value
		showDrawer = false
	}

	const changeRoute = (route) => goto(route)
</script>

<svelte:window on:resize="{setMiniWindow}" />
<svelte:head>
	{#if $darkmode}
		<link rel="stylesheet" href="/smui-dark.css" />
	{:else}
		<link rel="stylesheet" href="/smui.css" />
	{/if}
</svelte:head>

<Drawer variant="modal" bind:open="{showDrawer}">
	<Header>
		<TitleBar>Ubumaths</TitleBar>
		<Subtitle>Les maths de la chandelle verte</Subtitle>
	</Header>
	<Content>
		<List>
			{#each tags as tag}
				<Item
					href="javascript:void(0)"
					on:click="{() => {
						setActive(tag.name)
						goto(`/traces/${tag.slug}`)
					}}"
					activated="{active === tag.name}"
				>
					<Text>{tag.name}</Text>
				</Item>
			{/each}
		</List>
	</Content>
</Drawer>

<Scrim />
<AppContent class="app-content">
	<TopAppBar
		variant="static"
		prominent="{prominent}"
		dense="{dense}"
		color="{secondaryColor ? 'secondary' : 'primary'}"
	>
		<Row>
			<Section>
				<Title>Ubumaths</Title>
			</Section>
			<Section align="end" toolbar>
				<IconButton class="material-icons" aria-label="Download"
					>file_download</IconButton
				>
				<IconButton class="material-icons" aria-label="Print this page"
					>print</IconButton
				>
				{#if $darkmode}
					<IconButton
						class="material-icons"
						aria-label="Bookmark this page"
						on:click="{switchTheme}">light_mode</IconButton
					>
				{:else}
					<IconButton
						class="material-icons"
						aria-label="Bookmark this page"
						on:click="{switchTheme}">dark_mode</IconButton
					>
				{/if}
				{#if miniWindow}
					<IconButton on:click="{toggleDrawer}" class="material-icons"
						>menu</IconButton
					>
				{/if}
			</Section>
		</Row>
	</TopAppBar>
	<slot />
</AppContent>

<style>
</style>
