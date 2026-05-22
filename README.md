# VaultSignal

**AI Native Incident Management Platform**

Real-time security monitoring, threat detection, and automated incident response for modern infrastructure teams.

## What it does

VaultSignal monitors your infrastructure for security threats, detects anomalies using AI, and automates incident response workflows — reducing analyst workload and mean time to resolution.

### Core Features

- **Threat Monitoring** — Real-time threat dashboard with severity classification (Critical/High/Medium/Low) and status tracking (Blocked/In-Progress/Pending/Resolved)
- **Event Logs** — Searchable security event log with filtering by status, date, and event type. Tracks login attempts, file access, connection blocks, malware detection, email quarantine
- **Security Reports** — 11 report types: Security Summary, Compliance, Threat Intelligence, Incident, System Health, Access Control, Data Loss Prevention, Vulnerability Management, User Activity Monitoring, Network Security, Backup and Recovery. Exportable as PDF, CSV, XLSX, PPT
- **CVE Index** — Searchable vulnerability database with CVSS scoring, severity classification, and category breakdown (Remote Code Execution, Authentication Bypass, SQL Injection, Command Injection, etc.)
- **Analytics** — Threat severity distribution, attack vector analysis, hours saved metrics, detection rate tracking (98% detection, 67ms response time)
- **Automated Workflows** — 130+ automation templates: Threat Auto-Response, Log Triage Pipeline, CVE Alert Escalation, Incident Report Generator, Phishing Detection, Network Anomaly Scanner
- **RBAC** — Role-based access control (Root Admin, Super Admin, Admin, Analyst) with device tracking
- **Collaborative Reports** — Real-time co-editing with comments, sections (Executive Summary, Threat Landscape, Vulnerability Assessment, Risk Matrix, Incident Log, Recommendations)

### AI Capabilities

- AI-powered threat trend analysis
- ML-based risk assessment (Network Security, User Access, Data Protection, Vulnerability scoring)
- Anomaly detection: manipulative login patterns, freemium abuse, brute force attempts
- Automated CVE mapping to active incidents with CVSS scoring

## Architecture

```
Client Apps (Frontend/Backend)
        |
   VaultSignal SDKs (auto log collection + manual signal integration)
        |
   Data Ingestion → Analytics DB (PostgreSQL)
        |
   ┌────┴────┐
   |         |
Alert Monitor  Analysis Pipeline (cron)
   |         |
Backend Application
   |
   ├── User Dashboard
   └── Alert Destinations (Slack, Teams)
```

**Data Pipeline:** Data Collection → Ingestion & Preprocessing → Analysis & Detection → Storage & Processing → Intelligence & Scoring → Alert Generation → Response & Action

**Threat Signals:** Port scanning, DDoS, file system scanning, downtime monitoring, SQL injection, brute force, ransomware, privilege escalation, XSS, lateral movement

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 7, Tailwind CSS 4
- **UI Components:** Radix UI (Select, Popover, Dialog, Dropdown), Vaul (Drawer)
- **Data Tables:** AG Grid
- **Routing:** React Router v7
- **Planned Backend:** PostgreSQL, Node.js, VaultSignal SDKs

## Project Structure

```
src/
  App.tsx                    # Router setup
  pages/
    MainLayout.tsx           # Layout with sidebar navigation
    Threats.tsx              # Threat monitoring dashboard
    EventLog.tsx             # Security event log with AG Grid
    Reports.tsx              # Report management with filters
    components/
      DashBoardItem.tsx      # Sidebar navigation items
      Status.tsx             # Status cards
  components/
    ui/                      # Radix UI primitives (button, select, calendar, table, drawer)
    wrappers/                # SelectWrapper, CalendarWrapper
  data/
    threat_sample.tsx        # Threat data
    event_sample.tsx         # Event log data
    report_sample.tsx        # Report data
  types/
    global-type.ts           # TypeScript types (Threat, EventLogs, Report, RBAC types)
  global-components/
    Header.tsx               # Top navigation bar
    DrawerWrapper.tsx        # Sidebar drawer
logs/
  VS logs - Sheet1.csv       # Sample security log data (1000 entries)
```

## Run Locally

```bash
git clone https://github.com/chaitanyagatreddi/vaultsignal.git
cd vaultsignal
npm install
npm run dev
# Open http://localhost:5173
```

## Key Metrics (from prototype testing)

| Metric | Value |
|---|---|
| Threat Detection Rate | 98% |
| Response Time | 67ms |
| Events/Hour | 914 |
| Analyst Hours Saved/Month | 847 (+18%) |
| Labor Cost Saved/Month | $71,995 |
| Financial Damage Prevented | $8.4M |
| Incidents Blocked | 6 (avg 4m 12s response) |
| Automation Workflows | 130 built |

## Waitlist

1,700 signups during validation phase.

## Contributing

VaultSignal is open source while in freemium. Contributions welcome.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

All PRs are reviewed before merging. Please keep changes focused and include a clear description of what you changed and why.

### Ideas for contributions

- Backend API (Node.js + PostgreSQL)
- Additional threat detection modules
- Dashboard analytics charts
- Dark theme (V2 design)
- Notification integrations (Slack, Teams, PagerDuty)
- SDK for automatic log collection

## License

MIT — see [LICENSE](LICENSE) for details.

---

*VaultSignal — AI Native Incident Management*
