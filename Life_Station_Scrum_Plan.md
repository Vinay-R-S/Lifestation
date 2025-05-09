# Agile Scrum Plan for Life Station (Feb 1 – May 14)

*Updated with clear separation: 3 frontend-only sprints, 1 blockchain sprint, 1 backend-only sprint, 1 polishing + CI/testing sprint.*

---

## Sprint 1: Feb 1 – Feb 14 (Frontend Only)

### Sprint Backlog:

| PBI | Description                    |
| --- | ------------------------------ |
| 1.1 | Design login and signup UI     |
| 3.1 | Implement “Tasks” tab UI     |
| 3.2 | Modal for adding/editing tasks |

### Daily Sprint Summary (Highlights):

| Day    | Progress                       | Blockers        | Solutions/Discussions             |
| ------ | ------------------------------ | --------------- | --------------------------------- |
| Feb 2  | Login UI wireframe complete    | None            | -                                 |
| Feb 3  | Task tab UI layout initiated   | None            | -                                 |
| Feb 5  | Signup UI + modal design ready | Modal close bug | Used portal-based modal structure |
| Feb 9  | UI polish and responsiveness   | None            | -                                 |
| Feb 12 | Final frontend QA              | UX glitches     | Feedback implemented              |

---

## Sprint 2: Feb 15 – Feb 28 (Frontend Only)

### Sprint Backlog:

| PBI | Description                        |
| --- | ---------------------------------- |
| 3.3 | Display tasks and update status    |
| 4.1 | Design avatar tab UI               |
| 4.2 | Display accessories, visual update |

### Daily Sprint Summary:

| Day    | Progress                     | Blockers         | Solutions/Discussions    |
| ------ | ---------------------------- | ---------------- | ------------------------ |
| Feb 16 | Task status update started   | None             | -                        |
| Feb 18 | Avatar SVG base created      | None             | -                        |
| Feb 22 | Accessories mapped visually  | Animation jitter | Switched to SVG grouping |
| Feb 26 | Task + Avatar UI integration | UI conflicts     | Applied scoped styles    |

---

## Sprint 3: Mar 1 – Mar 14 (Frontend Only)

### Sprint Backlog:

| PBI | Description                         |
| --- | ----------------------------------- |
| 4.3 | Use coins to buy accessories        |
| 4.4 | Implement lock/unlock system        |
| 3.4 | Integrate game logic (coin, health) |
| 3.5 | Reward/penalty logic                |

### Daily Sprint Summary:

| Day    | Progress                        | Blockers                    | Solutions/Discussions             |
| ------ | ------------------------------- | --------------------------- | --------------------------------- |
| Mar 2  | Game logic prototype started    | None                        | -                                 |
| Mar 5  | Coin-based purchase logic added | Sync delay with state       | Retry + toast feedback added      |
| Mar 9  | Lock/unlock system functioning  | Avatar state not persisting | Debugged state load from frontend |
| Mar 12 | Reward/penalty logic completed  | None                        | -                                 |

---

## Sprint 4: Mar 15 – Mar 30 (Blockchain - NFT Marketplace)

### Sprint Backlog:

| PBI | Description                                            |
| --- | ------------------------------------------------------ |
| BC1 | Create NFT smart contracts using Hardhat + Solidity    |
| BC2 | Mint avatars as NFTs on user request                   |
| BC3 | Setup Web3 wallet connect (Metamask)                   |
| BC4 | Build marketplace UI to list, buy, and view owned NFTs |
| BC5 | Host and integrate marketplace with main app           |

### Daily Sprint Summary:

| Day    | Progress                           | Blockers                   | Solutions/Discussions     |
| ------ | ---------------------------------- | -------------------------- | ------------------------- |
| Mar 16 | Smart contract structure initiated | Solidity type error        | Resolved with uint256 fix |
| Mar 19 | NFT minting logic working          | Avatar image upload issues | Used IPFS + pinata        |
| Mar 23 | Web3 connect tested                | Wallet auth flow glitch    | Restructured wallet logic |
| Mar 28 | Marketplace UI integrated          | CORS errors                | Fixed via proxy configs   |

---

## Sprint 5: Apr 1 – Apr 14 (Backend Only)

### Sprint Backlog:

| PBI | Description                                         |
| --- | --------------------------------------------------- |
| 1.2 | Implement backend authentication                    |
| 2.1 | Setup Firestore: User + Task tables                 |
| 2.2 | Initial backend environment setup                   |
| 2.4 | Define schema for avatar coins, health, accessories |

### Daily Sprint Summary:

