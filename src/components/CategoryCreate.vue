<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$dirty && !v$.title.required.$response }"
          >
          <label for="name">{{ $filters.localizeFilter('TitleLabel') }}</label>
          <span
            class="helper-text invalid"
            v-if="v$.title.$dirty && !v$.title.required.$response"
          >{{ $filters.localizeFilter('EmptyCategoriesFieldError') }}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$dirty && !v$.limit.minValue.$response }"
          >
          <label for="limit">{{ $filters.localizeFilter('LimitLabel') }}</label>
          <span
            class="helper-text invalid"
            v-if="v$.limit.$dirty && !v$.limit.minValue.$response"
          >Минимальное значение {{ v$.limit.minValue.$params.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';

export default {
  data: () => ({
    v$: useVuelidate(),
    title: '',
    limit: 1,
  }),
  validations: () => ({
    title: { required },
    limit: { minValue: minValue(100) },
  }),
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }

      const formData = {
        title: this.title,
        limit: this.limit,
      };

      try {
        const category = await this.$store.dispatch('createCategory', formData);
        this.title = '';
        this.limit = 1;
        this.v$.$reset();
        this.$message('Категория была создана');
        this.$emit('created', category);
      } catch (e) {}
    },
  },
};
</script>
