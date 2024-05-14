export const estructuraContrasena = value => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
    return regex.test(value);
  };
  