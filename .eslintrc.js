module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    //Las reglas marcadas como off, son para que no den error, pero se pueden cambiar a error para que den error
    '@typescript-eslint/interface-name-prefix': 'off',
    //No se puedan dejar funciones sin tipo de retorno
    '@typescript-eslint/explicit-function-return-type': 'warn',
    //Typescript no infiera el tipo de retorno de una funcion sino que se especifique
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    //No usar el any
    '@typescript-eslint/no-explicit-any': 'warn',
    //Siempre se verifique que en el switch se manejen todos los casos
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    //En una ejecucion asincrona, se espere a que se resuelva la promesa
    '@typescript-eslint/await-thenable': 'error',
    //A la hora de  exportar un tipo, se haga de manera consistente
    '@typescript-eslint/consistent-type-exports': 'error',
    //No se puedan duplicar los valores de un enum
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    //No permitir promesas en lugares no diseñados para manejarlas
    '@typescript-eslint/no-misused-promises': 'error',
    //No permitir que las enumeraciones tengan miembros numéricos y de cadena
    '@typescript-eslint/no-mixed-enums': 'error',
    //No permitir iteración sobre una matriz con un bucle for-in
    '@typescript-eslint/no-for-in-array': 'error',
    //Requerir que todos los miembros de enumeración sean valores literales
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    //Requerir que se escriban los parámetros de función para evitar la mutación accidental de las entradas readonly
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    //No permitir funciones vacías
    '@typescript-eslint/no-empty-function': 'error',
    //No permitir numeros magicos
    //se apaga la regla de no-magic-numbers de eslint y se activa la de @typescript-eslint/no-magic-numbers
    'no-magic-numbers': 'off',
    '@typescript-eslint/no-magic-numbers': [
      'warn',
      {
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignore: [0, 1],
      },
    ],
    //No permitir funciones asincrónicas que no tienen expresión await
    '@typescript-eslint/require-await': 'warn',
    //Aplicar la devolución coherente de los valores esperados, esto significa que si una función devuelve una promesa, debe usar await o devolver la promesa
    '@typescript-eslint/return-await': 'warn',
    //Desactiva la regla de no-unused-vars de eslint y activa la de @typescript-eslint/no-unused-vars
    'no-unused-vars': 'off',
    //Lanza una advertencia si no se usa una variable
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
