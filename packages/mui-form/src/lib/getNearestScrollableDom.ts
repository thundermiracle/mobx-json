const getNearestScrollableDom = (
  baseDom: HTMLElement | null,
): HTMLElement | null => {
  if (baseDom == null) {
    return null;
  }

  const parentDom = baseDom.parentElement;
  if (parentDom == null) {
    return null;
  }

  const parentDomStyles = window.getComputedStyle(parentDom);
  if (
    parentDomStyles.overflow === 'auto' ||
    parentDomStyles.overflowX === 'auto' ||
    parentDomStyles.overflowY === 'auto'
  ) {
    return parentDom;
  }

  return getNearestScrollableDom(parentDom);
};

export default getNearestScrollableDom;
