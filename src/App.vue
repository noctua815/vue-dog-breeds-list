<template>
	<div id="app" class="app">
		<nav-bar></nav-bar>
		
		<div class="container">
			<div class="wrapper">
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
	import NavBar from '@/components/layout/NavBar'
	
  export default {
    name: 'App',
	  components: {
      NavBar
	  }
  }
</script>

<style lang="scss">
	:root {
		--light: #F9F8F7;
		--dark: #000022;
		--pink: #C42847;
		--blue: #3454D1;
		--green: #34D1BF;
	}
	
	body {
		margin: 0;
		padding: 0;
		background-color: white;
	}
	
	* {
		box-sizing: border-box;
	}
	
	.app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		font-size: 16px;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.container {
		position: relative;
		width: 100%;
		padding: 30px 0;
	}
	
	.wrapper {
		width: 100%;
		padding: 0 48px;
		
		@media (max-width: 768px){
			padding: 0 24px;
		}
		
		@media (max-width: 600px){
			padding: 0 12px;
		}
	}
	
	h1, h2 {
		font-weight: normal;
	}
	
	.dogs-list {
		display: flex;
		flex-wrap: wrap;
		margin: -8px;
	}
	
</style>
