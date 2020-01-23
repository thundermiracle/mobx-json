/* eslint-disable import/prefer-default-export */
function isNativeWidget(widgetName: string): boolean {
  return /^[a-z]/.test(widgetName);
}

export { isNativeWidget };
