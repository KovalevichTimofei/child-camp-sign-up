export function isEmpty(obj) {
  return !!(!obj || JSON.stringify(obj === "{}"));
}

export function generateId() {
  return `_${Math.random().toString(36).substr(2, 9)}`;
}

export function getUndefinedFields(targetObj, fieldsList) {
  return fieldsList.filter((field) => !targetObj[field]).join(", ");
}
