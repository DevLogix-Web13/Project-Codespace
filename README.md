# 🌐 RPL Protocol Simulation & Analytical Framework

[![Gemini Powered](https://img.shields.io/badge/AI-Gemini%20Flash-blue?style=flat-square)](https://ai.google.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-green?style=flat-square)](https://nodejs.org/)

A high-fidelity simulation environment for **Routing Protocol for Low-Power and Lossy Networks (RPL)**. This project leverages Generative AI to model complex IoT network behaviors, providing a scalable alternative to traditional hardware-intensive simulators.

---

## 🚀 Executive Summary
This project was developed to investigate the efficiency of the RPL protocol in dynamic environments. By integrating **Google Gemini API**, the simulation moves beyond static rule-sets to model stochastic packet loss, node failure patterns, and adaptive routing logic. This serves as a key pillar in my portfolio, demonstrating expertise in **Network Protocols**, **AI Integration**, and **Full-Stack Development**.

---

## 🛠 Core Technical Features
* **DODAG Construction:** Real-time modeling of Destination-Oriented Directed Acyclic Graphs.
* **Objective Function Analysis:** Comparative data collection between **OF0 (Objective Function Zero)** and **MRHOF (Minimum Rank with Hysteresis Objective Function)**.
* **Telemetry Logging:** Granular data capture including Rank shifts, ETX (Expected Transmission Count), and Control Message overhead.
* **Scalable Architecture:** Built on a modular Node.js backend for rapid iteration.

---

## 📊 Data Collection Schema
To facilitate the "Data Build" phase of this simulation, the following metrics are tracked:

| Data Category | Parameter | Description |
| :--- | :--- | :--- |
| **Topology** | `Node Density` | Number of active nodes within a defined radio range. |
| **Reliability** | `PDR` | Packet Delivery Ratio measured against simulation time. |
| **Stability** | `Parent Switches` | Frequency of preferred parent changes (Churn). |
| **Efficiency** | `Control Overhead` | Ratio of DIO/DAO messages to user data packets. |

---

## 💻 Technical Implementation

### **Prerequisites**
* **Node.js** (v18.x or higher)
* **npm** (v9.x or higher)
* **Google AI Studio API Key**

### **Installation & Deployment**
1. **Clone the Repository**
   ```bash
   git clone [https://github.com/YourUsername/RPL-Simulation-App.git](https://github.com/YourUsername/RPL-Simulation-App.git)
   cd RPL-Simulation-App

2. Dependency Management

Bash
npm install
Environment Configuration
Create a .env.local file in the root directory:

Code snippet
GEMINI_API_KEY=your_secure_api_key_here
Execution

Bash
npm run dev
📂 Project Structure
* /src - Core simulation logic and protocol modeling.

* /data - Standardized JSON/CSV outputs for simulation results.

* /config - RPL parameter definitions and AI prompts.

🎯 Portfolio Significance
This project demonstrates a multi-disciplinary approach to software engineering:

* Protocol Knowledge: Deep dive into RFC 6550 (RPL) standards.

* AI Orchestration: Using LLMs for complex systems modeling rather than simple chat.

* Data Integrity: Building robust logging systems to ensure simulation reproducibility.

Developed by Romel Montiagodo | LinkedIn: https://www.linkedin.com/in/romel-montiagodo-533598318/ | Portfolio Website: devlogix-codebase-5y2lqyoow-devlogix-web13s-projects.vercel.app


### Pro-Tips for your Portfolio:
1.  **The Banner:** Make sure your `src` link for the image is correct. If you have the image in your repo, change the link to `./assets/banner.png`.
2.  **Screenshots:** After you run the app, take 2–3 screenshots of the simulation logs or UI and add a `## Media` section. Recruiters love seeing the actual interface.
3.  **License:** If you plan on making this public, add a `LICENSE` file (like MIT) to show you understand open-source standar
