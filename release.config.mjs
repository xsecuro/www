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
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
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
        '@semantic-release/github'
    ],
}

export default semanticReleaseConfig
