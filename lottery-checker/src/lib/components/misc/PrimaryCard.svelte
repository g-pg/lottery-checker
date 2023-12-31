<script lang="ts">
	export let color: string;
	export let fill: boolean = false;
	export let style = "";
</script>

<div class="card" style="background:{color}; {style}" class:fill>
	<slot />
</div>

<style>
	.card {
		border-radius: 8px;
		padding: 1rem;
	}

	.fill {
		height: 91%;
		width: 100%;
	}
</style>
