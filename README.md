# SkillBridge

SkillBridge is a B2B SaaS platform for organizational knowledge transfer between senior and junior workers. This monorepo hosts the API, web app, and processor service that power the platform.

## Architecture

```
+-------------------+        +-------------------+        +----------------------+
|  Next.js Web App  |  --->  |  Fastify API      |  --->  |  FastAPI Processor   |
|  apps/web         |        |  apps/api         |        |  services/processor  |
+-------------------+        +-------------------+        +----------------------+
           |                          |                               |
           +---------- Shared Types (@skillbridge/types) ------------+
```

## Local setup

### Prerequisites
- Node.js 20+
- pnpm 11+
- Python 3.12+
- Docker (optional for containerized runs)

### Install dependencies
```bash
pnpm install
```

### Run services locally
```bash
pnpm --filter @skillbridge/api dev
pnpm --filter @skillbridge/web dev
```

In another terminal for the processor service:
```bash
cd services/processor
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Run with Docker Compose
```bash
docker compose up --build
```

The services will be available at:
- API: http://localhost:3000
- Web: http://localhost:3001
- Processor: http://localhost:8000
