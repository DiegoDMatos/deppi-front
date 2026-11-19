import { useAuth } from "@/contexts/auth-context"
import { Permission } from "@/lib/types/auth";
import { ReactNode } from "react";

type CanProps = {
  permissions: Permission[]
  children: ReactNode
}

export function Can({ permissions, children}: CanProps){
    const { user } = useAuth();
    const userPermissions = user?.permissions;
    const allowed = permissions.find((permission) =>
        userPermissions?.includes(permission)
    )

    return allowed ? <>{children}</> : null;
}