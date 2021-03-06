export default {
  install: (App) => {
    App.config.globalProperties.$message = function (html) {
      M.toast({ html });
    };

    App.config.globalProperties.$error = function (html) {
      M.toast({
        html: `[${this.$filters.localizeFilter('Error')}]: ${html}`,
      });
    };
  },
};
