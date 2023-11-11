<div class="container">
	<div class="minor-container">
		<slot />
	</div>
</div>

<style>
	.container {
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.minor-container {
		width: 94%;
	}
</style>
