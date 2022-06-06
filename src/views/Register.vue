<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ $filters.localizeFilter('ProjectTitle') }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: (v$.email.$dirty && !v$.email.required.$response)
          || (v$.email.$dirty && !v$.email.email.$response) }"
        >
        <label for="email">{{ $filters.localizeFilter('EmailLabel') }}</label>
        <small
          v-if="v$.email.$dirty && !v$.email.required.$response"
          class="helper-text invalid"
        >{{ $filters.localizeFilter('EmptyEmailError') }}</small>
        <small
          v-else-if="v$.email.$dirty && !v$.email.email.$response"
          class="helper-text invalid"
        >{{ $filters.localizeFilter('InvalidEmailError') }}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{ invalid: (v$.password.$dirty && !v$.password.required.$response)
          || (v$.password.$dirty && !v$.password.minLength.$response) }"
        >
        <label for="password">{{ $filters.localizeFilter('PasswordLabel') }}</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && !v$.password.required.$response"
        >{{ $filters.localizeFilter('EmptyPasswordError') }}</small>
        <small
          class="helper-text invalid"
          v-else-if="v$.password.$dirty && !v$.password.minLength.$response"
        >{{ $filters.localizeFilter('PasswordMinLengthError') }} {{ v$.password.minLength.$params.min }} символов</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: (v$.name.$dirty && !v$.name.required.$response)
          || (v$.name.$dirty && !v$.name.minLength.$response) }"
        >
        <label for="name">{{ $filters.localizeFilter('NameFieldLabel') }}</label>
        <small
          class="helper-text invalid"
          v-if="v$.name.$dirty && !v$.name.required.$response"
        >{{ $filters.localizeFilter('EmptyNameFieldError') }}</small>
        <small
          class="helper-text invalid"
          v-else-if="v$.name.$dirty && !v$.name.minLength.$response"
        >{{ $filters.localizeFilter('NameMinLengthError') }} {{ v$.name.minLength.$params.min }} символов</small>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            v-model="agree"
          />
          <span>{{ $filters.localizeFilter('AgreeRules') }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ $filters.localizeFilter('RegisterButtonText') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ $filters.localizeFilter('YesAccount') }}
        <router-link to="/login">{{ $filters.localizeFilter('EnterButtonText') }}!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import { useMeta } from 'vue-meta';

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
  setup() {
    useMeta({
      title: 'RegisterPageTitle',
    });
  },
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
