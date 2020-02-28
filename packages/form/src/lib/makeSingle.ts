// symbol returned to indicate that a call was cancelled
export const takeoverSymbol = Symbol('takeover');

/**
 * Accepts a generator function, which yields Promises, and converts it to an async function
 * that cancels any previous calls.
 */
export default function makeSingle<T, TReturn>(
  generator: (...args: any[]) => Generator<Promise<T>, TReturn>,
): (...args: any[]) => Promise<TReturn | symbol> {
  let globalNonce;
  return async function(...args: any[]): Promise<TReturn | symbol> {
    globalNonce = {};
    const localNonce = globalNonce;

    const iter = generator(...args);
    let resumeValue;
    for (;;) {
      const n = iter.next(resumeValue);
      if (n.done) {
        return n.value; // final return value of passed generator
      }

      // whatever the generator yielded, _now_ run await on it
      // eslint-disable-next-line no-await-in-loop
      resumeValue = await n.value;
      if (localNonce !== globalNonce) {
        return takeoverSymbol; // a new call was made
      }
      // next loop, we give resumeValue back to the generator
    }
  };
}
