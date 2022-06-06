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
          :class="{ invalid: (v$.password.$dirty && !v$.password.required.$response) }"
        >
        <label for="password">{{ $filters.localizeFilter('PasswordLabel') }}</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && !v$.password.required.$response"
        >{{ $filters.localizeFilter('EmptyPasswordError') }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ $filters.localizeFilter('EnterButtonText') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ $filters.localizeFilter('NoAccount') }}
        <router-link
          to="/register">{{ $filters.localizeFilter('RegisterButtonText') }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import messages from '@/utils/messages';
import { useMeta } from 'vue-meta';

export default {
  name: 'login',
  data: () => ({
    v$: useVuelidate(),
    email: '',
    password: '',
  }),
  validations: () => ({
    email: { required, email },
    password: { required },
  }),
  setup() {
    useMeta({
      title: 'LoginPageTitle',
    });
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(this.$filters.localizeFilter(messages[this.$route.query.message]));
    }
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
      };

      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
      } catch (e) {}
    },
  },
};
</script>
