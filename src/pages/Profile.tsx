import React, { useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useParams, useLocation, Outlet, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/thunks/user";
import { MyParams } from "../types";
import Container from "../components/Container";
import ProfileHeader from "../components/ProfileHeader";

function Profile() {
  const location = useLocation();
  const { isMe } = location.state as { isMe: boolean };
  const { id } = useParams<keyof MyParams>() as MyParams;
  const user = useAppSelector((state) =>
    isMe ? state.user.me : state.user.other
  );
  const dispatch = useAppDispatch();

  const activeStyle: React.CSSProperties = {
    textDecoration: "underline",
  };

  const handleLoad = useCallback(async () => {
    await dispatch(getUser(id));
  }, [id]);

  useEffect(() => {
    if (!isMe) handleLoad();
  }, [isMe, handleLoad]);

  return (
    <>
      <Helmet>
        <title>{user.name} - fancimple</title>
      </Helmet>
      <Container>
        <ProfileHeader user={user} />
        <ul>
          <li>
            <NavLink
              to={`/${id}`}
              style={({ isActive }) => (isActive ? activeStyle : {})}
              state={{ isMe }}
            >
              게시물
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${id}/bookmark`}
              style={({ isActive }) => (isActive ? activeStyle : {})}
              state={{ isMe }}
            >
              북마크
            </NavLink>
          </li>
        </ul>
        <div>
          <Outlet />
        </div>
      </Container>
    </>
  );
}

export default Profile;
