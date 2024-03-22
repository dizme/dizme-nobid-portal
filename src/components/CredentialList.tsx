"use client"
import Credential from "@/components/Credential.client"; // Ensure this is a .client.tsx component
import React, { useState } from 'react';
import { AvailableCredential } from '@/types/credentials';

type CredentialListProps = {
  credentials: AvailableCredential[];
};

const CredentialList: React.FC<CredentialListProps> = ({ credentials }) => {
  const [selectedCredentials, setSelectedCredentials] = useState<string[]>([]);

  function handleCredentialSelect(id: string) {
    setSelectedCredentials(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(credId => credId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-5 mt-10">
      {credentials.map((credential) => (
        <Credential
          key={credential.id}
          id={credential.id}
          title={credential.title}
          issuer={credential.issuer}
          selected={selectedCredentials.includes(credential.id)}
          onClick={() => handleCredentialSelect(credential.id)}
        />
      ))}
    </div>
  );
};

export default CredentialList;
