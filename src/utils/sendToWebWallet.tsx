import { redirect } from "next/navigation";

const sendToWebWallet = (path: String, requestUrl: String) => {
    const walletUrl = process.env.PUBLIC_WALLET_URL;
    let request = requestUrl.replaceAll("\n", "").trim()
    // window.location.href = `https://wallet.walt.id/${path}` + request.substring(request.indexOf('?'));
    redirect(`${walletUrl}/${path}` + request.substring(request.indexOf('?')));
}

export {sendToWebWallet};
