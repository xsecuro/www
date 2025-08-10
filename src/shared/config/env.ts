export const env = {
    bbsAlgorithmP: BigInt(process.env.NEXT_PUBLIC_BBS_ALGORITHM_P || 0),
    bbsAlgorithmQ: BigInt(process.env.NEXT_PUBLIC_BBS_ALGORITHM_Q || 0),
    bbsAlgorithmSeed: BigInt(process.env.NEXT_PUBLIC_BBS_ALGORITHM_SEED || 0),
}
