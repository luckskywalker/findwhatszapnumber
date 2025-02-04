"use client";
import Button from "../Button";
import Avatar from "../Avatar";
import {SessionProvider, useSession, signOut, signIn} from "next-auth/react";

function NavMain() {
  const {data: session} = useSession();
  return (

    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">Ache</a>
      </div>
      <div className="flex-none">
        {
          session ?
            <div className="flex gap-1">
              <Avatar.Logged session={session as { user: Record<string, string> }} />
              <Button.SignOut onClick={signOut} />
            </div>
            :
            <Button.SignIn onClick={signIn} />
        }
      </div>
    </div>
  );
}

const NavMainProvider = () => {
  return <SessionProvider>
    <NavMain />
  </SessionProvider>;
};


export default NavMainProvider;
