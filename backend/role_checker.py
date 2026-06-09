from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from auth import verify_token

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    payload = verify_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )

    return payload


def require_role(roles):

    def role_checker(
        user=Depends(get_current_user)
    ):

        if user["role"] not in roles:
            raise HTTPException(
                status_code=403,
                detail="Access Denied"
            )

        return user

    return role_checker