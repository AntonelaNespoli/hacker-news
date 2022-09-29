export function getLocalData(name: string) {
  return JSON.parse(localStorage.getItem(name) || "[]");
}

export function setLocalData<Type>(name: string, val: Type, set: Function) {
  set(val);
  localStorage.setItem(name, JSON.stringify(val));
}
