# Books frontend

## API autogenerate

To create/update data types definition, run this script

```bash
npx openapi-typescript http://localhost:8000/api/v1/docs/yaml -o ./services/api/v1.d.ts
```