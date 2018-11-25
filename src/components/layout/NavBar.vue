<template>
	<div class="nav-bar">
		<div class="wrapper nav-bar__wrapper">
			<div class="nav-bar__link">
				<router-link to="/">Home</router-link>
			</div>
			<div class="nav-bar__link">
				<v-select></v-select>
			</div>
			<div class="nav-bar__link">
				<router-link :to="{ name: 'favourites' }">Favourites</router-link>
			</div>
		</div>
	</div>
</template>

<script>
  import VSelect from './Select'
  
  export default {
    components: {
      VSelect
    }
  }
</script>

<style lang="scss">
	.nav-bar {
		padding: 24px 0;
		background-color: var(--blue);
		box-shadow: 0 5px 0 rgba(black, 0.1);
		
		&__wrapper {
			display: flex;
			align-items: baseline;
		}
		
		&__link {
			margin-right: 30px;
			
			a {
				font-size: 16px;
				color: white;
				transition: color 0.3s;
				
				&:hover {
					text-decoration: none;
				}
			}
			
			&:last-child {
				margin-right: 0;
			}
		}
	}

</style>

