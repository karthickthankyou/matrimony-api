const convertToDotNotation = (obj, newObj = {}, prefix = "") => {
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      convertToDotNotation(obj[key], newObj, prefix + key + ".");
    } else {
      newObj[prefix + key] = obj[key];
    }
  }

  return newObj;
}

exports.convertToDotNotation = convertToDotNotation;
