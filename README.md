# Upload to release Action

This Github Action to upload an asset to a release.

## Inputs

### `token`

**REQUIRED** A Github token, usually ${{ github.token }}.

### `release-id`

The release id to upload to. Default `empty`.

### `use-last-release`

Use the last release to upload to. Default `true`.

## Example usage

```yaml
name: Upload asset

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: planet-code/upload-to-release-action@1.0.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```
