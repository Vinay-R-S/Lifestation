# LifeStation

A gamified habit-building mobile app that transforms addiction recovery into a rewarding journey using daily tasks, avatar customization, and NFT rewards. Built with React Native and Firebase, LifeStation empowers users to reclaim their routine in an engaging and interactive way.

---

## Project Overview

LifeStation is designed to promote healthy habit formation, especially in users recovering from addiction. The app gamifies day-to-day progress by offering XP for completing tasks, customizing avatars, and unlocking NFTs. With a strong emphasis on behavioral psychology and gamification, the app provides a digital support system tailored to motivate and reward consistency.

---

## Features

* Daily Task Manager
* Avatar customization based on progress
* Earnable coins and NFTs on milestones
* Streak Tracking and Health Bars
* Secure Firebase Authentication
* NFT minting via blockchain integration
* Fully responsive React Native frontend
* Robust testing with Jest and CI/CD integration

---

## Tech Stack

* **Frontend:** React Native (Expo), TypeScript
* **Backend:** Firebase Auth + Firestore
* **Blockchain:** Ethereum / Polygon for NFT minting
* **DevOps:** GitHub Actions, Docker, Expo CLI
* **Testing:** Jest, React Native Testing Library

---

## Installation

Clone the repo:

```bash
git clone https://github.com/Vinay-R-S/Lifestation
cd Lifestation
npm install
```

For Docker-based setup:

```bash
docker-compose up --build
```

Ensure Expo CLI is installed:

```bash
npm install
npx expo start
```

---

## Running the App

Run in development mode:

```bash
npx expo start
```

Or run on an Android/iOS emulator or Expo Go:

* Android: Press a or scan QR in Expo Go
* iOS: Press i (macOS only)

---

## CI/CD Workflow

Implemented using GitHub Actions:

* Triggers on push/pull requests to main
* Steps:
  * Install dependencies
  * Run Jest tests
  * Validate TypeScript
  * Build with Expo
  * Creates Docker Image and Docker Container
* Configured in: .github/workflows/ci.yml

---

## Agile Methodology

We adopted the Agile Scrum process with 6 sprints between Feb and May 2025. Each sprint focused on specific feature sets (e.g., UI, blockchain, backend, CI/CD) with sprint reviews and retrospectives.

Roles:

* Product Owner: Sushruth V Kamble
* Scrum Master: Sri Krishna R Hebbar
* Developers: Prajna M S, Vinay Saunshi

Artifacts:

* Sprint Backlog, Product Backlog, Burndown Charts
* User Stories and Task Boards in GitHub Projects

---

## DevOps Tools Used

* GitHub Actions for CI/CD automation
* Docker & Docker Compose for local environment setup
* Expo CLI for mobile development
* Firebase Hosting (for future deployment)
* Blockchain integration via Smart Contracts for NFTs

---

## Contributing

We welcome contributions from the community!

1. Fork the repo
2. Create your feature branch: git checkout -b feature/YourFeature
3. Commit changes: git commit -m 'Add YourFeature'
4. Push to the branch: git push origin feature/YourFeature
5. Open a Pull Request

---

## Future Scope

* Integration with wearable devices (e.g., Fitbit, Garmin)
* AI-powered task recommendations
* Cloud deployment and CI/CD for production builds
* Enhanced security for NFT minting and wallet binding
* Multiplayer streak challenges among users
