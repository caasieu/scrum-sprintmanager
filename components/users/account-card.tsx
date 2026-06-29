'use client'

import { useAuth } from "@/lib/auth/use-auth";
import { useEffect } from "react";

export function AccountCard() {

  const { user, loading, fetchUser } = useAuth();
  
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);


  //if (loading) return <div>Loading...</div>;

  //if (!user) return <div>Not logged in</div>;

  return (
    <div className="flex items-center justify-between min-h-[4rem] w-full px-3 py-1.5 text-xs">
      <div className="flex items-center gap-2">
        <div className="border border-app-border w-[3rem] h-[3rem] rounded-md"></div>

        <div className="flex flex-col gap-1 items-start">
          <div> <span className="font-semibold"> {user?.fullName} </span> </div>
          <div> <span> @{user?.username} </span> </div>
        </div>
      </div>

      <div className="border border-app-border ">
        <span> [edit] </span>
      </div>
    </div>
  );
}
