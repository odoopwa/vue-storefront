<template>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  methods: {
    toggleCategory (category) {
      const isSelected = this.value.includes(category.category_id)
      if (isSelected) {
        this.$emit('input', this.value.filter(categoryId => categoryId !== category.category_id))
      } else {
        this.$emit('input', [...this.value, category.category_id])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/variables/colors";

.categories {
  &__heading {
    width: 100%;
  }

  &__handler {
    display: flex;
    flex-wrap: wrap;
  }

  &__button {
    display: flex;
    align-items: center;
    margin-right: 15px;
    margin-bottom: 15px;
    border: 2px solid #333;
    transition: all 0.2s ease;

    &:hover,
    &--active {
      background: #333;
      color: #fff;
    }

    &--active {
      text-decoration: underline;
    }
  }

  &__button-text {
    display: block;
    margin-right: 15px;
  }
}
</style>
