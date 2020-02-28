import makeSingle from 'lib/makeSingle';

const sleep = (milliseconds: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

function* generator1(): Generator<Promise<void>, string> {
  yield sleep(300);
  return 'generator1';
}

function* generator2(): Generator<Promise<void>, string> {
  yield sleep(400);
  return 'generator2';
}

const asyncGen1 = makeSingle(generator1);
const asyncGen2 = makeSingle(generator2);

test('only last call returns value', () => {
  asyncGen1().then(val => {
    expect(val).toEqual(Symbol.for('takeover'));
  });
  asyncGen1().then(val => {
    expect(val).toEqual(Symbol.for('takeover'));
  });

  // last call win
  asyncGen1().then(val => {
    expect(val).toEqual('generator1');
  });
});

test('timeout will returns value', () => {
  sleep(500)
    .then(asyncGen1)
    .then(val => {
      expect(val).toEqual(Symbol.for('generator1'));
    });

  asyncGen1().then(val => {
    expect(val).toEqual(Symbol.for('takeover'));
  });

  // last call win
  asyncGen1().then(val => {
    expect(val).toEqual('generator1');
  });
});

test('two generators will not effect each other', () => {
  asyncGen1().then(val => {
    expect(val).toEqual(Symbol.for('takeover'));
  });

  // last call win
  asyncGen1().then(val => {
    expect(val).toEqual('generator1');
  });

  asyncGen2().then(val => {
    expect(val).toEqual(Symbol.for('takeover'));
  });

  // last call win
  asyncGen2().then(val => {
    expect(val).toEqual('generator2');
  });
});
