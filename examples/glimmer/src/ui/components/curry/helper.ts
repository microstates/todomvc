export default function curry([fn, ...args]) {
  // TODO: this should be actually curry helper from ramda.js instead of this fake
  // @see: http://ramdajs.com/docs/#curry
  return () => fn(...args)
}
