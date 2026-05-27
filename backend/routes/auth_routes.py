from fastapi import APIRouter
from utils.jwt_handler import create_access_token

router = APIRouter()

@router.post("/login")
def login():

    token = create_access_token({
        "email": "admin@gmail.com",
        "role": "admin"
    })

    return {
        "success": True,
        "token": token
    }