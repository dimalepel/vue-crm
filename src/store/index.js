import { createStore } from 'vuex';
import auth from './auth';
import info from './info';
import category from './category';
import record from './record';

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: (state) => state.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      const key = 'vK4iFh5HYuwT0Baf9ODMEfqqbst9U5ke';
      const myHeaders = new Headers();
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
      };
      const symbols = 'BYN,RUB,USD,EUR';
      const base = 'EUR';
      const url = `https://api.apilayer.com/fixer/latest?symbols=${symbols}&base=${base}`;

      myHeaders.append('apikey', key);
      const result = await fetch(url, requestOptions);
      return await result.json();
    },
  },
  modules: {
    auth,
    info,
    category,
    record,
  },
});
