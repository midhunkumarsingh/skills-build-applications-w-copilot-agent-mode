# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey midhunkumarsingh!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/midhunkumarsingh/skills-build-applications-w-copilot-agent-mode/issues/1)

## Frontend Codespaces configuration

The React frontend uses `import.meta.env.VITE_CODESPACE_NAME` to construct API URLs for the backend service.

Create `octofit-tracker/frontend/.env.local` with:

```env
VITE_CODESPACE_NAME=<your-codespace-name>
```

If `VITE_CODESPACE_NAME` is unset, the app falls back to `localhost:8000` instead of generating an undefined `https://undefined-8000.app.github.dev/...` URL.

