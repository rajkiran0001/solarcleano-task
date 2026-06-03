# Technical task — Full-Stack Engineer

## Remote robot interface

**Role:** Full-Stack Engineer at a robotics startup  
**Format:** Your choice — working prototype, wireframe, architecture notes, or a mix. If delivering code, please provide it in a Github repo.  
**Time:** Open-ended. Spend as much or as little as feels right.  
**Interview:** ~1 hour. You will walk us through your work and adapt it live.

---

## Context

We are a robotics startup building autonomous mobile robots deployed in real-world environments. Our robots run a ROS stack and communicate with the outside world through a backend server hosted on a cloud VM. Operators and engineers need a web-based interface to monitor and interact with robots remotely — from a laptop in the office or a tablet in the field.

You are being asked to design and/or prototype a minimal version of this interface. Think of this as the first iteration: something useful enough to be used in practice, but scoped to what one engineer can build alone.

---

## The task

Design and/or implement a web-based robot monitoring and control interface. At minimum, it should allow an operator to:

- See **live robot telemetry** — at least battery level, connection status, and one other value of your choice
- Read a **scrollable log feed** of recent robot events
- Send at least **two commands** to the robot (e.g. start, stop, or an emergency stop)

The robot backend is a black box for the purposes of this task. You decide what data it sends, in what format, and over what protocol. **Document your assumptions.**

---

## What we care about

We are not evaluating pixel-perfect design or a fully working system. We are looking at how you think:

- How you structure the data flow from robot to browser
- How you split responsibilities between frontend and backend
- How you handle failure cases
- What you choose to leave out, and why
- How clearly you can explain your decisions

If you write code, it does not need to be complete. A partial implementation with good reasoning is more valuable than a polished UI with no explanation.  
If you sketch or diagram, annotations matter more than aesthetics.

Keep in mind that we expect to go through your design together during the interview, so keep it concise!

---

## Docker environment (optional)

To avoid setup friction on our side, we provide a minimal Docker environment you can build on. Using it is recommended but not enforced. If used, you can run your solution here. However, if you prefer to bring your own machine and demo live, that is fine too.

### What is provided

- A `docker-compose.yml` with two services:
  - `frontend` — Node 20, port 3000
  - `backend` — Node 20
- A mock backend that generates fake telemetry and logs it to stdout every second
- No framework is pre-installed — choose your own, or use vanilla!

### Getting started

```bash
cd interview_fs
docker compose up --build
```

The mock backend logs this JSON to stdout every second.

### Mock message schema

```json
{
  "timestamp": "2025-06-02T10:00:00Z",
  "battery": 87,
  "status": "moving",
  "speed": 2.09,
  "latitude": 49.634473,
  "longitude": 5.890937,
  "event": null
}
```

Event messages (emitted on state changes):

```json
{
  "timestamp": "2025-06-02T10:00:05Z",
  "battery": 86,
  "status": "obstacle_detected",
  "speed": 0.0,
  "latitude": 49.634473,
  "longitude": 5.890937,
  "event": "Obstacle detected at sector 4B. Robot stopped."
}
```

You are free to modify the `docker-compose`, add services, or replace the mock server entirely. The environment is a starting point, not a constraint.

---

## At the interview

The following are deliberately underspecified. We are curious how you approach them — whether you make an explicit choice, ask a question, or document your assumptions.

- **Authentication** — who can log in, and how?
- **Disconnection** — what happens if the robot loses its internet connection mid-session?
- **Scale** — how would you extend this to support multiple robots at once?
- **Stack choices** — framework, state management, and real-time protocol are all up to you

You do not need to solve all of these. Picking one and thinking it through is more valuable than touching all of them superficially.

We will ask you to walk us through your work — what you built or sketched, why you made the decisions you did, and what you would do differently with more time. We will also ask you to adapt your solution on the spot: for example, adding a new user role, handling a specific failure case, or extending the architecture in a direction you did not anticipate. There are no trick questions — we want to see how you reason, not whether you memorised the right answer.

---

## Questions

If anything is unclear or you want to confirm an assumption before starting, feel free to reach out.
