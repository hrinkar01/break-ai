from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from agent import VulnerableAgent

app = FastAPI(
    title="break-ai API",
    description="Intentionally Vulnerable AI Agent Sandbox & CTF Engine",
    version="0.1.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the vulnerable agent
agent = VulnerableAgent()

# Valid challenge flags for scoreboard verification
VALID_FLAGS = {
    "FLAG{system_prompt_leakage_juice_shop_v1}": "Challenge 1: System Prompt Leakage",
    "FLAG{path_traversal_tool_execution_1337}": "Challenge 2: Path Traversal Tool Abuse",
    "FLAG{mcp_broken_access_control_8821}": "Challenge 3: Database Access Control Bypass"
}


# --- Request & Response Schemas ---

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class FlagVerificationRequest(BaseModel):
    flag: str

class FlagVerificationResponse(BaseModel):
    status: str
    message: str
    challenge_title: str


# --- API Endpoints ---

@app.get("/")
def read_root():
    return {"status": "online", "system": "break-ai Sandbox Backend", "version": "0.1.0"}


@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    """Processes user input through the Vulnerable Agent loop."""
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    
    output = agent.process_message(request.message)
    return ChatResponse(response=output)


@app.post("/api/verify", response_model=FlagVerificationResponse)
def verify_flag(request: FlagVerificationRequest):
    """Verifies CTF flags submitted by users."""
    submitted_flag = request.flag.strip()
    
    if submitted_flag in VALID_FLAGS:
        return FlagVerificationResponse(
            status="success",
            message="Correct flag! Challenge completed.",
            challenge_title=VALID_FLAGS[submitted_flag]
        )
    
    raise HTTPException(status_code=400, detail="Invalid flag. Keep hunting!")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)