<script>
	import '../styles.css';
</script>

<main>
	<nav>
		<div class="links">
			<a href="/">home</a>
			<a href="/recipe-read">recipe-read</a>
		</div>
		<h2 class="logo">Receitas</h2>
	</nav>
	<slot />
</main>

<style>
	.logo {
		text-align: center;
		margin: 0px auto 5px;
		font-family: 'Ingrid Darling';
		font-size: 2.5rem;
	}
</style>
