<template>
	<div class="nav-bar">
		<div class="wrapper nav-bar__wrapper">
			<div class="nav-bar__link">
				<router-link to="/">Home</router-link>
			</div>
			<div class="nav-bar__link">
				<v-select :options="breeds" @select="selectBreed" :clear="false" :changeTitle="false"></v-select>
			</div>
			<div class="nav-bar__link">
				<router-link :to="{ name: 'favourites' }">Favourites</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default {
		computed: {
			...mapState({
				breeds: state => state.breeds
			})
		},
		
		created () {
			this.$store.dispatch('loadBreeds')
		},
		
		methods: {
			selectBreed (val) {
				this.$router.push({name: 'breed', params: {breed: val}})
				this.$root.$emit('updateBreedPage', val)
			}
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
			font-weight: bold;
			
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

