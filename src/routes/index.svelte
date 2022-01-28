
<script>
	import Button, { Label } from '@smui/button';

	let convertLatexToMarkup
    let markup = ''
    import('https://unpkg.com/mathlive/dist/mathlive.min.mjs')
    .then(m => {convertLatexToMarkup= m.convertLatexToMarkup})
    .catch(e=> {console.log('erreur', e)})
        
    $:if (convertLatexToMarkup) {
        markup = convertLatexToMarkup('\\frac{3}{4}')
    }
    

  
    // let markup = convertLatexToMarkup('\\frac{3}{4}');
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button>
	<Label>Default</Label>
</Button>
{@html markup}
