<template>
	<div class="page">
		<h1>Favourites</h1>

		<div class="page-content">
			<div class="dogs-list" v-if="favourites.length">
				<dog-card v-for="(dog, i) in favourites" :key="`dog_${i}`" :data="dog" :isLiked="true"/>
			</div>
			<div class="error-msg" v-else>You have not favourites photo</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'favourites',

  computed: {
    ...mapState([
      'favourites'
    ])
  }
}
</script>

<style>

</style>
