// Pass in the objects to merge as arguments.
// For a deep extend, set the first argument to `true`.
export default function extend() {

  // Variables
  const extended = {};
  const length = arguments.length;
  let deep = false;
  let i = 0;

  // Check if a deep merge
  if(Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
    deep = arguments[0];
    i++;
  }

  // Merge the object into the extended object
  let merge = function(obj) {
    for(let prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        // If deep merge and property is an object, merge properties
        if(deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          extended[prop] = extend(true, extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for(; i < length; i++) {
    let obj = arguments[i];
    merge(obj);
  }

  return extended;
}
