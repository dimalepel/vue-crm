<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="(record, idx) of records"
      :key="record.id"
    >
      <td>{{ idx + 1 }}</td>
      <td>{{ currencyFilter(record.amount) }}</td>
      <td>{{ dateFilter(record.date) }}</td>
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
          v-tooltip="'Посмотреть запись'"
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
