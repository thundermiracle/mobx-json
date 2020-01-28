function domFocusByName(name: string): void {
  const [firstElem] = document.getElementsByName(name) || [];
  if (firstElem) {
    firstElem.focus();
  }
}

export default domFocusByName;
