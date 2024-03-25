// src/app/credentials/[id]/page.tsx
import { authOptions } from '@/auth/config';
import Button from '@/components/walt/button/Button';
import UnauthorizedBody from '@/components/UnauthorizedBody';
import { getCredentials } from '@/utils/getCredentials';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import { getOfferUrl } from '@/utils/getOfferUrl';
import { AvailableCredential } from '@/types/credentials';
import QRCode from 'react-qr-code';


export default async function CredentialDetailsPage(
  { params }: { params: { id: string } }
) {

  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      UnauthorizedBody()
    );
  }

  const userInfo = session.user;

  const credentials = await getCredentials();
  const credential: AvailableCredential = credentials.find(cred => cred.id === params.id) as AvailableCredential;

  if (!credential) {

    return (
      <div className="flex flex-col space-y-3 justify-center items-center h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">No credential found with id: {params.id}</h1>
      </div>
    )
  }

  const offerUrl = await getOfferUrl(
    credential,
    userInfo
  );

  const claim = issuedClaim(credential, userInfo);

  function createWebWalletUri() {
    const path = "api/siop/initiateIssuance";
    const walletUrl = process.env.PUBLIC_WALLET_URL;
    let request = offerUrl.data.replaceAll("\n", "").trim()
    return `${walletUrl}/${path}` + request.substring(request.indexOf('?'));
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen">
      <div className="text-center">
        {/* Commented out for simplicity; replace with your BackButton component if needed */}
        {/* <BackButton /> */}
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl mt-5">
          Claim Your {credential.title}
        </h1>
        <div className='text-gray-900 sm:text-xl lg:text-xl mt-5'>
          This credential contains the following claim:
        </div>
        <pre className="text-sm text-gray-600 mt-5">
          {claim?.name}: {claim?.value}
          </pre>
        <div className="my-10 inline-block">
          <QRCode
            value={offerUrl.data}
            viewBox="0 0 256 256"
          // Assuming QRCode is a self-contained component that centers its content. If not, consider adding additional styling.
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link href={createWebWalletUri()} target='_blank'>
            <Button>Open Web Wallet</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>

  )
}

function issuedClaim(credential: AvailableCredential, userInfo: { over18: boolean; nationality: string; }) {
  let claim;
  if (credential.title === 'NationalityCredential') {
    claim = {
      name: 'nationality',
      value: userInfo.nationality
    };
  } else if (credential.title === 'LegalAgeCredential') {
    claim = {
      name: 'age_over_18',
      value: userInfo.over18
    };
  } else {
    claim = {
      name: 'unknown_claim',
      value: JSON.stringify(userInfo)
    };
  }
  return claim;
}

