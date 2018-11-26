<template>
	<div :class="['select', {'is-opened': opened}]">
		<div class="select__head" @click="toggleOpen">{{ computetTitle }}</div>
		<div class="select__clear" v-if="computedClearButton" @click="clearSelect"></div>
		
		<transition name="open-select">
			<div class="select__body" v-if="opened">
				<div class="select__item" v-for="(item, i) in options" @click="selectItem(item)" :key="i">{{ item }}</div>
			</div>
		</transition>
	
	</div>
</template>

<script>
	export default {
		props: {
			options: {
				type: Array
			},
			
			title: {
				type: String,
				default: 'Breed'
			},
			
			changeTitle: {
				type: Boolean,
				default: true
			},
			
			clear: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
				opened: false,
				selected: null
			}
		},
		
		computed: {
			computetTitle () {
				return this.selected || this.title
			},
			
			computedClearButton () {
				return this.clear && this.selected
			}
		},
		
		methods: {
			toggleOpen () {
				this.opened = !this.opened
			},
			
			selectItem (item) {
				this.opened = false
				this.selected = item
				this.$emit('select', item)
			},
			
			clearSelect() {
				this.selected = null
				this.selectItem(null)
			}
		}
	}
</script>

<style lang="scss">
	.select {
		position: relative;
		display: inline-flex;
		
		&__head {
			position: relative;
			min-width: 80px;
			max-width: 200px;
			padding-right: 24px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 16px;
			color: white;
			text-transform: capitalize;
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
		
		&__clear {
			position: absolute;
			z-index: 1;
			top: 50%;
			right: -30px;
			width: 20px;
			height: 20px;
			background: url('../../assets/close.svg') no-repeat center/10px 10px;
			cursor: pointer;
			transition: background-color 0.3s ease;
			transform: translateY(-50%);
			
			&:hover {
				background-color: rgba(black, 0.05);
			}
		}
		
		&__body {
			position: absolute;
			left: 0;
			top: calc(100% + 8px);
			z-index: 1;
			background: white;
			width: auto;
			min-width: 160px;
			padding: 8px;
			box-shadow: 0 4px 4px rgba(black, 0.1);
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
			transition: color 0.3s ease;
			text-transform: capitalize;
			cursor: pointer;
			
			&:hover {
				color: var(--pink);
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
		
		&.dark {
			.select__head {
				color: var(--dark);
				
				&:after {
					background-image: url('../../assets/down-arrow-dark.svg');
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
