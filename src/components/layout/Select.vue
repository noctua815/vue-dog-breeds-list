<template>
	<div :class="['select', {'is-opened': opened}]">
		<div class="select__head" @click="toggleOpen">Breed</div>
		<transition name="open-select">
			<div class="select__body" v-if="opened">
				<div class="select__item" v-for="(item, i) in arr" @click="selectItem(i)">{{ i }}</div>
			</div>
		</transition>
	
	</div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object
      }
    },
    data () {
      return {
        opened: false,
        arr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      }
    },
    
    methods: {
      toggleOpen () {
        this.opened = !this.opened
      },
      
      selectItem (item) {
        console.log('select', item)
        this.opened = false
      }
    }
  }
</script>

<style lang="scss">
	.select {
		position: relative;
		
		&__head {
			position: relative;
			max-width: 200px;
			padding-right: 24px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 16px;
			color: white;
			text-decoration: underline;
			cursor: pointer;
			
			&:hover {
				text-decoration: none;
			}
			
			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: 0;
				width: 12px;
				height: 12px;
				background: url('../../assets/down-arrow.svg') no-repeat center/contain;
				transition: transform 0.3s ease;
				transform: translateY(-50%);
			}
		}
		&__body {
			position: absolute;
			z-index: 1;
			background: white;
			width: auto;
			min-width: 100px;
			padding: 8px;
			box-shadow: 0 4px 4px rgba(black, 0.05);
			max-height: 300px;
			overflow: auto;
			
			&::-webkit-scrollbar {
				width: 4px;
			}
			
			&::-webkit-scrollbar-track {
				/*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
			}
			
			&::-webkit-scrollbar-thumb {
				background-color: rgba(black, 0.1);
				opacity: 0.5;
			}
		}
		
		&__item {
			margin-bottom: 8px;
			padding: 2px 0;
			color: var(--dark);
			font-size: 16px;
			text-decoration: underline;
			cursor: pointer;
			
			&:hover {
				text-decoration: none;
			}
			
			&:last-child {
				margin-bottom: 0;
			}
		}
		
		&.is-opened {
			.select__head {
				text-decoration: none;
				
				&:after {
					transform: translateY(-50%) rotate(180deg);
				}
			}
		}
	}
	
	.open-select-enter-active,
	.open-select-leave-active {
		transition: all .3s;
	}
	
	.open-select-enter,
	.open-select-leave-to {
		opacity: 0;
		transform: translateY(8px);
	}

</style>
