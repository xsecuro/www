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
        '@semantic-release/commit-analyzer',
        [
            '@semantic-release/release-notes-generator',
            {
                preset: 'conventionalcommits',
                parserOpts: {
                    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
                },
                writerOpts: {
                    groupBy: 'type',
                    commitGroupsSort: (a, b) => {
                        const order = ['feat', 'fix', 'perf', 'refactor', 'docs', 'chore']
                        return order.indexOf(a.title) - order.indexOf(b.title)
                    },
                    commitsSort: ['scope', 'subject'],
                    types: [
                        { type: 'feat', section: '🚀 Features', hidden: false },
                        { type: 'fix', section: '🐛 Bug Fixes', hidden: false },
                        { type: 'perf', section: '⚡️ Performance', hidden: false },
                        { type: 'docs', section: '📚 Documentation', hidden: false },
                        { type: 'chore', section: '🔧 Maintenance', hidden: false },
                        { type: 'refactor', section: '♻️ Refactoring', hidden: false },
                        { type: 'style', section: '💄 Code Style', hidden: false },
                        { type: 'test', section: '🧪 Tests', hidden: false },
                        { type: 'build', section: '📦 Build System', hidden: false },
                        { type: 'ci', section: '👷 CI/CD', hidden: false },
                    ],
                },
                format: {
                    feat: ({ scope, subject, hash }) =>
                        `- **${scope ? `${scope}:` : ''} ${subject}** ([${hash.slice(0, 8)}](https://github.com/xsecuro/www/commit/${hash}))`,
                    fix: ({ scope, subject, hash }) =>
                        `- **${scope ? `${scope}:` : ''} ${subject}** ([${hash.slice(0, 8)}](https://github.com/xsecuro/www/commit/${hash}))`,
                    perf: ({ scope, subject, hash }) =>
                        `- **${scope ? `${scope}:` : ''} ${subject}** ([${hash.slice(0, 8)}](https://github.com/xsecuro/www/commit/${hash}))`,
                    refactor: ({ scope, subject, hash }) =>
                        `- **${scope ? `${scope}:` : ''} ${subject}** ([${hash.slice(0, 8)}](https://github.com/xsecuro/www/commit/${hash}))`,
                    docs: ({ scope, subject, hash }) =>
                        `- **${scope ? `${scope}:` : ''} ${subject}** ([${hash.slice(0, 8)}](https://github.com/xsecuro/www/commit/${hash}))`,
                    chore: ({ scope, subject, hash }) =>
                        `- **${scope ? `${scope}:` : ''} ${subject}** ([${hash.slice(0, 8)}](https://github.com/xsecuro/www/commit/${hash}))`,
                    style: ({ scope, subject, hash }) =>
                        `- **${scope ? `${scope}:` : ''} ${subject}** ([${hash.slice(0, 8)}](https://github.com/xsecuro/www/commit/${hash}))`,
                    test: ({ scope, subject, hash }) =>
                        `- **${scope ? `${scope}:` : ''} ${subject}** ([${hash.slice(0, 8)}](https://github.com/xsecuro/www/commit/${hash}))`,
                    build: ({ scope, subject, hash }) =>
                        `- **${scope ? `${scope}:` : ''} ${subject}** ([${hash.slice(0, 8)}](https://github.com/xsecuro/www/commit/${hash}))`,
                    ci: ({ scope, subject, hash }) =>
                        `- **${scope ? `${scope}:` : ''} ${subject}** ([${hash.slice(0, 8)}](https://github.com/xsecuro/www/commit/${hash}))`,
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
        '@semantic-release/npm',
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
    ci: true,
    dryRun: false,
}

export default semanticReleaseConfig
