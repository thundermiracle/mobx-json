/* eslint-disable @typescript-eslint/no-non-null-assertion */
import clone from 'ramda/src/clone';
import { Fields, ValueType } from 'core/JsonFormTypes';

const fieldsData = {
  firstName: 'my firstName',
  lastName: 'my lastName',
  sub1: 'choice1',
  sub2: true,
  sub3: [1, 2, 3],
};

const fieldsName = {
  firstName: 'firstName',
  lastName: 'lastName',
  sub1: 'sub1',
  sub2: 'sub2',
  sub3: 'sub3',
};

const fieldsInit: Fields = {
  firstName: {
    settings: {
      widget: 'TextField',
      valueType: ValueType.string,
    },
    attrs: {
      name: 'firstName',
      grid: {
        xs: 6,
      },
    },
    init: {
      name: 'firstName',
    },
  },
  lastName: {
    settings: {
      widget: 'TextField',
      valueType: ValueType.string,
    },
    attrs: {
      name: 'lastName',
    },
    init: {
      name: 'lastName',
    },
  },
  grid1: {
    settings: {
      widget: 'GridItemContainer',
      valueType: ValueType.container,
    },
    attrs: {
      name: 'grid1',
    },
    init: {
      name: 'grid1',
    },
    fields: {
      sub1: {
        settings: {
          widget: 'Select',
          valueType: ValueType.string,
        },
        attrs: {
          name: 'sub1',
        },
        init: {
          name: 'sub1',
        },
      },
      sub2: {
        settings: {
          widget: 'Checkbox',
          valueType: ValueType.boolean,
        },
        attrs: {
          name: 'sub2',
        },
        init: {
          name: 'sub2',
        },
      },
      sub3: {
        settings: {
          widget: 'Checkboxes',
          valueType: ValueType.array,
        },
        attrs: {
          name: 'sub3',
        },
        init: {
          name: 'sub3',
        },
      },
    },
  },
};

function makeFieldsWithValue(inputFields: Fields): Fields {
  const innerFields = clone(inputFields);
  innerFields.firstName.attrs.value = fieldsData.firstName;
  innerFields.lastName.attrs.value = fieldsData.lastName;
  innerFields.grid1.fields!.sub1.attrs.value = fieldsData.sub1;
  innerFields.grid1.fields!.sub2.attrs.value = fieldsData.sub2;
  innerFields.grid1.fields!.sub3.attrs.value = fieldsData.sub3;

  return innerFields;
}

const fields = makeFieldsWithValue(fieldsInit);

export { fields, fieldsData, fieldsName };
