<template>
  <div class="dog-card" @dblclick="liked">
    <div class="dog-card__photo">
      <img class="dog-card__img"
           :src="data.link"
           alt="Dog">
    </div>
    <div class="dog-card__action">
      <div :class="['dog-card__like', {'is-liked': isLiked}]" @click.stop="liked"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    data: {
      type: Object
    }
  },

  computed: {
    ...mapState([
      'favourites'
    ]),

    isLiked () {
      let isFav = false

      this.favourites.every(item => {
        if (item.link === this.data.link) {
          isFav = true
          return false
        }
        return true
      })

      return isFav
    }
  },

  methods: {
    liked () {
      if (this.isLiked) {
        this.$store.dispatch('removeFavourite', this.data)
      } else {
        this.$store.dispatch('addFavourite', this.data)
      }
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

    @media (max-width: 600px) {
      width: 100%;
      margin: 8px 0;
    }

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
