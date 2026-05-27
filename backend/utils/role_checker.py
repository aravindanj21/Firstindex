from fastapi import HTTPException

def admin_only(role):
    if role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Access Denied"
        )