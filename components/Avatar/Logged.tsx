"use client";
import React from "react";

type AvatarLoggedProps = {
    session: {
        user: Record<string, string>
    }
}

const AvatarLogged: React.FC<AvatarLoggedProps> = ({session}) => {
  return (
    <div className="avatar">
      <div className="mask mask-hexagon w-12">
        <img src={session.user.image} />
      </div>
    </div>);

};

export default AvatarLogged;
