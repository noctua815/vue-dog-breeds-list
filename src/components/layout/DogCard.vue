<template>
	<div class="dog-card" @dblclick="liked">
		<div class="dog-card__photo">
			<img class="dog-card__img"
			     :src="img"
			     alt="Dog">
		</div>
		<div class="dog-card__action">
			<div :class="['dog-card__like', {'is-liked': like}]" @click="liked"></div>
		</div>
	</div>
</template>

<script>
  export default {
    props: {
      img: {
      	type: String
      }
    },
    data () {
      return {
        like: false
      }
    },
    
    methods: {
      liked() {
        this.like = !this.like
      }
    }
  }
</script>

<style lang="scss">
	.dog-card {
		width: calc(50% - 16px);
		margin: 8px;
		padding: 16px 16px 32px;
		border-radius: 4px;
		border: 1px solid rgba(black, 0.1);
		background-color: var(--light);
		
		&__photo {
			position: relative;
			width: 100%;
			margin-bottom: 16px;
			background-color: rgba(black, 0.1);
			border-radius: 4px;
			overflow: hidden;
			
			&:after {
				content: '';
				padding-top: 100%;
				float: left;
			}
		}
		
		
		&__img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center top;
		}
		
		&__action {}
		
		&__like {
			position: relative;
			width: 32px;
			height: 32px;
			margin: 0 auto;
			cursor: pointer;
			
			&:before,
			&:after {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
			}
			
			&:before {
				background: url('../../assets/heart.svg') no-repeat center/contain;
			}
			
			&:after {
				opacity: 0;
				transform: scale(0.5);
				transition: all 0.3s ease;
				background: url('../../assets/heart-fill.svg') no-repeat center/contain;
			}
			
			&.is-liked {
				&:after {
					opacity: 1;
					transform: scale(1);
				}
			}
		}
	}
</style>
