module.exports = {
  templateFolder: 'templates',
  commands: {
    feature: {
      scaffolds: [
        {
          template: 'feature-mutation.ejs',
          target: 'src/features/<%- casing.paramCase(name) %>/mutation.ts'
        },
        {
          template: 'feature-query.ejs',
          target: 'src/features/<%- casing.paramCase(name) %>/query.ts'
        },
        {
          template: 'feature-types.ejs',
          target: 'src/features/<%- casing.paramCase(name) %>/types.ts'
        }
      ],
      edits: [],
      variables: {
        name: {}
      }
    }
  }
}
