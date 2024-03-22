const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    publicRuntimeConfig: {
        PUBLIC_VC_REPO: process.env.NEXT_PUBLIC_VC_REPO ?? "https://credentials.walt.id/",
        PUBLIC_ISSUER: process.env.NEXT_PUBLIC_ISSUER ?? "https://issuer.portal.walt.id",
        PUBLIC_VERIFIER: process.env.NEXT_PUBLIC_VERIFIER ?? "https://verifier.portal.walt.id",
        PUBLIC_WALLET: process.env.NEXT_PUBLIC_WALLET ?? "https://wallet.walt.id",
        DID_RESOLVER: process.env.NEXT_DID_RESOLVER ?? "https://dev.uniresolver.io",
    },
}

export default nextConfig
