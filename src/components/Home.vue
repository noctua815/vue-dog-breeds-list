<template>
	<div class="page">
		<h1>Home</h1>
		
		<div class="page-content">
			<div class="dogs-list" ref="list">
				<dog-card v-for="(dog, i) in dogs" :key="`dog_${i}`" :img="dog" />
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default {
		name: 'home',
		data () {
			return {}
		},
		
		computed: {
			...mapState({
				dogs: state => state.dogs
			})
		},
		
		created () {
			this.$store.dispatch('loadDogs')
			window.addEventListener('scroll', this.handleScroll)
		},
		
		mounted() {
		
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
			
			loadMore() {
				console.log('loadmore')
				this.$store.dispatch('loadDogs')
			}
		}
	}
</script>

<style>

</style>
