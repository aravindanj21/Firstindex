from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from db import get_connection
from auth import create_access_token

router = APIRouter()


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(data: LoginRequest):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM users
        WHERE username=%s
        AND password=%s
        """,
        (data.username, data.password)
    )

    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Username or Password"
        )

    token = create_access_token(
        {
            "user_id": user["id"],
            "username": user["username"],
            "role": user["role"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user["role"]
    }