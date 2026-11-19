import { useAuth } from "@/contexts/auth-context"
import { Permission } from "@/lib/types/auth";
import { ReactNode } from "react";

type CanProps = {
  permissions: Permission[]
  children: ReactNode
}

function useCan(permissions: Permission[]){
    const { user } = useAuth();
    const userPermissions = user?.permissions;
    return permissions.find((permission) =>
        userPermissions?.includes(permission)
    )
}

export function Can({ permissions, children}: CanProps){
    const allowed = useCan(permissions)
    return allowed ? <>{children}</> : null;
}