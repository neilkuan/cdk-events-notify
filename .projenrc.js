const { AwsCdkConstructLibrary } = require('projen');

const PROJECT_NAME = 'cdk-events-notify';
const PROJECT_DESCRIPTION = 'The Events Notify AWS Construct lib for AWS CDK';
const project = new AwsCdkConstructLibrary({
  authorAddress: 'guan840912@gmail.com',
  authorName: 'Neil Kuan',
  cdkVersion: '1.125.0',
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
  autoDetectBin: false,
  depsUpgradeOptions: {
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve'],
      secret: 'AUTOMATION_GITHUB_TOKEN',
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['neilkuan'],
  },
  catalog: {
    twitter: 'neil_kuan',
    announce: false,
  },
  compat: true,
  publishToPypi: {
    distName: PROJECT_NAME,
    module: 'cdk_events_notify',
  },
  stability: 'experimental',
  defaultReleaseBranch: 'main',
  rebuildBot: false,
});
project.package.addField('resolutions', {
  'trim-newlines': '3.0.1',
});
const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log', 'coverage', '.env', '.DS_Store'];
project.gitignore.exclude(...common_exclude);
project.npmignore.exclude(...common_exclude, 'images');

project.synth();
