export const watchScroll = (element: HTMLElement, callback: () => void, { offset = 300, inverse = false } = {}) => {
  const getOffsets = () => {
    const offsetTop = element.scrollTop;
    const offsetBottom = element.scrollHeight - element.offsetHeight - element.scrollTop;

    return { offsetTop, offsetBottom };
  };

  const getIsScrollable = () => element.scrollHeight !== element.offsetHeight;

  const watchIsActive = () => element.scrollHeight - element.offsetHeight > offset;

  element.addEventListener('scroll', () => {
    if (!watchIsActive()) {
      return;
    }

    const { offsetTop, offsetBottom } = getOffsets();

    if ((inverse && offsetTop <= offset) || (!inverse && offsetBottom <= offset)) {
      callback();
    }
  });

  return { getIsScrollable, getOffsets, watchIsActive };
};
