<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter('RecordHistoryTitle') }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{ $filters.localizeFilter('EmptyRecord') }}
      <router-link to="/record">{{ $filters.localizeFilter('NewRecord') }}.</router-link></p>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="this.$filters.localizeFilter('Back')"
        :next-text="this.$filters.localizeFilter('Next')"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable';
import Loader from '@/components/app/Loader';
import Paginate from 'vuejs-paginate-next';
import paginationMixin from '@/mixins/pagination.mixin';
import { Pie } from 'vue-chartjs';

export default {
  name: 'history',
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.setupPagination(this.records.map((record) => {
      return {
        ...record,
        categoryName: categories.find(cat => cat.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? this.$filters.localizeFilter('Income') : this.$filters.localizeFilter('Outcome'),
      };
    }));

    this.renderChart({
      labels: categories.map(cat => cat.title),
      datasets: [{
        label: 'Расходы по категориям',
        data: categories.map(cat => {
          return this.records.reduce((total, rec) => {
            if (rec.categoryId === cat.id && rec.type === 'outcome') {
              total += +rec.amount;
            }
            return total;
          }, 0);
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }],
    });

    this.loading = false;
  },
  components: {
    Loader,
    HistoryTable,
    Paginate,
  },
};
</script>
