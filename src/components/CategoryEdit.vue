<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $filters.localizeFilter('EditTitle') }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select
            ref="select"
            v-model="current"
          >
            <option
              v-for="cat of categories"
              :key="cat.id"
              :value="cat.id"
            >{{ cat.title }}</option>
          </select>
          <label>{{ $filters.localizeFilter('SelectCategory') }}</label>
        </div>

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
          >{{ $filters.localizeFilter('MinimumValue') }} {{ v$.limit.minValue.$params.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $filters.localizeFilter('UpdateButtonText') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { minValue, required } from '@vuelidate/validators';

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    select: null,
    v$: useVuelidate(),
    title: '',
    limit: 1,
    current: null,
  }),
  validations: () => ({
    title: { required },
    limit: { minValue: minValue(100) },
  }),
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId);
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  unmounted() {
    if (this.select && this.select.unmount) {
      this.select.unmount();
    }
  },
  methods: {
    async submitHandler() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }

      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit,
      };

      try {
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message(this.$filters.localizeFilter('CategoryUpdate'));
        this.$emit('updated', categoryData);
      } catch (e) {}
    },
  },
};
</script>
