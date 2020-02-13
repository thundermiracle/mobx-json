import { Fields, ValueType } from 'core/JsonFormTypes';

const fields: Fields = {
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
    },
  },
};

export { fields };