| Day    | Progress                 | Blockers               | Solutions/Discussions |
| ------ | ------------------------ | ---------------------- | --------------------- |
| Apr 2  | Firebase auth backend    | Callback not firing    | Added error logging   |
| Apr 5  | Firestore schema created | Table references buggy | Revised schema        |
| Apr 10 | Backend testing complete | None                   | -                     |

---

## Sprint 6: Apr 15 – May 14 (Final Touch: Backend + Testing + CI/CD + UI Polish)

### Sprint Backlog:

| PBI   | Description                               |
| ----- | ----------------------------------------- |
| 4.5   | Sync purchases with backend               |
| 5.1   | Unit test backend endpoints               |
| 5.2   | Integration testing: tasks + avatar + NFT |
| 5.3   | Manual frontend testing                   |
| CI/CD | Setup GitHub Actions for deployment       |
| UX    | Final UI adjustments + walkthrough        |
|       |                                           |

### Daily Sprint Summary:

| Day    | Progress                  | Blockers          | Solutions/Discussions |
| ------ | ------------------------- | ----------------- | --------------------- |
| Apr 17 | CI/CD basic pipeline done | Token cache issue | Added GitHub secrets  |
| Apr 20 | Testing avatar + backend  | Sync lag          | Snapshot listener fix |
| Apr 25 | UX polishing complete     | Overlap on mobile | Adjusted layout logic |
| May 1  | Full testing             | None              | -                     |





# LifeStation Requirements Traceability Matrix (RTM)

## 1. Introduction

This Requirements Traceability Matrix (RTM) maps the functional and non-functional requirements of the LifeStation application to their corresponding test cases. The RTM ensures that all requirements are covered by tests and provides a clear overview of requirement validation.

## 2. Requirements Traceability Table

| Req ID | Requirement Description | Type | Test Case ID | Test Case Description | Test Status |
|--------|-------------------------|------|-------------|----------------------|------------|
| FR-01 | The system shall display themed text with different styling options | Functional | UT-01 | ThemedText - Renders correctly with default props | PASSED |
| FR-01 | The system shall display themed text with different styling options | Functional | UT-02 | ThemedText - Applies title style when type is title | PASSED |
| FR-01 | The system shall display themed text with different styling options | Functional | UT-03 | ThemedText - Applies subtitle style when type is subtitle | PASSED |
| FR-01 | The system shall display themed text with different styling options | Functional | UT-04 | ThemedText - Applies custom style when provided | PASSED |
| FR-01 | The system shall display themed text with different styling options | Functional | UT-05 | ThemedText - Applies link style when type is link | PASSED |
| FR-02 | The system shall manage game state including coins and health | Functional | UT-06 | GameStateContext - Provides initial state values | PASSED |
| FR-02 | The system shall manage game state including coins and health | Functional | UT-07 | GameStateContext - Adds coins and shows notification | PASSED |
| FR-02 | The system shall manage game state including coins and health | Functional | UT-08 | GameStateContext - Deducts health and shows notification | PASSED |
| FR-02 | The system shall manage game state including coins and health | Functional | UT-13 | GameStateContext - Handles decimal coin amounts correctly | PASSED |
| FR-02 | The system shall manage game state including coins and health | Functional | UT-14 | GameStateContext - Prevents health from going below 0 | PASSED |
| FR-03 | The system shall track habit streaks and progress dates | Functional | UT-09 | GameStateContext - Updates last progress date for a task | PASSED |
| FR-03 | The system shall track habit streaks and progress dates | Functional | UT-10 | GameStateContext - Updates habit streak for a task | PASSED |
| FR-04 | The system shall display notifications for state changes | Functional | UT-07 | GameStateContext - Adds coins and shows notification | PASSED |
| FR-04 | The system shall display notifications for state changes | Functional | UT-08 | GameStateContext - Deducts health and shows notification | PASSED |
| FR-04 | The system shall display notifications for state changes | Functional | UT-11 | GameStateContext - Clears notification | PASSED |
| FR-05 | The system shall prevent health from going below zero | Functional | UT-14 | GameStateContext - Prevents health from going below 0 | PASSED |
| FR-06 | The system shall display an empty state for task lists | Functional | PT-06 | Task List Empty State Performance | PASSED |
| FR-07 | The system shall facilitate navigation between screens | Functional | PT-07 | Navigation State Change Performance | PASSED |
| FR-07 | The system shall facilitate navigation between screens | Functional | PT-12 | Navigation Deep Link Performance | PASSED |
| FR-08 | The system shall support task management functionality | Functional | PT-02 | TaskManager Initial Render | PASSED |
| FR-08 | The system shall support task management functionality | Functional | PT-08 | TaskManager With Tasks Performance | PASSED |
| FR-09 | The system shall allow adding new tasks via modal | Functional | PT-03 | AddTaskModal Performance | PASSED |
| FR-09 | The system shall allow adding new tasks via modal | Functional | PT-09 | AddTaskModal With Validation Performance | PASSED |
| FR-10 | The system shall display game statistics | Functional | PT-04 | GameStats Render Performance | PASSED |
| FR-10 | The system shall display game statistics | Functional | PT-10 | GameStats With Data Performance | PASSED |
| NFR-01 | The app layout shall render within 600ms | Non-Functional | PT-01 | App Layout Initial Render | PASSED |
| NFR-02 | The task manager shall render within 500ms | Non-Functional | PT-02 | TaskManager Initial Render | PASSED |
| NFR-03 | The add task modal shall mount within 200ms | Non-Functional | PT-03 | AddTaskModal Performance | PASSED |
| NFR-04 | The add task modal shall unmount within 100ms | Non-Functional | PT-03 | AddTaskModal Performance | PASSED |
| NFR-05 | The game stats component shall render within 200ms | Non-Functional | PT-04 | GameStats Render Performance | PASSED |
| NFR-06 | The empty task list shall render within 300ms | Non-Functional | PT-06 | Task List Empty State Performance | PASSED |
| NFR-07 | Navigation state changes shall occur within 400ms | Non-Functional | PT-07 | Navigation State Change Performance | PASSED |
| NFR-08 | The system shall support dark mode | Non-Functional | PT-05 | App Layout Dark Mode Performance | PASSED |
| NFR-09 | The system shall handle validation in add task forms | Non-Functional | PT-09 | AddTaskModal With Validation Performance | PASSED |
| NFR-10 | The system shall handle deep linking efficiently | Non-Functional | PT-12 | Navigation Deep Link Performance | PASSED |
| N/A | Error handling for context usage | Security | UT-12 | GameStateContext - Throws error when useGameState is used outside provider | PASSED |
| N/A | Task list with items rendering | Performance | PT-11 | Task List With Items Performance | PASSED |

