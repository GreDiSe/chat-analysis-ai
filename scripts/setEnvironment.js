#!/bin/node
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { readFileSync, writeFileSync } = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const environment = process.argv[2];

if (!environment) {
  console.error(
    '❌ Please provide an environment (e.g. "development" or "production")',
  );
  process.exit(1);
}

try {
  console.log(`🔧 Applying environment: '${environment}'`);

  // Load environment-specific files
  const envSettingsContent = JSON.parse(
    readFileSync(`./envs/${environment}/settings.json`, 'utf-8'),
  );
  console.log('✅  Loaded settings.json');

  const envAndroidGoogleContent = readFileSync(
    `./envs/${environment}/google-services.json`,
    'utf-8',
  );
  console.log('✅  Loaded google-services.json for Android');

  // Write environment files
  writeFileSync('env.json', JSON.stringify(envSettingsContent, null, 2));
  console.log('📄 Written: env.json');

  writeFileSync('android/app/google-services.json', envAndroidGoogleContent);
  console.log('📄 Written: android/app/google-services.json');

  // Update signingConfig in build.gradle
  const gradleFilePath = path.resolve(__dirname, '../android/app/build.gradle');
  let gradleContent = readFileSync(gradleFilePath, 'utf8');

  const signingTarget =
    environment === 'production'
      ? 'signingConfigs.release'
      : 'signingConfigs.debug';

  gradleContent = gradleContent.replace(
    /signingConfig\s+signingConfigs\.(debug|release)/g,
    `signingConfig ${signingTarget}`,
  );

  writeFileSync(gradleFilePath, gradleContent);

  console.log(`🔐 build.gradle signingConfig set to: ${signingTarget}`);
  console.log(`✅  Environment '${environment}' successfully applied.`);
} catch (err) {
  console.error(
    `❌ Failed to apply environment '${environment}':`,
    err.message,
  );
  process.exit(1);
}
