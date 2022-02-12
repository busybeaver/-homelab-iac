import * as github from '@pulumi/github';
import * as random from '@pulumi/random';
import { requireSecretString } from '../../util/secrets';

const iacRepo = new github.Repository('homelab-iac', {
  allowAutoMerge: true,
  allowMergeCommit: true,
  allowRebaseMerge: false,
  allowSquashMerge: true,
  autoInit: true,
  archived: false,
  deleteBranchOnMerge: true,
  description: 'Infrastructure as Code for the personal HomeLab',
  hasDownloads: true,
  hasIssues: true,
  hasProjects: false,
  hasWiki: false,
  isTemplate: false,
  name: 'homelab-iac',
  visibility: 'public',
  vulnerabilityAlerts: true,
}, {
  protect: true,
});
const iacDefaultBranch = new github.BranchDefault('homelab-iac', {
  repository: iacRepo.name,
  branch: iacRepo.branches[0]?.name ?? 'main',
}, {
  protect: true,
});
const iacAutomationUser = new github.RepositoryCollaborator('homelab-iac-automation-user', {
  permission: 'admin',
  repository: iacRepo.name,
  username: requireSecretString('github_automation_user', true),
});
const iacPulumiSecret = new github.ActionsSecret('homelab-iac-pulumi-passphrase', {
  repository: iacRepo.name,
  secretName: 'PULUMI_CONFIG_PASSPHRASE',
  plaintextValue: requireSecretString('ci_stack_github_token'),
});
const iacGitguardianSecret = new github.ActionsSecret('homelab-iac-gitguardian-api-key', {
  repository: iacRepo.name,
  secretName: 'GITGUARDIAN_API_KEY',
  plaintextValue: requireSecretString('gitguardian_api_key'),
});
const iacGpgPrivateKeySecret = new github.ActionsSecret('homelab-iac-gpg-private-key', {
  repository: iacRepo.name,
  secretName: 'GPG_PRIVATE_KEY',
  plaintextValue: requireSecretString('gpg_private_key'),
});
const iacGpgPassphraseSecret = new github.ActionsSecret('homelab-iac-gpg-passphrase', {
  repository: iacRepo.name,
  secretName: 'GPG_PASSPHRASE',
  plaintextValue: requireSecretString('gpg_passphrase'),
});
const iacPulumiAppIdSecret = new github.ActionsSecret('homelab-iac-pulumi-app-id', {
  repository: iacRepo.name,
  secretName: 'PULUMI_APP_ID',
  plaintextValue: requireSecretString('pulumi_app_id'),
});
const iacPulumiAppPrivateKeySecret = new github.ActionsSecret('homelab-iac-pulumi-app-private-key', {
  repository: iacRepo.name,
  secretName: 'PULUMI_APP_PRIVATE_KEY',
  plaintextValue: requireSecretString('pulumi_app_private_key'),
});
const iacCodecovTokenSecret = new github.ActionsSecret('homelab-iac-codecov-token', {
  repository: iacRepo.name,
  secretName: 'CODECOV_TOKEN',
  plaintextValue: requireSecretString('codecov_token'),
});
const iacGitHubAutomationTokenSecret = new github.ActionsSecret('homelab-iac-github-automation-token', {
  repository: iacRepo.name,
  secretName: 'GH_AUTOMATION_TOKEN',
  plaintextValue: requireSecretString('github_automation_token'),
});
const iacUnitTestResultsReporterAppIdSecret = new github.ActionsSecret(
  'homelab-iac-unit-test-results-reporter-app-id',
  {
    repository: iacRepo.name,
    secretName: 'UNIT_TEST_RESULTS_REPORTER_APP_ID',
    plaintextValue: requireSecretString('unit_test_results_reporter_app_id'),
  },
);
const iacUnitTestResultsReporterPrivateKeySecret = new github.ActionsSecret(
  'homelab-iac-unit-test-results-reporter-private-key',
  {
    repository: iacRepo.name,
    secretName: 'UNIT_TEST_RESULTS_REPORTER_PRIVATE_KEY',
    plaintextValue: requireSecretString('unit_test_results_reporter_private_key'),
  },
);
const iacRepositoryAssistantAppIdSecret = new github.ActionsSecret(
  'homelab-iac-repository-assistant-app-id',
  {
    repository: iacRepo.name,
    secretName: 'REPOSITORY_ASSISTANT_APP_ID',
    plaintextValue: requireSecretString('repository_assistant_app_id'),
  },
);
const iacRepositoryAssistantPrivateKeySecret = new github.ActionsSecret(
  'homelab-iac-repository-assistant-private-key',
  {
    repository: iacRepo.name,
    secretName: 'REPOSITORY_ASSISTANT_PRIVATE_KEY',
    plaintextValue: requireSecretString('repository_assistant_private_key'),
  },
);
const iacDummyFakeSecret = new github.ActionsSecret(
  'homelab-iac-not-real-secret',
  {
    repository: iacRepo.name,
    secretName: 'DUMMY_FAKE_SECRET',
    plaintextValue: new random.RandomPassword('dummy_fake_secret', { length: 32, special: false }).id,
  },
);

export const repos = [
  iacRepo,
  iacDefaultBranch,
  iacAutomationUser,
  iacPulumiSecret,
  iacGitguardianSecret,
  iacGpgPrivateKeySecret,
  iacGpgPassphraseSecret,
  iacPulumiAppIdSecret,
  iacPulumiAppPrivateKeySecret,
  iacCodecovTokenSecret,
  iacGitHubAutomationTokenSecret,
  iacUnitTestResultsReporterAppIdSecret,
  iacUnitTestResultsReporterPrivateKeySecret,
  iacRepositoryAssistantAppIdSecret,
  iacRepositoryAssistantPrivateKeySecret,
  iacDummyFakeSecret,
];
