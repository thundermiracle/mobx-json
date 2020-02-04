function domFocusByName(name: string, baseFormName?: string): void {
  const selectors = [`[name="${name}"]`];
  if (baseFormName != null) {
    selectors.unshift(`form[name="${baseFormName}"]`);
  }

  const firstElem = document.querySelector(selectors.join(' '));
  if (firstElem) {
    (firstElem as HTMLElement).focus();
  }
}

export default domFocusByName;
