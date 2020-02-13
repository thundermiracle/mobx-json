import getHelper from 'core/JsonFormStore/private/getHelper';

import { fields as fieldsMock } from '../../mock';

test('fields is null', () => {
  const field = getHelper.getFieldByName(null, 'firstName');

  expect(field).toBeNull();
});

test('no nested', () => {
  const field = getHelper.getFieldByName(fieldsMock, 'lastName');

  expect(field).toEqual(fieldsMock.lastName);
});

test('sub field', () => {
  const field = getHelper.getFieldByName(fieldsMock, 'sub2');

  expect(field).toEqual(fieldsMock.grid1.fields!.sub2);
});

test('not found', () => {
  const field = getHelper.getFieldByName(fieldsMock, 'not exist');

  expect(field).toBeNull();
});
