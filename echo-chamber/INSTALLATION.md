# Echo Chamber v2.0 - Installation & Setup Guide

## 📋 Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation Steps](#installation-steps)
3. [Verification](#verification)
4. [Running the Application](#running-the-application)
5. [Troubleshooting](#troubleshooting)

---

## 💻 System Requirements

### Minimum Requirements
- **Node.js**: v12.0.0 or higher
- **npm**: v6.0.0 or higher
- **RAM**: 256MB minimum
- **Disk Space**: 100MB
- **OS**: Windows, macOS, or Linux

### Recommended
- **Node.js**: v16.0.0 or higher
- **RAM**: 512MB or more
- **Disk Space**: 200MB
- **Modern web browser**: Chrome, Firefox, Safari, or Edge

### Check Your Node.js Version

```bash
node --version
npm --version
```

Should output something like:
```
v18.13.0
8.19.3
```

---

## 📦 Installation Steps

### Step 1: Navigate to the Directory

```bash
cd /workspaces/CopilotAdventures/echo-chamber
```

### Step 2: Install Dependencies

The application requires Express.js and CORS:

```bash
npm install
```

This installs:
- `express` (4.18.2) - Web framework
- `cors` (2.8.5) - Cross-origin support

The installation should complete in 30-60 seconds.

**Expected output**:
```
added 64 packages, and audited 65 packages in 10s
```

### Step 3: Verify Installation

Check that dependencies installed correctly:

```bash
npm list
```

Should show:
```
echo-chamber@2.0.0 /workspaces/CopilotAdventures/echo-chamber
├── cors@2.8.5
└── express@4.18.2
```

---

## ✅ Verification

### Test 1: Run the Test Suite

Ensure everything is working:

```bash
npm test
```

**Expected output**:
```
🧪 ADVANCED ECHO CHAMBER TEST SUITE
==============================
✅ Passed: 32
❌ Failed: 0
📌 Success Rate: 100.0%
```

If all tests pass, your installation is correct! ✅

### Test 2: Check Node.js Syntax

Verify all JavaScript files have valid syntax:

```bash
node -c index.js
node -c server.js
node -c SequenceAnalyzer.js
node -c Logger.js
node -c test-suite.js
```

Should complete without errors.

### Test 3: Verify File Structure

Ensure all files are present:

```bash
ls -lah
```

Should show these files:
- `index.js`
- `server.js`
- `SequenceAnalyzer.js`
- `Logger.js`
- `test-suite.js`
- `package.json`
- `README-v2.md`
- `QUICKSTART.md`
- `README.md`
- `web/public/index.html`
- `web/public/styles.css`
- `web/public/app.js`

---

## 🚀 Running the Application

### Option 1: Run the Web Application (Recommended)

```bash
npm start
```

Or explicitly:

```bash
npm run web
```

**Output**:
```
🔮 Echo Chamber Server started on http://localhost:3000
```

Then open your browser and go to: **http://localhost:3000**

### Option 2: Run the CLI Application

For the original command-line interface:

```bash
npm run cli
```

### Option 3: Development Mode

```bash
npm run dev
```

Useful for development with live server.

---

## 🌐 Accessing the Application

### Web Interface

1. **Start the server**:
   ```bash
   npm start
   ```

2. **Open your browser**:
   ```
   http://localhost:3000
   ```

3. **You should see**:
   - 🏰 Echo Chamber header
   - Navigation tabs (Analyzer, Visualizer, History, Stats, Docs)
   - Beautiful castle-themed interface

### API Access

The backend API is available at:
```
http://localhost:3000/api/
```

Test with curl:
```bash
curl http://localhost:3000/api/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-28T...",
  "uptime": 1.234
}
```

---

## ⚙️ Configuration

### Change the Port

Default port is 3000. To use a different port:

```bash
PORT=8080 npm start
```

The app will start on `http://localhost:8080`

### Environment Variables

Create a `.env` file (optional):

```bash
PORT=3000
NODE_ENV=production
```

Then start:
```bash
npm start
```

---

## 🧪 Testing Everything

### Complete Verification Checklist

- [ ] Node.js and npm installed
- [ ] Dependencies installed (`npm install`)
- [ ] All tests passing (`npm test`)
- [ ] No syntax errors (`node -c *.js`)
- [ ] Web server starts (`npm start`)
- [ ] Browser opens at localhost:3000
- [ ] API health check works
- [ ] Can analyze a sequence
- [ ] Can view visualizations
- [ ] Can clear history

If all items are checked, you're ready to go! ✅

---

## 🆘 Troubleshooting

### Issue: "command not found: node"

**Solution**: Node.js is not installed or not in PATH

```bash
# Check if Node is installed
which node
node --version

# If not installed, download from nodejs.org
```

### Issue: "npm ERR! ERESOLVE unable to resolve dependency tree"

**Solution**: Clear npm cache and reinstall

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port 3000 is already in use"

**Solution**: Use a different port or kill the process

```bash
# Use a different port
PORT=3001 npm start

# Or find and kill the process using port 3000
lsof -i :3000
kill -9 <PID>
```

### Issue: "EACCES: permission denied"

**Solution**: Use sudo (if safe) or check file permissions

```bash
sudo npm install

# Or check permissions
chmod -R 755 /workspaces/CopilotAdventures/echo-chamber
npm install
```

### Issue: "Cannot find module 'express'"

**Solution**: Dependencies not installed

```bash
npm install
npm list
```

### Issue: "Server starts but page is blank"

**Solution**: Check browser console for errors

1. Open browser Developer Tools (F12)
2. Check Console tab for errors
3. Check Network tab to see if files loaded
4. Try a different browser
5. Clear browser cache

### Issue: "Tests are failing"

**Solution**: Verify the environment

```bash
# Check Node version
node --version

# Run tests with verbose output
npm test 2>&1

# Check individual test files
node test-suite.js
```

---

## 📝 Logs and Debugging

### View Application Logs

The server outputs logs with color coding:
- 🟩 **GREEN**: Info messages
- 🟨 **YELLOW**: Warnings
- 🟥 **RED**: Errors
- 🟦 **CYAN**: Debug messages

### Enable Debug Mode

Edit `server.js` to adjust logging:

```javascript
const logger = new Logger('debug'); // More verbose logging
```

Or use command line:
```bash
DEBUG=* npm start
```

---

## 🔄 Upgrade from v1.0

If you have the original Echo Chamber v1.0 installed:

1. **Backup your v1.0** (optional):
   ```bash
   cp -r echo-chamber echo-chamber-v1.0-backup
   ```

2. **Install new dependencies**:
   ```bash
   cd echo-chamber
   npm install
   ```

3. **Run tests to verify**:
   ```bash
   npm test
   ```

4. **Original CLI still works**:
   ```bash
   npm run cli
   ```

---

## 🚀 Next Steps

After successful installation:

1. **Start the server**: `npm start`
2. **Open web interface**: `http://localhost:3000`
3. **Analyze a sequence**: Enter `1 2 3 4 5`
4. **View visualizations**: Switch to Visualizer tab
5. **Check history**: Review all analyses
6. **Explore API**: Test endpoints with curl

---

## 📚 Additional Resources

- **Main README**: See `README-v2.md` for full documentation
- **Quick Start**: See `QUICKSTART.md` for 30-second guide
- **API Docs**: Available at `/api/documentation`
- **Web Interface**: Built-in help in Docs tab
- **Test Suite**: Run `npm test` to see all features

---

## ✨ Success!

You've successfully installed Echo Chamber v2.0! 🎉

**Quick command cheat sheet**:
```bash
npm start              # Start web server (localhost:3000)
npm run cli           # Start CLI application
npm test              # Run test suite
npm run dev           # Development mode
npm list              # Show installed packages
```

**Having issues?** Check the Troubleshooting section or review logs with `npm start 2>&1`.

---

**Happy sequence predicting! May your patterns be magical! 🔮✨**
