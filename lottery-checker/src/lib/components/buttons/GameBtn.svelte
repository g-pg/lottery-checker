<script lang="ts">
	export let href: string;
	export let content: string;
	export let color = "var(--cl-light-grey)";
</script>

<a class="btn-wrapper" {href} style="background: var({color})">{content}</a>

<style>
	.btn-wrapper {
		color: white;
		font-weight: 600;
		text-transform: lowercase;
		padding: 0.6rem 0.5rem;
		min-width: 100px;
		text-align: center;
		border-radius: 6px;
		display: grid;
		place-content: center;
		width: fit-content;
		font-size: 0.875rem;
	}
</style>
