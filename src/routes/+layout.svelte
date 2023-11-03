<script>
	import '../styles.css';
</script>

<main>
	<nav>
		<div class="links">
			<a href="/">/home</a>
			<a href="/recipe/special-sushi">/recipe</a>
			<a href="/nrecipe">/nrecipe</a>
		</div>
		<h2 class="logo">Receitas</h2>
	</nav>
	<slot />
</main>

<style>
	.logo {
		text-align: center;
		margin: 0px auto 5px;
	}
</style>
