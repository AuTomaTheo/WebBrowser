import { useAuth } from "../hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Route, RouteProps, useLocation } from "wouter";

interface ProtectedRouteProps extends Omit<RouteProps, "component"> {
  component: React.ComponentType;
}

export function ProtectedRoute({
  path,
  component: Component,
  ...rest
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    );
  }

  const [, navigate] = useLocation();
  
  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <Route path={path}>
      <Component />
    </Route>
  );
}