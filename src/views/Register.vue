<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: (v$.email.$dirty && !v$.email.required.$response)
          || (v$.email.$dirty && !v$.email.email.$response) }"
        >
        <label for="email">Email</label>
        <small
          v-if="v$.email.$dirty && !v$.email.required.$response"
          class="helper-text invalid"
        >Поле Email не должно быть пустым</small>
        <small
          v-else-if="v$.email.$dirty && !v$.email.email.$response"
          class="helper-text invalid"
        >Введите корректный Email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{ invalid: (v$.password.$dirty && !v$.password.required.$response)
          || (v$.password.$dirty && !v$.password.minLength.$response) }"
        >
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && !v$.password.required.$response"
        >Введите пароль</small>
        <small
          class="helper-text invalid"
          v-else-if="v$.password.$dirty && !v$.password.minLength.$response"
        >Пароль должен быть не менее {{ v$.password.minLength.$params.min }} символов</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: (v$.name.$dirty && !v$.name.required.$response)
          || (v$.name.$dirty && !v$.name.minLength.$response) }"
        >
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="v$.name.$dirty && !v$.name.required.$response"
        >Введите имя</small>
        <small
          class="helper-text invalid"
          v-else-if="v$.name.$dirty && !v$.name.minLength.$response"
        >Имя должно быть не менее {{ v$.name.minLength.$params.min }} символов</small>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            v-model="agree"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';

export default {
  name: 'register',
  data: () => ({
    v$: useVuelidate(),
    email: '',
    password: '',
    name: '',
    agree: false,
  }),
  validations: () => ({
    email: { required, email },
    password: { required, minLength: minLength(12) },
    name: { required, minLength: minLength(3) },
    agree: { checked: (value) => value },
  }),
  methods: {
    async submitHandler() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      try {
        await this.$store.dispatch('signup', formData);
        this.$router.push('/');
      } catch (e) {}
    },
  },
};
</script>
