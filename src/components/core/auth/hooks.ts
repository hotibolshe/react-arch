import { useState, useEffect } from "react";
import { userService } from "../../../services/UserService";
import { UserModel } from "../../../models/UserModels";

export type AuthCheckStatus = {
  isAuthChecked: boolean,
  isAuthCheckInProcess: boolean
}

const authCheckStatuses = {
  inProcess: {
    isAuthChecked: false,
    isAuthCheckInProcess: true
  },
  complete: {
    isAuthChecked: true,
    isAuthCheckInProcess: false
  },
};

function useInitialAuthCheck(setUserData: (userData: UserModel | null) => void) {
  const [authCheckStatus, setAuthCheckStatus] = useState<AuthCheckStatus>(authCheckStatuses.inProcess);

  useEffect(() => {
    async function getUserInfo() {
      const {success, payload} = await userService.getUserInfo()
      if (success && payload instanceof UserModel) {
        setUserData(payload);
      }

      setAuthCheckStatus(authCheckStatuses.complete);
    }

    setAuthCheckStatus(authCheckStatuses.inProcess)
    getUserInfo();
  }, [setUserData]);

  return authCheckStatus;
}

export {
  useInitialAuthCheck
}
