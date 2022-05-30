<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую категорию.</router-link></p>

    <form
      class="form"
      v-else
      @submit.prevent="submitHandler"
    >
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
            v-for="cat of categories"
            :key="cat.id"
            :value="cat.id"
          >{{ cat.title }}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: v$.amount.$dirty && !v$.amount.minValue.$response }"
        >
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="v$.amount.$dirty && !v$.amount.minValue.$response"
        >Минимальное значение {{ v$.amount.minValue.$params.min }}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: v$.description.$dirty && !v$.description.required.$response }"
        >
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="v$.description.$dirty && !v$.description.required.$response"
        >Введите описание</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { minValue, required } from '@vuelidate/validators';
import { mapGetters } from 'vuex';

export default {
  name: 'record',
  data: () => ({
    v$: useVuelidate(),
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'income',
    amount: 1,
    description: '',
  }),
  validations: () => ({
    amount: { minValue: minValue(1) },
    description: { required },
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      M.updateTextFields();
      this.select = M.FormSelect.init(this.$refs.select);
    }, 0);
  },
  unmounted() {
    if (this.select && this.select.unmount) {
      this.select.unmount();
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }

      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async submitHandler() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }

      if (this.canCreateRecord) {
        const formData = {
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON(),
        };

        try {
          await this.$store.dispatch('createRecord', formData);
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount;

          await this.$store.dispatch('updateInfo', { bill });
          this.$message('Запись успешно создана');
          this.v$.$reset();
          this.amount = 1;
          this.description = '';
        } catch (e) {}
      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`);
      }
    },
  },
};
</script>
