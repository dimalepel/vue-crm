<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">

    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      custom
      v-slot="{ href, isActive }"
    >
      <li
        :class="[ isActive && 'active' ]"
      >
        <a :href="href" class="waves-effect waves-orange pointer">{{ $filters.localizeFilter(link.title) }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: 'BillTitle', url: '/' },
      { title: 'HistoryTitle', url: '/history' },
      { title: 'PlanningTitle', url: '/planning' },
      { title: 'NewRecordTitle', url: '/record' },
      { title: 'CategoriesTitle', url: '/categories' },
    ],
  }),
};
</script>
