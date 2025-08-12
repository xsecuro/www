/** @type {import('semantic-release').GlobalConfig} */
const semanticReleaseConfig = {
    branches: [
        { name: 'main' },
        {
            name: 'dev',
            channel: 'beta',
            prerelease: 'beta',
        },
    ],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
                parserOpts: {
                    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
                },
                releaseRules: [
                    // Breaking Changes (MAJOR)
                    { type: 'feat', release: 'minor' },
                    { type: 'feat', scope: 'BREAKING CHANGE', release: 'major' },
                    { breaking: true, release: 'major' },

                    // Features (MINOR)
                    { type: 'feat', release: 'minor' },
                    { type: 'feature', release: 'minor' },

                    // Bug Fixes (PATCH)
                    { type: 'fix', release: 'patch' },
                    { type: 'bugfix', release: 'patch' },
                    { type: 'hotfix', release: 'patch' },

                    // Performance (PATCH)
                    { type: 'perf', release: 'patch' },

                    // Refactoring (PATCH)
                    { type: 'refactor', release: 'patch' },
                    { type: 'refactor', scope: '*-logic', release: 'patch' },

                    // Documentation and style (no release)
                    { type: 'docs', release: false },
                    { type: 'style', release: false },

                    // Tests and build (no no release)
                    { type: 'test', release: false },
                    { type: 'build', release: false },

                    // CI/CD (no release)
                    { type: 'ci', release: false },

                    // Maintenance (no release)
                    { type: 'chore', release: false },
                    { type: 'maint', release: false },
                ],
            },
        ],
        [
            '@semantic-release/release-notes-generator',
            {
                preset: 'conventionalcommits',
                parserOpts: {
                    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
                },
                writerOpts: {
                    groupBy: 'type',
                    commitsSort: ['subject', 'scope'],
                    // types: [
                    //     { type: 'feat', section: '🚀 Features', hidden: false },
                    //     { type: 'fix', section: '🐛 Bug Fixes', hidden: false },
                    //     { type: 'perf', section: '⚡️ Performance', hidden: false },
                    //     { type: 'docs', section: '📚 Documentation', hidden: false },
                    //     { type: 'chore', section: '🔧 Maintenance', hidden: false },
                    //     { type: 'refactor', section: '♻️ Refactoring', hidden: false },
                    //     { type: 'style', section: '💄 Code Style', hidden: false },
                    //     { type: 'test', section: '🧪 Tests', hidden: false },
                    //     { type: 'build', section: '📦 Build System', hidden: false },
                    //     { type: 'ci', section: '👷 CI/CD', hidden: false },
                    // ],
                },
            },
        ],
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
                changelogTitle:
                    '# 📜 Changelog\n\nAll notable changes to this project will be documented in this file.\n\n',
            },
        ],
        [
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
                message:
                    process.env.GITHUB_REF && process.env.GITHUB_REF.includes('dev')
                        ? 'chore(pre-release): ${nextRelease.version} [skip ci]'
                        : 'chore(release): ${nextRelease.version} [skip ci]',
            },
        ],
        [
            '@semantic-release/github',
            {
                successComment: false,
                releasedLabels: ['released'],
                addReleases: 'bottom',
                githubUrl: 'https://github.com/xsecuro/www',
                githubApiPathPrefix: '/api/v3',
            },
        ],
    ],
    tagFormat: 'v${version}',
    preset: 'conventionalcommits',
}

export default semanticReleaseConfig
