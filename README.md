# Upload to release Action

This Github Action to upload an asset to a release.

## Inputs

### `token`

**REQUIRED** A Github token, usually ${{ github.token }}.

### `asset-path`

**REQUIRED** The path to the asset to upload. Default `empty`.

<!-- ### `asset-content-type`

**REQUIRED** The content-type of the asset you want to upload. See the (supported Media Types)[https://www.iana.org/assignments/media-types/media-types.xhtml] for more information. Default `"application/zip"`. -->

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
          asset-content-type: "application/zip"
```
