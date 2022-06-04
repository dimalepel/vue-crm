//import localizeFilter from '@/filters/localize.filter';

export default {
  beforeMount: (element, { value }) => {
    M.Tooltip.init(element, {
      html: value.text,
      position: value.position ? value.position : 'top',
    });
  },
  unmounted: (element) => {
    try {
      const tooltip = M.tooltip.getInstance(element);

      if (tooltip && tooltip.destroy) {
        tooltip.destroy();
      }
    } catch (e) {}
  },
};
