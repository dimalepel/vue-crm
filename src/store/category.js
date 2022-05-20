import firebase from 'firebase/compat/app';

export default {
  actions: {
    async createCategory({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch('getUserId');
        const category = await firebase.database().ref(`/users/${uid}/categories/`).push({ title, limit });
        return { title, limit, id: category.key };
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
