import React from 'react';
import Logout from "@/components/Logout";
import Credential from "@/components/Credential";
import { getServerSession } from "next-auth";
import { AvailableCredential } from '@/types/credentials';
import { authOptions } from '@/auth/config';
import Link from 'next/link';
import { getCredentials } from '../../utils/getCredentials';
import UnauthorizedBody from '@/components/UnauthorizedBody';


export default async function DashboardPage() {
  const credentials = await getCredentials();
  const session = await getServerSession(authOptions)

  if (!session) {
    return UnauthorizedBody()

  }


  return (
    <div>
      <div className="flex flex-col space-y-3 justify-center items-center h-screen ">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Available Credentials</h1>
        <h3 className="text-xl text-gray-800 mb-4">Click on a credential to start issuance</h3>
        {credentials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-5 mt-10">
            {credentials.map(({ id, title, issuer }) => (
              <Credential
                id={id}
                title={title}
                issuer={issuer}
                key={id}
              />
            ))}
          </div>
        ) : (
          <div>No credentials are provided.</div>
        )}
        <Logout />
      </div>
    </div>
  );
}


