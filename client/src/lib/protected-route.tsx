import { useEffect, ComponentType } from "react";
import { useAuth } from "../hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Route, RouteProps, useLocation } from "wouter";

interface ProtectedRouteProps extends Omit<RouteProps, "component"> {
  component: ComponentType;
}

export function ProtectedRoute({
  path,
  component: Component,
  ...rest
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    );
  }
  
  if (!user) {
    // Use a useEffect to handle navigation after render
    useEffect(() => {
      navigate("/auth");
    }, [navigate]);
    
    return null;
  }

  return (
    <Route path={path}>
      <Component />
    </Route>
  );
}