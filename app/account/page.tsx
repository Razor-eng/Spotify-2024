"use client";

import Header from "@/components/Header"
import { useUser } from "@/hooks/useUser"

export default function Page() {
  const { user } = useUser();
  return (
    <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Account Details</h1>
        </div>
      </Header>
      <div className="flex gap-6 items-center ml-4">
        <h2 className="text-xl text-zinc-300">
          {user?.email}
        </h2>
        <h3 className="text-sm text-green-600">
          {user?.aud}
        </h3>
      </div>
    </div>
  )
}
