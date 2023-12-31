<script>
	import leafIcon from "$lib/assets/svg/four-leaf.svg?raw";
</script>

<div class=" nav-wrapper">
	<div class="page-title-wrapper">
		<h1>Resultados da Loteria</h1>
		<div class="leaf-icon">
			{@html leafIcon}
		</div>
	</div>

	<nav>
		<ul>
			<li><a href="">Home</a></li>
			<li><a href="">Conferir</a></li>
			<li><a href="">Surpresinha</a></li>
			<li><a href="">Contribuir</a></li>
		</ul>
	</nav>
</div>

<style>
	.nav-wrapper {
		padding: 1rem;
		display: flex;
		align-items: center;
	}

	.nav-wrapper h1 {
		color: var(--cl-main);
		line-height: 1.5;
	}
	.page-title-wrapper {
		display: flex;
		/* align-items: center; */
		gap: 0.5rem;
	}

	.leaf-icon :global(*) {
		width: 50px;
		height: 50px;
		color: var(--cl-megasena);
	}

	nav {
		margin-left: auto;
	}

	nav ul {
		display: flex;
		gap: 1.5rem;
	}
</style>
