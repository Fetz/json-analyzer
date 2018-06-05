module.exports = {
  labels: ['upgrade', 'renovate'],
  repositories: [
    {
      repository: 'Fetz/json-analyzer',
      packageRules: [
        {
          packagePatterns: ['@commitlint/'],
          groupName: 'eslint packages'
        },
        {
          packagePatterns: ['^eslint'],
          groupName: 'eslint packages'
        },
        {
          packagePatterns: ['^rollup'],
          groupName: 'rollup packages'
        }
      ]
    }
  ]
};
