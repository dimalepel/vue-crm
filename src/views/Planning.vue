<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter('PlanningTitle') }}</h3>
      <h4>{{ $filters.currencyFilter(info.bill) }}</h4>
    </div>

    <Loader v-if="loading"/>

    <p class="center"
       v-else-if="!categories.length"
    >{{ $filters.localizeFilter('EmptyCategory') }} <router-link
      to="/categories">{{ $filters.localizeFilter('NewCategory') }}</router-link></p>

    <section v-else>
      <div
        v-for="cat of categories"
        :key="cat.id"
      >
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ $filters.currencyFilter(cat.spend) }} из {{ $filters.currencyFilter(cat.limit) }}
        </p>
        <div class="progress" v-tooltip="{ text: cat.tooltip }">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: `${cat.progressPercent}%`}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { useMeta } from 'vue-meta';

export default {
  name: 'planning',
  data: () => ({
    loading: true,
    categories: [],
  }),
  setup() {
    useMeta({
      title: 'PlanningTitle',
    });
  },
  computed: {
    ...mapGetters(['info']),
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.categories = categories.map((cat) => {
      const spend = records
        .filter((rec) => (rec.categoryId === cat.id))
        .filter((rec) => (rec.type === 'outcome'))
        .reduce((total, record) => {
          return total += +record.amount;
        }, 0);

      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red';

      const tooltipValue = cat.limit - spend;
      const tooltip = `${tooltipValue < 0 ? this.$filters.localizeFilter('ExceedingBy') : this.$filters.localizeFilter('Left')} ${this.$filters.currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      };
    });

    this.loading = false;
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
  },
};
</script>

<style scoped>
  .progress {
    height: 8px;
  }
</style>
