<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ $filters.localizeFilter('Amount') }}</th>
      <th>{{ $filters.localizeFilter('Date') }}</th>
      <th>{{ $filters.localizeFilter('CategoryTitle') }}</th>
      <th>{{ $filters.localizeFilter('Type') }}</th>
      <th>{{ $filters.localizeFilter('Open') }}</th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="(record, idx) of records"
      :key="record.id"
    >
      <td>{{ idx + 1 }}</td>
      <td>{{ $filters.currencyFilter(record.amount) }}</td>
      <td>{{ $filters.dateFilter(record.date, 'date') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span class="white-text badge"
              :class="[record.typeClass]"
        >{{ record.typeText }}</span>
      </td>
      <td>
        <button
          class="btn-small btn"
          @click="$router.push('/detail/' + record.id)"
          v-tooltip="this.$filters.localizeFilter('ShowRecord')"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
  },
  directives: {
    tooltip: {
      beforeMount: (element, { value }) => {
        M.Tooltip.init(element, {
          html: value,
          position: 'top',
        });
      },
      beforeUpdate: (element) => {
        const tooltip = M.tooltip.getInstance(element);

        if (tooltip && tooltip.destroy) {
          tooltip.destroy();
        }
      },
    },
  },
};
</script>
