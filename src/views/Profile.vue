<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: v$.name.$dirty && !v$.name.required.$response }"
        >
        <label for="description">Имя</label>
        <span
          class="helper-text invalid"
          v-if="v$.name.$dirty && !v$.name.required.$response"
        >Имя не должно быть пустым</span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  data: () => ({
    v$: useVuelidate(),
    name: '',
  }),
  validations: () => ({
    name: { required },
  }),
  mounted() {
    this.name = this.info.name;
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
        });
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
