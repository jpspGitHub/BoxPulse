# Agent Prompt: Break Down Rocks Into Tasks

## Goal

Process tasks marked with:

- Status = `Ready`
- Label = `To Rock Break`

The objective of this agent is to:

1. Analyze the large task.
2. Break it into smaller executable tasks.
3. Update:
   - `docs/BACKLOG.md`
   - `docs/PRIORITIZATION.md`
4. Create new feature/task definitions if needed.
5. Run the agent:

```txt
agent/create-github-project-items-from-backlog.md
```

6. Create active GitHub Project tasks for the new smaller tasks.

## Repository

`jpspGitHub/BoxPulse`

## GitHub Project

```txt
https://github.com/users/jpspGitHub/projects/9/views/1
```

## Required Reading

Before starting:

- `AGENTS.md`
- `docs/BACKLOG.md`
- `docs/PRIORITIZATION.md`
- `docs/features/*.md`
- `agent/create-github-project-items-from-backlog.md`

## Task Selection Rules

Search GitHub Project items with:

```txt
Status = Ready
Label = To Rock Break
```

Take only one task per execution.

Prioritize:

1. Higher priority
2. Older creation date

## Goal of Breakdown

The objective is to convert a large ambiguous execution unit into:

- smaller executable tasks
- clearer scopes
- safer PR sizes
- independent validation units

## Breakdown Rules

The resulting tasks should:

- be independently executable
- have clear acceptance criteria
- avoid mixing unrelated concerns
- be implementable in one agent execution when possible
- reduce PR size and review complexity

Avoid creating giant subtasks.

## Documentation Updates

The agent may update:

- `docs/BACKLOG.md`
- `docs/PRIORITIZATION.md`
- `docs/features/*.md`

The agent may:

- create new feature markdowns
- split existing features
- reorganize implementation order if justified

The agent must:

- preserve consistency between docs
- maintain numbering consistency
- keep naming technical and clear

## Priority Rules

Every new task must have priority.

Allowed values:

```txt
P0
P1
P2
```

## GitHub Project Rules

After updating backlog/prioritization:

- run the workflow described in:

```txt
agent/create-github-project-items-from-backlog.md
```

The resulting tasks must:

- be active GitHub issues
- be added to the GitHub Project
- not be draft items
- have priority configured
- start in `Ready`
- start without labels

## Original Rock Handling

After successful breakdown:

- keep the original rock task for traceability
- optionally move it to `Done` or `Archived` only if the project workflow supports it
- otherwise add a comment indicating the generated subtasks
- remove the label `To Rock Break`

Suggested comment:

```md
This task was broken down into smaller executable tasks.

Generated subtasks:

- ...
```

## Scope Rules

This agent focuses only on:

- backlog decomposition
- documentation restructuring
- task generation

This agent must NOT:

- implement product code
- create production features
- create PRs with implementation code

## Final Response

```md
## Rock task processed

## New tasks created

## Documentation updated

## Project items created

## Warnings
```
