export default {
  beforeMount: (element, { value }) => {
    M.Tooltip.init(element, { html: value });
  },
  unmounted: (element) => {
    const tooltip = M.tooltip.getInstance(element);

    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  },
};
