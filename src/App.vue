<template>
  <metainfo>
    <template
      v-slot:title="{ content }"
    >{{ content ? `${this.$filters.localizeFilter(content)} | ${this.$filters.localizeFilter('ProjectTitle')}` : `${this.$filters.localizeFilter('ProjectTitle')}` }}</template>
  </metainfo>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  computed: {
    layout() {
      if (this.$route.meta.layout) {
        return `${this.$route.meta.layout}-layout`;
      }
      return 'empty-layout';
    },
  },
  components: {
    EmptyLayout, MainLayout,
  },
};
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
