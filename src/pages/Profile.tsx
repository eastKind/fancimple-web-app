import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/thunks/user";
import { MyParams } from "../types";

function Profile() {
  const { id } = useParams<keyof MyParams>() as MyParams;
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.user);

  const handleLoad = useCallback(async () => {
    await dispatch(getUser(id));
  }, []);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <div>
      <p>{userData?.name}</p>
    </div>
  );
}

export default Profile;
