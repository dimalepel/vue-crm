<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'Доход' : 'Расход' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card"
            :class="record.type === 'income' ? 'green' : 'red'"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ currencyFilter(record.amount) }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ dateFilter(record.date, 'datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запись с id=<strong>{{ $route.params.id }}</strong> не найдена.</p>
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
    currencyFilter(value, currency = 'BYN') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
      }).format(value);
    },
    dateFilter(date, format = 'date') {
      const options = {};

      if (format.includes('date')) {
        options.day = '2-digit';
        options.month = 'long';
        options.year = 'numeric';
      }

      if (format.includes('time')) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.second = '2-digit';
      }

      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(date));
    },
  },
};
</script>
