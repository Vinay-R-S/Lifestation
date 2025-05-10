
🗓️ Agile Scrum Plan for Life Station (Feb 1 – May 14)

---

### 🚀 Sprint 1: Feb 1 – Feb 14 (Frontend Only)

#### Sprint Backlog:

| PBI | Description                    |
| --- | ------------------------------ |
| 1.1 | Design login and signup UI     |
| 3.1 | Implement “Tasks” tab UI     |
| 3.2 | Modal for adding/editing tasks |

#### Daily Sprint Summary:

| Day    | Progress                       | Blockers        | Solutions/Discussions             |
| ------ | ------------------------------ | --------------- | --------------------------------- |
| Feb 2  | Login UI wireframe complete    | None            | -                                 |
| Feb 3  | Task tab UI layout initiated   | None            | -                                 |
| Feb 5  | Signup UI + modal design ready | Modal close bug | Used portal-based modal structure |
| Feb 9  | UI polish and responsiveness   | None            | -                                 |
| Feb 12 | Final frontend QA              | UX glitches     | Feedback implemented              |

#### ✅ Sprint Review:

* Login and Signup UIs functional
* Tasks tab and modal designed with responsive layout

#### 🔍 Sprint Retrospective:

* **What went well** : Clean separation of concerns in UI components
* **What didn’t** : Modal closure behavior required rework
* **Improvements** : Use low-fidelity prototyping tools before dev

---

### 🚀 Sprint 2: Feb 15 – Feb 28 (Frontend Only)

#### Sprint Backlog:

| PBI | Description                        |
| --- | ---------------------------------- |
| 3.3 | Display tasks and update status    |
| 4.1 | Design avatar tab UI               |
| 4.2 | Display accessories, visual update |

#### Daily Sprint Summary:

| Day    | Progress                     | Blockers         | Solutions/Discussions    |
| ------ | ---------------------------- | ---------------- | ------------------------ |
| Feb 16 | Task status update started   | None             | -                        |
| Feb 18 | Avatar SVG base created      | None             | -                        |
| Feb 22 | Accessories mapped visually  | Animation jitter | Switched to SVG grouping |
| Feb 26 | Task + Avatar UI integration | UI conflicts     | Applied scoped styles    |

#### ✅ Sprint Review:

* Avatar base and accessories UI designed
* Tasks UI logic completed and integrated

#### 🔍 Sprint Retrospective:

* **What went well** : Smooth UI creation and feature split
* **What didn’t** : Avatar layering was tricky
* **Improvements** : Visual layer flowchart needed before avatar design

---

### 🚀 Sprint 3: Mar 1 – Mar 14 (Frontend Only)

#### Sprint Backlog:

| PBI | Description                         |
| --- | ----------------------------------- |
| 4.3 | Use coins to buy accessories        |
| 4.4 | Implement lock/unlock system        |
| 3.4 | Integrate game logic (coin, health) |
| 3.5 | Reward/penalty logic                |

#### Daily Sprint Summary:

| Day    | Progress                        | Blockers                    | Solutions/Discussions             |
| ------ | ------------------------------- | --------------------------- | --------------------------------- |
| Mar 2  | Game logic prototype started    | None                        | -                                 |
| Mar 5  | Coin-based purchase logic added | Sync delay with state       | Retry + toast feedback added      |
| Mar 9  | Lock/unlock system functioning  | Avatar state not persisting | Debugged state load from frontend |
| Mar 12 | Reward/penalty logic completed  | None                        | -                                 |

#### ✅ Sprint Review:

* Core gameplay logic including health, coins, reward/penalty integrated
* Purchase and lock/unlock avatar items functional

#### 🔍 Sprint Retrospective:

* **What went well** : Feature-by-feature dev helped isolate bugs
* **What didn’t** : Persistent avatar state required special attention
* **Improvements** : Plan a state sync blueprint

---

### 🚀 Sprint 4: Mar 15 – Mar 30 (Blockchain NFT Marketplace)

#### Sprint Backlog:

| PBI | Description                                            |
| --- | ------------------------------------------------------ |
| BC1 | Create NFT smart contracts using Hardhat + Solidity    |
| BC2 | Mint avatars as NFTs on user request                   |
| BC3 | Setup Web3 wallet connect (Metamask)                   |
| BC4 | Build marketplace UI to list, buy, and view owned NFTs |
| BC5 | Host and integrate marketplace with main app           |

