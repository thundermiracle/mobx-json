import { observable, isObservableArray } from 'mobx';
import getHelper from 'core/JsonFormStore/private/getHelper';

import {
  fields as fieldsMock,
  fieldsData as fieldsMockData,
  fieldsName as fieldsMockName,
} from '../../mock';

test('remove observable', () => {
  const fieldsMockMobx = observable(fieldsMock);

  const result = getHelper.flattenProps(fieldsMockMobx);

  expect(isObservableArray(result.sub3)).toBeFalsy();
});

test('get attrs.value', () => {
  const result = getHelper.flattenProps(fieldsMock);

  expect(result).toEqual(fieldsMockData);
});

test('get attrs.name', () => {
  const result = getHelper.flattenProps(fieldsMock, 'attrs.name');

  expect(result).toEqual(fieldsMockName);
});

test('get attrs.name withContainer', () => {
  const result = getHelper.flattenProps(fieldsMock, 'attrs.name', true);

  expect(result).toEqual({ ...fieldsMockName, grid1: 'grid1' });
});
