<script lang="ts">
	type Data = {
		tag: string;
		color: string;
	};

	export let data: Data;
</script>

<div class="tag" style={`background-color: ${data.color}`}>{data.tag}</div>

<style>
	.tag {
		background-color: #c0d733;
		color: #ffffff;
		text-align: center;
		border-radius: 10px;
		padding: 1rem 0.5rem;
	}
</style>
