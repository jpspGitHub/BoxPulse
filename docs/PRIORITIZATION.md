# BoxPulse Feature Prioritization

Este documento define la prioridad inicial de las features del MVP.

Por ahora no impacta GitHub Projects, issues, labels ni milestones.

| Feature                                    | Priority |
| ------------------------------------------ | -------- |
| 000 - Bootstrap Environment Validation     | P0       |
| 001 - Project Setup                        | P0       |
| 002 - Shared Domain Package                | P0       |
| 003 - Auth and Roles                       | P0       |
| 004 - Admin User Management                | P0       |
| 005 - Admin Dashboard                      | P2       |
| 006 - Coach Start Exercise                 | P0       |
| 007 - Coach Timer Exercise                 | P0       |
| 008 - Coach Repetition Exercise            | P0       |
| 009 - Coach Boxer Tracking                 | P1       |
| 010 - Boxer Progress Tracking              | P0       |
| 011 - Boxer Profile Management             | P1       |
| 012 - Boxer Attendance and Workout History | P1       |
| 013 - Boxer Progress Analytics             | P2       |
| 014 - Training Programs                    | P1       |
| 015 - Program Assignments                  | P1       |
| 016 - MVP Validation                       | P0       |

## Task Breakdown Priorities

Estas prioridades aplican a tareas ejecutables derivadas de features grandes.

| Task                                  | Parent Feature       | Priority |
| ------------------------------------- | -------------------- | -------- |
| Configure Supabase auth foundation    | 003 - Auth and Roles | P0       |
| Create shared auth domain contracts   | 003 - Auth and Roles | P0       |
| Create web auth session provider      | 003 - Auth and Roles | P0       |
| Create mobile auth session provider   | 003 - Auth and Roles | P0       |
| Implement role and active-user guards | 003 - Auth and Roles | P0       |
| Protect admin web routes              | 003 - Auth and Roles | P0       |
| Protect mobile coach and boxer routes | 003 - Auth and Roles | P0       |
