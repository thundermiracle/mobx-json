import plugins from 'core/plugins';

test('validator', () => {
  plugins.validator = 'validator string' as any;

  expect(plugins.validator).toEqual('validator string');
});

test('widgetMap', () => {
  plugins.widgetMap = 'widgetMap string' as any;

  expect(plugins.widgetMap).toEqual('widgetMap string');
});

test('itemsSource', () => {
  plugins.itemsSource = 'itemsSource string' as any;

  expect(plugins.itemsSource).toEqual('itemsSource string');
});

test('iconsMap', () => {
  plugins.iconsMap = 'iconsMap string' as any;

  expect(plugins.iconsMap).toEqual('iconsMap string');
});
