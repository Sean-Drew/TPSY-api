#!/bin/bash

API="http://localhost:4741"
URL_PATH="/beers"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "beer": {
      "brand": "'"${BRAND}"'",
      "name": "'"${NAME}"'",
      "style": "'"${STYLE}"'",
      "description": "'"${DESCRIPTION}"'"
    }
  }'

echo
