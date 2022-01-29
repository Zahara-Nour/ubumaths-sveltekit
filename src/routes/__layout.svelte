<script>
	import TopAppBar, { Row, Section, Title as TitleBar } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import Drawer, { AppContent, Content, Header, Title, Subtitle, Scrim } from '@smui/drawer';
	import Button, { Label } from '@smui/button';
	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
	import { H6 } from '@smui/common/elements';
	import { darkmode } from '../lib/stores';

	let active = 'Inbox';
	let prominent = false;
	let dense = false;
	let secondaryColor = false;
	let miniWindow = false;
	let showDrawer = false;
	const setMiniWindow = () => (miniWindow = window.innerWidth < 720);
	const toggleDrawer = () => {
		showDrawer = !showDrawer;
	};
	const switchTheme = () => darkmode.update((mode) => !mode);

	function setActive(value) {
		active = value;
		showDrawer = false;
	}

	$: console.log('theme', $darkmode);
</script>

<svelte:window on:resize={setMiniWindow} />
<svelte:head>
	{#if $darkmode}
		<link rel="stylesheet" href="/smui-dark.css" />
	{:else}
		<link rel="stylesheet" href="/smui.css" />
	{/if}
</svelte:head>

<Drawer variant="modal" bind:open={showDrawer}>
	<Header>
		<TitleBar>Super Mail</TitleBar>
		<Subtitle>It's the best fake mail app drawer.</Subtitle>
	</Header>
	<Content>
		<List>
			<Item
				href="javascript:void(0)"
				on:click={() => setActive('Inbox')}
				activated={active === 'Inbox'}
			>
				<Graphic class="material-icons" aria-hidden="true">inbox</Graphic>
				<Text>Inbox</Text>
			</Item>
			<Item
				href="javascript:void(0)"
				on:click={() => setActive('Star')}
				activated={active === 'Star'}
			>
				<Graphic class="material-icons" aria-hidden="true">star</Graphic>
				<Text>Star</Text>
			</Item>
			<Item
				href="javascript:void(0)"
				on:click={() => setActive('Sent Mail')}
				activated={active === 'Sent Mail'}
			>
				<Graphic class="material-icons" aria-hidden="true">send</Graphic>
				<Text>Sent Mail</Text>
			</Item>
			<Item
				href="javascript:void(0)"
				on:click={() => setActive('Drafts')}
				activated={active === 'Drafts'}
			>
				<Graphic class="material-icons" aria-hidden="true">drafts</Graphic>
				<Text>Drafts</Text>
			</Item>

			<Separator />
			<Subheader component={H6}>Labels</Subheader>
			<Item
				href="javascript:void(0)"
				on:click={() => setActive('Family')}
				activated={active === 'Family'}
			>
				<Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
				<Text>Family</Text>
			</Item>
			<Item
				href="javascript:void(0)"
				on:click={() => setActive('Friends')}
				activated={active === 'Friends'}
			>
				<Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
				<Text>Friends</Text>
			</Item>
			<Item
				href="javascript:void(0)"
				on:click={() => setActive('Work')}
				activated={active === 'Work'}
			>
				<Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
				<Text>Work</Text>
			</Item>
		</List>
	</Content>
</Drawer>

<Scrim />
<AppContent class="app-content">
	<TopAppBar variant="static" {prominent} {dense} color={secondaryColor ? 'secondary' : 'primary'}>
		<Row>
			<Section>
				<Title>Ubumaths</Title>
			</Section>
			<Section align="end" toolbar>
				<IconButton class="material-icons" aria-label="Download">file_download</IconButton>
				<IconButton class="material-icons" aria-label="Print this page">print</IconButton>
				{#if $darkmode}
					<IconButton class="material-icons" aria-label="Bookmark this page" on:click={switchTheme}
						>light_mode</IconButton
					>
				{:else}
					<IconButton class="material-icons" aria-label="Bookmark this page" on:click={switchTheme}
						>dark_mode</IconButton
					>
				{/if}
				{#if miniWindow}
					<IconButton on:click={toggleDrawer} class="material-icons">menu</IconButton>
				{/if}
			</Section>
		</Row>
	</TopAppBar>
	<slot />
</AppContent>

<style>
</style>
