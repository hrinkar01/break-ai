# break-ai ⚡

**An open-source security sandbox and reference architecture for testing vulnerabilities in modern Agentic AI systems.**

`break-ai` provides isolated environments to simulate, evaluate, and analyze security risks in AI agents—including indirect prompt injection, tool misuse, and Model Context Protocol (MCP) privilege escalation.

> Built as an open-source sandbox prototype for testing agentic AI security scenarios.

---

## 📌 Architecture & Features

As AI agents gain autonomous capabilities (file system access, database queries, web scraping, and tool calls), their attack surfaces expand. `break-ai` provides a controlled playground to explore these failure modes safely.

- 🤖 **Vulnerable Agent Runtime:** Lightweight LLM agent setup with configurable tool interfaces.
- 🧪 **Interactive Security Scenarios:** CTF-style challenges demonstrating real-world exploit vectors.
- 🐳 **Isolated Sandbox Environment:** Dockerized container setup to ensure safe execution during payload testing.

---

## 🛠️ Repository Layout

```text
break-ai/
├── README.md
├── requirements.txt
├── docker-compose.yml
├── .gitignore
├── src/
│   ├── agent.py      # LLM agent runtime and prompt configuration
│   ├── tools.py      # Vulnerable tool executions (File system, Shell, DB)
│   └── server.py     # FastAPI endpoint exposing agent capabilities
└── challenges/
    └── 01_indirect_injection/
        ├── README.md # Challenge instructions and system constraints
        └── exploit.py# Proof-of-Concept execution script