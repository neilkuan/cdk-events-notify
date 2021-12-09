const { awscdk } = require('projen');

const PROJECT_NAME = 'cdk-events-notify';
const PROJECT_DESCRIPTION = 'The Events Notify AWS Construct lib for AWS CDK';
const project = new awscdk.AwsCdkConstructLibrary({
  authorAddress: 'guan840912@gmail.com',
  authorName: 'Neil Kuan',
  cdkVersion: '2.1.0',
  description: PROJECT_DESCRIPTION,
  name: PROJECT_NAME,
  repository: 'https://github.com/neilkuan/cdk-events-notify.git',
  keywords: ['aws', 'cdk', 'events', 'notify'],
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
  bundledDeps: [
    '@aws-cdk/assert',
  ],
  workflowNodeVersion: '^14.17.0',
});
project.package.addField('resolutions', {
  'trim-newlines': '3.0.1',
});
const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log', 'coverage', '.env', '.DS_Store'];
project.gitignore.exclude(...common_exclude);
project.npmignore.exclude(...common_exclude, 'images');

project.synth();
