"use client";
import React, { useState, useEffect, useContext } from "react";
import { ModeToggle } from "./mode-toggle";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { signOut } from "firebase/auth";
import { Badge } from "../ui/badge";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import { TimerContext } from "../context/timerContext";
import { formatTime } from "@/lib/formatTime";

const TopNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user] = useAuthState(auth);
  const userName = user?.displayName;
  const { counter, setCounter } = useContext(TimerContext);

  // const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Start the counter when component mounts
    const timer = setInterval(() => {
      setCounter(counter + 1);
    }, 1000); // Increment the counter every second

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [counter, setCounter]); // Empty dependency array ensures that effect runs only once

  return (
    <div className="fixed top-10 left-0 z-50 w-full">
      <div className="m-auto flex justify-between items-stretch  w-11/12  print:hidden">
        <div className="w-[33.3%] flex">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Badge variant="secondary" className="h-full">
                Hi {userName}
              </Badge>
            </DropdownMenuTrigger>
            {user && (
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut(auth);
                      router.push("/");
                    }}
                    className="h-4"
                  >
                    SignOut
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>

        {user && pathname === "/signin" && (
          <div className="w-[33.3%] flex justify-center">
            <Badge
              variant="destructive"
              className="h-full self-center align-middle"
            >
              {formatTime(counter)}
            </Badge>
          </div>
        )}
        <div className="w-[33.3%] flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
