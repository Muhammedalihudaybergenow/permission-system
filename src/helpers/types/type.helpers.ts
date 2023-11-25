export class TypeHelpers {
  parseBool(value, defaultValue) {
    return (
      ((value == 'true' ||
        value == 'false' ||
        value === true ||
        value === false) &&
        JSON.parse(value)) ||
      defaultValue
    );
  }
}
