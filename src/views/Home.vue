<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter('BillTitle') }}</h3>

      <button
        @click="refresh"
        class="btn waves-effect waves-light btn-small"
        v-tooltip="{ text: this.$filters.localizeFilter('UpdateButtonText'), position: 'left' }"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">

      <HomeBill
        :rates="currency.rates"
      />

      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      />

    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill';
import HomeCurrency from '@/components/HomeCurrency';
import Loader from '@/components/app/Loader';
import { useMeta } from 'vue-meta';

export default {
  name: 'home',
  data: () => ({
    loading: true,
    currency: null,
  }),
  setup() {
    useMeta({
      title: 'BillTitle',
    });
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
  },
  components: {
    Loader,
    HomeBill,
    HomeCurrency,
  },
};
</script>
