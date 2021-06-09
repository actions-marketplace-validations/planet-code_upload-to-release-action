# Upload to release Action

This Github Action to upload an asset to a release.

## Inputs

### `token`

**REQUIRED** A Github token, usually ${{ github.token }}.

### `asset-path`

**REQUIRED** The path to the asset to upload. Default `empty`.

### `asset-name`

The name of the asset, this will be prefixed with the release name. Default `"artifact.zip"`

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
          asset-path: "./artifact.zip"
```
