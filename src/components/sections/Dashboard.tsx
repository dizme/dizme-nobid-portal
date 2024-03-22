import React from 'react';
import Logout from "@/components/Logout";
import { getServerSession } from "next-auth";
import { AvailableCredential } from '@/types/credentials';
import { authOptions } from '@/auth/config';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';


interface DashboardPageProps {
  credentials: AvailableCredential[];
}

export default function DashboardPage({ credentials }: DashboardPageProps) {
  return (
    <div className="flex flex-col space-y-3 justify-center items-center h-screen">
      <h1>Dashboard</h1>
      {credentials.length > 0 ? (
        credentials.map((credential, index) => (
          // Ensure you have a unique key for each child in the list.
          <div key={credential.id}>Credential {index + 1}: {credential.issuer.name}</div>
        ))
      ) : (
        <div>No credentials are provided.</div>
      )}
      <Logout />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return { redirect: { destination: "/", permanent: false } };
  }

  // Replace this URL with your actual endpoint
  const credentialsUrl = `${process.env.PUBLIC_VC_REPO}/api/list`;
  const response = await fetch(credentialsUrl);
  console.log(response);
  const credentials: AvailableCredential[] = await response.json();
  console.log(credentials);
  return {
    props: {
      credentials,
    },
  };
}