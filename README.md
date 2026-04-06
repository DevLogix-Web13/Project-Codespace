🌐 RPL Protocol Simulation Framework
Autonomous Network Modeling & Data Analysis

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

📌 Project Overview
This project is an AI-powered simulation environment designed to analyze the Routing Protocol for Low-Power and Lossy Networks (RPL). Built using the Gemini API and Node.js, this tool allows for the rapid prototyping of network behaviors in IoT environments, focusing on DODAG stability, parent selection, and packet delivery efficiency.

Key Portfolio Highlight: This simulation bridges the gap between theoretical network protocols and generative AI, allowing for "what-if" scenario testing that is often too computationally expensive in traditional simulators like Cooja.

📊 Data & Research Objectives
To build a high-fidelity simulation, this project collects and synthesizes data across several key metrics:

1. Network Topologies
*** Grid: Structured placement for industrial sensor monitoring.
*** Random: Modeling ad-hoc deployments in unpredictable environments.

2. RPL-Specific Metrics (Data Points)
We track and document the following parameters to validate the simulation:

*** Rank Calculation: Analyzing the accuracy of Objective Functions (OF0 vs MRHOF).
*** Control Overhead: Measuring the impact of DIO, DIS, and DAO messages on network bandwidth.
*** Churn Rate: Monitoring parent switches in the presence of node failure or signal interference.

🛠 Tech Stack
*** Engine: Node.js
*** LLM Integration: Google Gemini (Generative Modeling of Packet Loss & Node Logic)
*** Frontend: (If applicable, e.g., React/Next.js)
*** Development: Google AI Studio

🚀 Local Deployment
Prerequisites
***Node.js (LTS version)
***A valid Gemini API Key

Installation
Clone the repository:

Bash
git clone https://github.com/[Your-Username]/[Your-Repo-Name].git
cd [Your-Repo-Name]
Install dependencies:

Bash
npm install
Environment Setup:
Create a .env.local file in the root directory:

Plaintext
GEMINI_API_KEY=your_actual_api_key_here
Run the application:

Bash
npm run dev
📈 Future Roadmap
[ ] Dynamic Visualization: Integration of D3.js to map node connections in real-time.
[ ] Dataset Export: Exporting simulation logs in .jsonl format for fine-tuning specialized IoT models.
[ ] Attack Simulation: Modeling Sybil and Blackhole attacks within the RPL rank structure.
