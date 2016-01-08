export function int(val) {
  return parseInt(val, 10);
}

export function double(val) {
  return parseFloat(val);
}

export function bool(val) {
  return Boolean(val);
}

export function string(val) {
  return String(val);
}

export default {
  int, 
  double, 
  string, 
  bool,
}
