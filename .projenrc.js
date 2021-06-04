const { AwsCdkConstructLibrary } = require('projen');

const PROJECT_NAME = 'cdk-events-notify';
const PROJECT_DESCRIPTION = 'The Events Notify AWS Construct lib for AWS CDK';
const project = new AwsCdkConstructLibrary({
  authorAddress: 'guan840912@gmail.com',
  authorName: 'Neil Kuan',
  cdkVersion: '1.105.0',
  description: PROJECT_DESCRIPTION,
  name: PROJECT_NAME,
  repository: 'https://github.com/neilkuan/cdk-events-notify.git',
  keywords: ['aws', 'cdk', 'events', 'notify'],
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-logs',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-events',
    '@aws-cdk/aws-events-targets',
  ],
  autoApproveOptions: {
    secret: 'PROJEN_GITHUB_TOKEN',
  },
  catalog: {
    twitter: 'neil_kuan',
    announce: true,
  },
  compat: true,
  python: {
    distName: PROJECT_NAME,
    module: 'cdk_events_notify',
  },
  stability: 'experimental',
  defaultReleaseBranch: 'main',
  dependabot: false,
  rebuildBot: false,
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log', 'coverage', '.env', '.DS_Store'];
project.gitignore.exclude(...common_exclude);
project.npmignore.exclude(...common_exclude, 'images');

project.synth();
