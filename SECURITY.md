# 🔒 Security Guidelines for Public Repository

## ⚠️ Important: What NOT to Commit

### 1. **Environment Variables & Secrets** 🔑

**NEVER commit these files:**
```
.env
.env.local
.env.production
.env.development
config/secrets.json
credentials.json
```

**✅ Already Protected:**
Your `.gitignore` already includes `.env` - Good!

**How to use environment variables:**
```bash
# Create .env file (already in .gitignore)
VITE_API_KEY=your_api_key_here
VITE_DATABASE_URL=your_database_url
VITE_SECRET_TOKEN=your_secret_token
```

**In your code:**
```typescript
// Use environment variables
const apiKey = import.meta.env.VITE_API_KEY;
```

### 2. **API Keys & Tokens** 🗝️

**Never hardcode:**
- Firebase config with API keys
- Stripe secret keys
- AWS credentials
- OAuth client secrets
- Database passwords
- JWT secrets

**Example of WRONG approach:**
```typescript
// ❌ NEVER DO THIS
const firebaseConfig = {
  apiKey: "AIzaSyB1234567890abcdefg",
  authDomain: "myapp.firebaseapp.com",
  // ...
};
```

**Example of CORRECT approach:**
```typescript
// ✅ DO THIS
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ...
};
```

### 3. **Personal Information** 👤

**Don't commit:**
- Personal email addresses (use GitHub email)
- Phone numbers
- Home addresses
- Personal photos
- Private documents

### 4. **Large Files** 📦

**Avoid committing:**
- Video files (> 100MB)
- Large datasets
- Database dumps
- Build artifacts (already in `.gitignore`)

**Use Git LFS for large files if needed:**
```bash
git lfs install
git lfs track "*.mp4"
git lfs track "*.zip"
```

### 5. **Dependencies** 📚

**Already protected in `.gitignore`:**
- `node_modules/` ✅
- `dist/` ✅
- `dist-ssr/` ✅

## 🛡️ Additional Security Measures

### 1. **Enable Branch Protection**

On GitHub repository settings:
- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Require signed commits (optional)
- ✅ Include administrators

### 2. **Use GitHub Secrets for CI/CD**

For Vercel deployment:
```yaml
# .github/workflows/deploy.yml
env:
  VITE_API_KEY: ${{ secrets.VITE_API_KEY }}
```

### 3. **Enable Dependabot**

Create `.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
```

### 4. **Add Security Policy**

Create `SECURITY.md` (this file) to inform users how to report vulnerabilities.

### 5. **Regular Security Audits**

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

## 🚨 What to Do If You Accidentally Commit Secrets

### 1. **Immediately Revoke/Rotate the Secret**
- Change API keys
- Rotate tokens
- Update passwords

### 2. **Remove from Git History**

**Option A: Using BFG Repo-Cleaner (Recommended)**
```bash
# Install BFG
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Remove sensitive file
bfg --delete-files .env

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

**Option B: Using git filter-branch**
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

### 3. **Force Push (Dangerous!)**
```bash
# Only if absolutely necessary
git push origin main --force
```

⚠️ **Warning:** Force pushing rewrites history and can cause issues for collaborators!

## ✅ Current Security Status

### Protected Files (in `.gitignore`):
- ✅ `.env` files
- ✅ `node_modules/`
- ✅ `dist/` and build files
- ✅ Editor configs (`.vscode/`, `.idea/`)
- ✅ OS files (`.DS_Store`)
- ✅ Log files

### Recommendations:

1. **Add `.env.example`** - Template for environment variables
2. **Use GitHub Secrets** - For deployment secrets
3. **Enable 2FA** - On your GitHub account
4. **Review commits** - Before pushing
5. **Use signed commits** - For authenticity

## 📝 Example `.env.example`

Create this file to show others what environment variables are needed:

```bash
# API Keys (Get from respective services)
VITE_API_KEY=your_api_key_here
VITE_DATABASE_URL=your_database_url_here

# Firebase Config (if using Firebase)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id

# Other Services
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
# Note: Never commit STRIPE_SECRET_KEY
```

## 🔍 How to Check for Exposed Secrets

### 1. **GitHub Secret Scanning**
GitHub automatically scans for known secret patterns.

### 2. **GitGuardian**
- Install browser extension
- Scans commits in real-time

### 3. **TruffleHog**
```bash
# Install
pip install truffleHog

# Scan repository
trufflehog --regex --entropy=False https://github.com/user/repo
```

### 4. **git-secrets**
```bash
# Install
brew install git-secrets  # macOS
# or download from: https://github.com/awslabs/git-secrets

# Setup
git secrets --install
git secrets --register-aws
```

## 📞 Reporting Security Issues

If you discover a security vulnerability, please email:
- **Email:** security@yourproject.com
- **Do NOT** create a public GitHub issue

We will respond within 48 hours.

## 📚 Resources

- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Git Security](https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage)

---

<div align="center">
  🔒 Stay Safe, Code Secure! 🔒
</div>
