<script lang="ts">
	export let href = "";
	export let color: string;
	export let filling: "ghost" | "outline" | "fill" = "fill";
	export let size: "xs" | "s" | "m" | "l" | "xl" = "m";

	export let style = "";
	export let icon = "";
	export let content: string;

	const tag = href ? "a" : "button";
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={tag}
	href={href || null}
	on:click
	class="element {filling} {size}"
	style="background:{color} {style}"
	>{#if icon}
		{@html icon}
	{/if}{content}</svelte:element
>

<style>
	.element {
		display: grid;
		place-content: center;
		font-weight: 500;
		color: white;
		background: var(--color);
		border-radius: 8px;
		outline: 1px solid transparent;
		border: none;
		transition: all 0.2s ease;
		text-decoration: none;
		cursor: pointer;
	}

	.element:hover {
		background: var(--color-darker);
	}

	.element:active {
		transform: scale(0.97);
	}

	/* Colors */
	.neutral {
		--color: var(--cl-neutral-l);
		--color-darker: var(--cl-neutral-d);
		--text-color: var(--cl-white);
	}

	.primary {
		--color: var(--cl-primary-500);
		--color-darker: var(--cl-primary-400);
		--text-color: var(--cl-white);
	}

	.accent {
		--color: var(--cl-accent-600);
		--color-darker: var(--cl-accent-500);
		--text-color: var(--cl-white);
	}

	/* Filling */
	.ghost {
		background: transparent;
	}

	.ghost:hover {
		background: var(--color);
	}

	.outline {
		background: transparent;
		outline: 1px solid var(--color);
	}

	.outline:hover {
		background: var(--color);
	}

	.fill {
		background: var(--color);
	}

	.fill:hover {
		background: var(--color-darker);
	}

	/* Sizes */
	.xs {
		font-size: var(--fs-s);
		padding: 0.2rem 0.2rem;
	}
	.s {
		font-size: var(--fs-s);
		padding: 0.5rem 0.5rem;
	}
	.m {
		font-size: var(--fs-b);
		padding: 0.75rem 0.75rem;
	}
	.l {
		padding: 1.8rem 1.8rem;
	}
</style>
