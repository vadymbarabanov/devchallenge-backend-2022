export class Validator {
  validate(data) {
    const errors = [];

    const obligatedEntries = Object.entries(this);

    obligatedEntries.forEach(([key, types]) => {
      if (data[key] === undefined) {
        errors.push({ field: key, message: `${key} is required` });
      }

      if (!types.includes(typeof data[key])) {
        errors.push({
          field: key,
          message: `${key} should be type of ${types}`,
        });
      }
    });

    return errors;
  }
}
