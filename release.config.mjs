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
                    noteKeywords: ['BREAKING CHANGE'],
                },
                writerOpts: {
                    groupBy: 'type',
                    types: [
                        { type: 'feat', section: '🚀 Features' },
                        { type: 'fix', section: '🐛 Bug Fixes' },
                        { type: 'perf', section: '⚡️ Performance' },
                        { type: 'docs', section: '📚 Documentation' },
                        { type: 'chore', section: '🔧 Maintenance' },
                        { type: 'refactor', section: '♻️ Refactoring' },
                    ],
                },
                linkReferences: true,
                issueUrlFormat: 'https://github.com/xsecuro/www/issues/{{id}}',
                commitUrlFormat: 'https://github.com/xsecuro/www/commit/{{hash}}',
            },
        ],
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
                changelogTitle: '# 📜 Changelog',
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
                successComment:
                    "🎉 This ${issue.pull_request ? 'PR is included' : 'issue has been resolved'} in version ${nextRelease.version}.",
                releasedLabels: ['released'],
            },
        ],
    ],
}

export default semanticReleaseConfig