## 3. Traceability Analysis

### 3.1 Requirements Coverage Summary

| Requirement Type | Total Requirements | Requirements Tested | Coverage Percentage |
|------------------|-------------------|-------------------|---------------------|
| Functional Requirements | 10 | 10 | 100% |
| Non-Functional Requirements | 10 | 10 | 100% |
| **Total** | **20** | **20** | **100%** |

### 3.2 Test Coverage Summary

| Test ID | Test Description | # Requirements Covered |
|---------|-----------------|------------------------|
| PT-01 | App Layout Initial Render | 1 |
| PT-02 | TaskManager Initial Render | 2 |
| PT-03 | AddTaskModal Performance | 3 |
| PT-04 | GameStats Render Performance | 2 |
| PT-05 | App Layout Dark Mode Performance | 1 |
| PT-06 | Task List Empty State Performance | 2 |
| PT-07 | Navigation State Change Performance | 2 |
| PT-08 | TaskManager With Tasks Performance | 1 |
| PT-09 | AddTaskModal With Validation Performance | 2 |
| PT-10 | GameStats With Data Performance | 1 |
| PT-11 | Task List With Items Performance | 0 (supporting test) |
| PT-12 | Navigation Deep Link Performance | 2 |
| UT-01 | ThemedText - Renders correctly with default props | 1 |
| UT-02 | ThemedText - Applies title style when type is title | 1 |
| UT-03 | ThemedText - Applies subtitle style when type is subtitle | 1 |
| UT-04 | ThemedText - Applies custom style when provided | 1 |
| UT-05 | ThemedText - Applies link style when type is link | 1 |
| UT-06 | GameStateContext - Provides initial state values | 1 |
| UT-07 | GameStateContext - Adds coins and shows notification | 2 |
| UT-08 | GameStateContext - Deducts health and shows notification | 2 |
| UT-09 | GameStateContext - Updates last progress date for a task | 1 |
| UT-10 | GameStateContext - Updates habit streak for a task | 1 |
| UT-11 | GameStateContext - Clears notification | 1 |
| UT-12 | GameStateContext - Throws error when useGameState is used outside provider | 0 (security test) |
| UT-13 | GameStateContext - Handles decimal coin amounts correctly | 1 |
| UT-14 | GameStateContext - Prevents health from going below 0 | 2 |

## 4. Conclusion

The Requirements Traceability Matrix demonstrates complete coverage of all identified requirements for the LifeStation application. Each requirement has been verified through at least one test case, with many requirements verified through multiple test cases. The test results confirm that all requirements have been successfully implemented and the application is ready for release.

All tests have been executed and passed successfully, indicating that the application meets both its functional and non-functional requirements. Two additional tests (UT-12 and PT-11) were conducted as supporting tests for security validation and performance optimization respectively.