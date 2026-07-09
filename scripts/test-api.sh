#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-http://localhost:4000/graphql}"

echo "==> Testing health endpoint"
curl -sf "${API_URL%/graphql}/health" | grep -q '"status":"ok"'
echo "Health check passed"

echo "==> Creating test post"
CREATE_RESPONSE=$(curl -sf -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { createPost(title: \"E2E Test Post\", content: \"Automated end-to-end test content for the blog app.\") { id title } }"}')

echo "$CREATE_RESPONSE" | grep -q '"title":"E2E Test Post"'
echo "Create mutation passed"

echo "==> Fetching posts (paginated)"
QUERY_RESPONSE=$(curl -sf -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts(limit: 10, offset: 0) { items { id title content } totalCount hasMore } }"}')

echo "$QUERY_RESPONSE" | grep -q '"E2E Test Post"'
echo "$QUERY_RESPONSE" | grep -q '"totalCount"'
echo "Posts query passed"

echo ""
echo "All API tests passed."
