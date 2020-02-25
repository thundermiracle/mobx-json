// symbol returned to indicate that a call was cancelled
export const takeoverSymbol = Symbol('takeover');

/**
 * Accepts a generator function, which yields Promises, and converts it to an async function
 * that cancels any previous calls.
 */
export default function makeSingle(
  generator: (...args: any[]) => Generator<any>,
): (...args: any[]) => Promise<any> {
  let globalNonce;
  return async function(...args: any[]): Promise<any> {
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
