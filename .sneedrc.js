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
      edits: [
        {
          target: 'src/api/root-mutation.ts',
          mark: '// AUTOIMPORT MUTATION',
          template: 'feature-autoimport-mutation.ejs',
          editType: 'insertAfter'
        },
        {
          target: 'src/api/root-mutation.ts',
          mark: '// AUTOREGISTER MUTATION',
          template: 'feature-autoregister-mutation.ejs',
          editType: 'insertAfter'
        },
        {
          target: 'src/api/root-query.ts',
          mark: '// AUTOIMPORT QUERY',
          template: 'feature-autoimport-query.ejs',
          editType: 'insertAfter'
        },
        {
          target: 'src/api/root-query.ts',
          mark: '// AUTOREGISTER QUERY',
          template: 'feature-autoregister-query.ejs',
          editType: 'insertAfter'
        }
      ],
      variables: {
        name: {}
      }
    }
  }
}
