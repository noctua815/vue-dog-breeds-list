<template>
	<div class="page">
		<h1>Breed: {{ breed }}</h1>
		
		<div class="page-content">
			<div class="dogs-list" v-if="currentBreed.length">
				<dog-card v-for="(dog, i) in currentBreed" :key="`dog_${i}`" :data="dog"/>
			</div>
			<div class="error-msg" v-else>Nothing found</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default {
		name: 'breed',
		data () {
			return {
				breed: null
			}
		},
		
		computed: {
			...mapState([
				'currentBreed'
			])
		},
		
		created () {
			this.breed = this.$route.params.breed
			this.getBreed(this.breed)
			this.$root.$on('updateBreedPage', (val) => this.getBreed(val))
		},
		
		beforeDestroy () {
			this.$root.$off('updateBreedPage')
			this.$store.commit('CLEAR_CURRENT_BREED')
		},
		
		methods: {
			getBreed(val) {
				this.$store.dispatch('loadBreed', val)
			}
		}
	}
</script>

<style>

</style>
