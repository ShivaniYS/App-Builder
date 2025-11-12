App-Builder: Agentic AI Software Engineer
This project implements a sophisticated Agentic AI workflow using LangGraph to build the App-Builder—an autonomous software development assistant that can reason, plan, execute, and refactor code, mimicking a complete software development lifecycle.

The primary goal is to take a high-level user request (e.g., "create a calculator app") and autonomously generate a fully functional, self-contained application using its own set of tools and logic.

🌟 Project Features
Autonomous Planning: Generates a detailed project plan, including necessary files, features, and technology choices (HTML/CSS/JS, Python, etc.).

Structured Architecting: Breaks down the plan into granular, step-by-step implementation instructions for the coding agent.

Code Generation: Writes and manages files on the local filesystem using custom tools.

Self-Correction Loop: The LangGraph structure enables internal feedback and conditional loops to ensure all planned features are implemented correctly before completion.

⚙️ Technical Architecture (The Agent Graph)
The App-Builder operates as a state machine managed by LangGraph, routing tasks between three specialized agents:

1. Planner Agent
Role: Defines Scope. Takes the user prompt and produces a structured, actionable project plan (features, files, tech stack).

Key Output: Project Plan

2. Architect Agent
Role: Designs Implementation. Takes the plan and translates it into detailed, file-specific coding instructions for the Coder.

Key Output: Step-by-step Code Tasks

3. Coder Agent
Role: Executes Code. A ReAct agent that performs file operations (read_file, write_file) based on the Architect's instructions.

Key Output: Generated Code Files

🔨 Tools & Dependencies
This project relies on the following key libraries and services:

LangGraph: Used for defining and managing the multi-agent workflow and state transitions.

LangChain: Provides the base Agent structure, LLM integration, and standard tools.

LLM Provider: Utilizes high-speed models (often via Groq or similar fast APIs) for rapid reasoning and code generation.

Custom Tools: Implemented Python functions allowing the Coder Agent to interact with the file system (list_files, read_file, write_file).

🚀 Getting Started
Follow these steps to set up and run the App-Builder locally.

Prerequisites
Python 3.10+

A valid API key for your chosen LLM provider (e.g., Groq, OpenAI).

Setup
Clone the Repository:
git clone https://github.com/ShivaniYS/App-Builder.git
cd App-Builder

Install Dependencies:
pip install -r requirements.txt
Set Environment Variables: Create a file named .env in the root directory and add your API key:

GROQ_API_KEY="YOUR_API_KEY_HERE"
### Or, if using OpenAI:
### OPENAI_API_KEY="YOUR_API_KEY_HERE"
Running the Agent
Execute the main file and provide your coding request as a prompt:

Bash
python main.py "Create a simple calculator."
The App-Builder will then begin its process, showing the execution flow through the Planner, Architect, and Coder Agents, resulting in the creation of the requested files.
