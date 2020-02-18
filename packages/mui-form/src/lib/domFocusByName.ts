function domFocusByName(name: string, baseFormName?: string): void {
  const selectors = [`[name="${name}"]`];
  const selectorsId = [`[id="muiform_${name}"]`]; // select by id (for mui-form's Select)
  if (baseFormName != null) {
    selectors.unshift(`div[aria-label="${baseFormName}"]`);
    selectorsId.unshift(`div[aria-label="${baseFormName}"]`);
  }

  // if id=muiform_xxx exists
  const firstElemId = document.querySelector(selectorsId.join(' '));
  if (firstElemId) {
    (firstElemId as HTMLElement).focus();
    return;
  }

  const firstElem = document.querySelector(selectors.join(' '));
  if (firstElem) {
    (firstElem as HTMLElement).focus();
  }
}

export default domFocusByName;
