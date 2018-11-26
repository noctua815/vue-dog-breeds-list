<template>
	<div class="page">
		<h1>Home</h1>
		
		<div class="filtering">
			<v-select :options="currentBreeds" title="Filtering" class="dark" @select="selectBreed"></v-select>
		</div>
		<div class="page-content">
			<div class="dogs-list">
				<dog-card v-for="(dog, i) in dogList" :key="`dog_${i}`" :data="dog"/>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	
	export default {
		name: 'home',
		data () {
			return {
				filter: null,
				dogList: []
			}
		},
		
		computed: {
			...mapState([
				'dogs'
			]),
			
			...mapGetters([
				'currentBreeds',
				'filteringByBreed'
			])
			
		},
		
		created () {
			this.loadMore()
			window.addEventListener('scroll', this.handleScroll)
		},
		
		beforeDestroy () {
			window.removeEventListener('scroll', this.handleScroll)
		},
		
		methods: {
			handleScroll () {
				if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 10) {
					this.loadMore()
				}
			},
			
			loadMore () {
				this.dogList = this.dogs
				this.$store.dispatch('loadDogs')
			},
			
			selectBreed (val) {
				this.filter = val
				this.dogList = this.filteringByBreed(this.filter)
			}
		}
	}
</script>

<style>

</style>
