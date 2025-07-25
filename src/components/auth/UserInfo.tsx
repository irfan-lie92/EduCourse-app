"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";

export function UserInfo() {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  const isAdmin = session.user.role === "admin";

  return (
    <Card
      className={
        isAdmin ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"
      }
    >
      <CardContent className="p-3">
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 ${isAdmin ? "bg-red-500" : "bg-blue-500"} rounded-full flex items-center justify-center text-white font-semibold text-sm`}
          >
            {session.user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-900">
                {session.user.name}
              </p>
              {isAdmin && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600">{session.user.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
