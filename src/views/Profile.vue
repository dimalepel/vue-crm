<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter('ProfileTitle') }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: v$.name.$dirty && !v$.name.required.$response }"
        >
        <label for="description">{{ $filters.localizeFilter('NameFieldLabel') }}</label>
        <span
          class="helper-text invalid"
          v-if="v$.name.$dirty && !v$.name.required.$response"
        >{{ $filters.localizeFilter('EmptyNameFieldError') }}</span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $filters.localizeFilter('UpdateButtonText') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

export default {
  metaInfo: {
    title: 'Profile',
  },
  data: () => ({
    v$: useVuelidate(),
    name: '',
    isRuLocale: true,
  }),
  validations: () => ({
    name: { required },
  }),
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-RU';
    setTimeout(() => {
      M.updateTextFields();
    });
  },
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US',
        });
        this.$message('Профиль успешно обновлен');
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
