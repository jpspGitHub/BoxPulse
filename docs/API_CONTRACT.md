# BoxPulse API Contract

## Base Path

```text
/api/v1
```

## Conventions

- JSON request and response bodies.
- ISO 8601 timestamps.
- Stable error envelope for non-2xx responses.
- Pagination for list endpoints once collections can grow beyond MVP scale.

## Error Shape

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

## Box

```json
{
  "id": "box_123",
  "label": "Kitchen supplies",
  "status": "created",
  "metadata": {},
  "createdAt": "2026-05-19T00:00:00.000Z",
  "updatedAt": "2026-05-19T00:00:00.000Z"
}
```

## Status Values

- `created`
- `packed`
- `in_transit`
- `delivered`
- `archived`

## Initial Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | Service health check. |
| `GET` | `/api/v1/boxes` | List boxes. |
| `POST` | `/api/v1/boxes` | Create a box. |
| `GET` | `/api/v1/boxes/{boxId}` | Get one box. |
| `PATCH` | `/api/v1/boxes/{boxId}` | Update box fields. |
| `GET` | `/api/v1/boxes/{boxId}/events` | List status events. |
| `POST` | `/api/v1/boxes/{boxId}/events` | Append a status event. |
