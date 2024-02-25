# Setup
Before setting up, make sure to have the following API keys:
* Contentful Space ID
* Contentful Management Key
* Contentful Delivery Key
* Airtable Personal Access Token

Credentials to these accounts are in the eServices masterfile.

```
npm i --legacy-peer-deps
npm run setup
```

# Usage
Dev Bundle
```
npm run dev
```
Prod Bundle
```
npm run build
```

# Considerations
* **Make sure there is one of every entity with every field filled in Contentful.** The site will fail to build if this is not satisfied. Placeholder values will do for this case.
* **Make sure that your yarn version is 1.19.1** The site will fail to load gatsby files and configurations during the npm run dev if this is not satisfied.
