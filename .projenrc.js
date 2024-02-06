const { awscdk } = require('projen');

const PROJECT_NAME = 'cdk-events-notify';
const PROJECT_DESCRIPTION = 'The Events Notify AWS Construct lib for AWS CDK';
const project = new awscdk.AwsCdkConstructLibrary({
  authorAddress: 'guan840912@gmail.com',
  authorName: 'Neil Kuan',
  description: PROJECT_DESCRIPTION,
  name: PROJECT_NAME,
  repository: 'https://github.com/neilkuan/cdk-events-notify.git',
  keywords: ['aws', 'cdk', 'events', 'notify'],
  cdkVersion: '2.126.0',
  /**
   * we default release the main branch(cdkv2) with major version 2.
   */
  majorVersion: 2,
  defaultReleaseBranch: 'main',
  /**
    * we also release the cdkv1 branch with major version 1.
    */
  releaseBranches: {
    cdkv1: { npmDistTag: 'cdkv1', majorVersion: 1 },
  },
  autoDetectBin: false,
  depsUpgradeOptions: {
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve'],
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
  devDeps: [
    'ts-jest@29.1.2',
    'jsii-rosetta@5.0.x',
  ],
  minNodeVersion: '20.10.0',
  workflowNodeVersion: '20.10.0',
  typescriptVersion: '^5',
  jsiiVersion: '5.3.x',
});


const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log', 'coverage', '.env', '.DS_Store'];
project.gitignore.exclude(...common_exclude);
project.npmignore.exclude(...common_exclude, 'images');

project.synth();
