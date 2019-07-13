<template>
  <div>
    <div class="brdr-bottom-1 brdr-cl-primary pb60">
      <h3 class="cl-accent ml30 mt50 summary-title">
        {{ $t('Order Summary') }}
      </h3>
      <product v-for="product in productsInCart" :key="product.sku" :product="product"/>
      <div v-if="productsInCart && productsInCart.length" class="checkout bg-cl-secondary pt10 serif cl-accent">

        <div v-for="(segment, index) in totals" :key="index" class="row pt15 pb20 pl30 pr55 " v-if="segment.code !== 'grand_total'">
          <div class="col-xs cl-accent">
            {{ segment.title }}
          </div>
          <div v-if="segment.value != null" class="col-xs align-right cl-accent h4">
            {{ segment.value | price }}
          </div>
        </div>

        <div class="row pt20 pb20 pl30 pr55 weight-400 h3" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
          <div class="col-xs">
            {{ segment.title }}
          </div>
          <div class="col-xs align-right">
            {{ segment.value | price }}
          </div>
        </div>
      </div>
    </div>
    <div class="py50 px25">
      <h4 class="h3 m0">
        {{ $t('Safety') }}
      </h4>
      <p class="cl-tertiary lh20">
        Wisconsin Jeans cumple con los estándares de seguridad de datos reconocidos y certificados a nivel mundial para garantizar la seguridad de tus datos e información. Wisconsin Jeans también cumple con los estrictos estándares de seguridad de datos exigidos por la ley española.
      </p>
      <h4 class="h3 mb0" v-if="!isVirtualCart">
        {{ $t('Shipping') }}
      </h4>
      <p class="cl-tertiary lh20" v-if="!isVirtualCart">
        Realizamos envíos dentro de la comunidad de Cataluña. La mayoría de los pedidos realizados antes de la 1:30 pm se envían el mismo día. Se aplican restricciones.
      </p>
      <h4 class="h3 mb0">
        {{ $t('Returns') }}
      </h4>
      <p class="cl-tertiary lh20">
        Aceptamos devoluciones en la mayoría de los artículos. Sin embargo, los artículos deben estar nuevos, sin abrir y recibidos nuevamente en Wisconsin Jeans dentro de los 30 días de la compra inicial.
      </p>
    </div>
  </div>
</template>

<script>
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary'
import Product from './Product'

export default {
  components: {
    Product
  },
  mixins: [CartSummary]
}
</script>

<style lang="scss" scoped>
  .summary-title {
    @media (max-width: 767px) {
      margin-left: 0;
    }
  }
  img {
    max-width: 100% !important;
  }
</style>