#### Daily Sprint Summary:

| Day    | Progress                           | Blockers                   | Solutions/Discussions     |
| ------ | ---------------------------------- | -------------------------- | ------------------------- |
| Mar 16 | Smart contract structure initiated | Solidity type error        | Resolved with uint256 fix |
| Mar 19 | NFT minting logic working          | Avatar image upload issues | Used IPFS + pinata        |
| Mar 23 | Web3 connect tested                | Wallet auth flow glitch    | Restructured wallet logic |
| Mar 28 | Marketplace UI integrated          | CORS errors                | Fixed via proxy configs   |

#### ✅ Sprint Review:

* Full NFT mint + marketplace live
* Integration with Web3 wallet successful

#### 🔍 Sprint Retrospective:

* **What went well** : Smart contracts deployed smoothly
* **What didn’t** : Wallet connect took time to stabilize
* **Improvements** : Use Hardhat testing coverage more strictly next time

---

### 🚀 Sprint 5: Apr 1 – Apr 14 (Backend Only)

#### Sprint Backlog:

| PBI | Description                                         |
| --- | --------------------------------------------------- |
| 1.2 | Implement backend authentication                    |
| 2.1 | Setup Firestore: User + Task tables                 |
| 2.2 | Initial backend environment setup                   |
| 2.4 | Define schema for avatar coins, health, accessories |

#### Daily Sprint Summary:

| Day    | Progress                 | Blockers               | Solutions/Discussions |
| ------ | ------------------------ | ---------------------- | --------------------- |
| Apr 2  | Firebase auth backend    | Callback not firing    | Added error logging   |
| Apr 5  | Firestore schema created | Table references buggy | Revised schema        |
| Apr 10 | Backend testing complete | None                   | -                     |

#### ✅ Sprint Review:

* Backend authentication complete
* Firestore DB schema ready and verified

#### 🔍 Sprint Retrospective:

* **What went well** : Clean schema + backend modularity
* **What didn’t** : Firebase callback behavior caused initial delay
* **Improvements** : Create a config checklist beforehand

---

### 🚀 Sprint 6: Apr 15 – May 14 (Backend + Testing + CI/CD + Final Polish)

#### Sprint Backlog:

| PBI   | Description                               |
| ----- | ----------------------------------------- |
| 4.5   | Sync purchases with backend               |
| 5.1   | Unit test backend endpoints               |
| 5.2   | Integration testing: tasks + avatar + NFT |
| 5.3   | Manual frontend testing                   |
| CI/CD | Setup GitHub Actions for deployment       |
| UX    | Final UI adjustments + walkthrough        |
| Docs  | User manual and API docs                  |

#### Daily Sprint Summary:

| Day    | Progress                   | Blockers          | Solutions/Discussions |
| ------ | -------------------------- | ----------------- | --------------------- |
| Apr 17 | CI/CD basic pipeline done  | Token cache issue | Added GitHub secrets  |
| Apr 20 | Testing avatar + backend   | Sync lag          | Snapshot listener fix |
| Apr 25 | UX polishing complete      | Overlap on mobile | Adjusted layout logic |
| May 1  | Full testing and docs done | None              | -                     |

#### ✅ Sprint Review:

* GitHub CI/CD running, all pages polished and tested
* Final walkthrough complete, docs and testing ready

#### 🔍 Sprint Retrospective:

* **What went well** : Final sprint stayed well under control
* **What didn’t** : RN build scripts took longer to debug
* **Improvements** : Move to Docker containers for all stages next time

---

## 📊 **Final Summary**

### 🟩 Sprint Review Summary:

* Frontend functionality was completed across 3 sprints with high responsiveness and modularity.
* Blockchain NFT system (avatar-based) deployed and integrated successfully.
* Backend systems and database schema implemented and synced with frontend.
* CI/CD, testing, UX polish, and documentation were all completed in the final sprint.

### 🧠 Sprint Retrospective Summary:

* **Strengths** :
* Agile breakdown helped avoid task bottlenecks.
* Effective communication between modules: avatar ↔ tasks ↔ blockchain.
* **Weaknesses** :
* Some delays from new tech (blockchain, CI/CD) and state sync issues.
* **Suggestions** :
* Add architecture diagrams for sync logic.
* Use consistent prototyping and testing from Sprint 1.
