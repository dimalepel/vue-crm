<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link
          to="/history"
          class="breadcrumb">{{ $filters.localizeFilter('HistoryTitle') }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income'
          ? $filters.localizeFilter('Income')
          : $filters.localizeFilter('Outcome') }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card"
            :class="record.type === 'income' ? 'green' : 'red'"
          >
            <div class="card-content white-text">
              <p>{{ $filters.localizeFilter('Description') }}: {{ record.description }}</p>
              <p>{{ $filters.localizeFilter('Amount') }}: {{ $filters.currencyFilter(record.amount) }}</p>
              <p>{{ $filters.localizeFilter('CategoryTitle') }}: {{ record.categoryName }}</p>

              <small>{{ $filters.dateFilter(record.date, 'datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{ $filters.localizeFilter('RecordNotFoundStart') }} id=<strong>{{ $route.params.id }}</strong> {{ $filters.localizeFilter('RecordNotFoundEnd') }}.</p>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);

    this.record = {
      ...record,
      categoryName: category.title,
    };

    this.loading = false;
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
  },
};
</script>
