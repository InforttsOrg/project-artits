import os
import sys
import json
import subprocess
import urllib.request
import platform

def get_system_info():
    print("🖥️  Gathering local system details...")
    try:
        username = os.getlogin()
    except Exception:
        username = os.environ.get("USER", "admin")
        
    info = {
        "hostname": platform.node(),
        "os": platform.system(),
        "os_version": platform.mac_ver()[0] if platform.system() == "Darwin" else platform.release(),
        "architecture": platform.machine(),
        "local_user": username,
        "current_directory": os.getcwd()
    }
    
    # Git configurations
    try:
        git_name = subprocess.check_output(["git", "config", "user.name"], text=True).strip()
        git_email = subprocess.check_output(["git", "config", "user.email"], text=True).strip()
        info["git"] = {
            "global_name": git_name,
            "global_email": git_email
        }
    except Exception:
        info["git"] = {"global_name": "Unknown", "global_email": "Unknown"}
        
    return info

def get_github_profile(username):
    print(f"🌐 Fetching public GitHub profile for {username}...")
    headers = {"User-Agent": "Mozilla/5.0"}
    
    # 1. Fetch user bio
    user_url = f"https://api.github.com/users/{username}"
    profile_data = {}
    try:
        req = urllib.request.Request(user_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            profile_data = json.loads(response.read().decode())
    except Exception as e:
        print(f"⚠️  Could not fetch GitHub user info: {e}")
        
    # 2. Fetch public repos
    repos_url = f"https://api.github.com/users/{username}/repos?sort=updated&per_page=100"
    repos_data = []
    try:
        req = urllib.request.Request(repos_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            repos_data = json.loads(response.read().decode())
    except Exception as e:
        print(f"⚠️  Could not fetch GitHub repos: {e}")
        
    return profile_data, repos_data

def format_dossier(system, profile, repos):
    # Standardised profile details
    name = profile.get("name", "Sahil Rathee")
    bio = profile.get("bio", "Full-stack Software Architect specializing in autonomous systems, high-availability cloud fabrics, and production-scale automation.")
    company = profile.get("company", "Director of Infortts")
    location = profile.get("location", "New Delhi, India")
    blog = profile.get("blog", "infortts.com")
    public_repos = profile.get("public_repos", 0)
    followers = profile.get("followers", 0)
    
    md = f"""# SAHIL RATHEE - INTEL DOSSIER & PROFILE GRAPH
Generated on: 2026-06-03 (Local Machine: {system['local_user']})

## 🧑‍Identity Manifest
- **Name**: {name}
- **Title**: {company}
- **Bio**: {bio}
- **Location**: {location}
- **Official Domain**: [{blog}](https://{blog})
- **Primary Handles**: @rttss-sahil (GitHub, Twitter/X, LinkedIn)
- **Corporate Registration**: Registered under MSME since 2024 (Infortts Swarm Director)
- **24/7 Agent Connected Devices**:
  - Pair A: Samsung S24 Ultra (Samsung Android Layer)
  - Pair B: Redmi Note 10 Pro (Rooted Linux Android Layer)

## 💻 Local Workspace Telemetry
- **Host**: {system['hostname']}
- **Operating System**: {system['os']} ({system['os_version']} - {system['architecture']})
- **Active System User**: {system['local_user']}
- **Git Global Config**:
  - Name: {system['git']['global_name']}
  - Email: {system['git']['global_email']}
- **Project Root**: {system['current_directory']}

"""
    if profile:
        md += f"""## 📈 GitHub Telemetry (@rttss-sahil)
- **Profile URL**: {profile.get('html_url', 'https://github.com/rttss-sahil')}
- **Public Repositories**: {public_repos}
- **Gists**: {profile.get('public_gists', 0)}
- **Followers**: {followers}
- **Following**: {profile.get('following', 0)}
- **Account Created At**: {profile.get('created_at', '2018')}

"""
    if repos:
        md += "## 📁 Public Projects Graph (GitHub Top Starred/Active)\n"
        # Sort repos by star count
        sorted_repos = sorted(repos, key=lambda x: x.get("stargazers_count", 0), reverse=True)
        for repo in sorted_repos[:15]:
            stars = repo.get("stargazers_count", 0)
            forks = repo.get("forks_count", 0)
            lang = repo.get("language", "TypeScript")
            desc = repo.get("description", "No description provided.")
            md += f"- **[{repo['name']}]({repo['html_url']})** (⭐ {stars} | 🍴 {forks} | {lang})\n  - *Description*: {desc}\n"
            
    return md

def main():
    system_info = get_system_info()
    github_user = "rttss-sahil"
    
    profile, repos = get_github_profile(github_user)
    
    dossier_content = format_dossier(system_info, profile, repos)
    
    # Save files next to this script. This used to be a hardcoded macOS path
    # ("/Users/admin/rttss-sahil/inforttsOrg/projects/artits/scratch"), so the
    # script created that tree as root on a Mac and died with FileNotFoundError on
    # every other host (CI, the vps, a fresh clone anywhere but that laptop).
    scratch_dir = os.path.dirname(os.path.abspath(__file__))
    os.makedirs(scratch_dir, exist_ok=True)
    
    json_path = os.path.join(scratch_dir, "sahil_rathee_profile.json")
    md_path = os.path.join(scratch_dir, "sahil_rathee_dossier.md")
    
    full_data = {
        "identity": {
            "name": "Sahil Rathee",
            "title": "Director of Infortts",
            "msme_registration_year": 2024,
            "connected_devices": [
                "Samsung S24 Ultra",
                "Redmi Note 10 Pro (Rooted)"
            ],
            "availability": "24/7 autonomous",
            "domain": "infortts.com"
        },
        "system_telemetry": system_info,
        "github_profile": profile,
        "github_repositories": repos
    }
    
    with open(json_path, "w") as f:
        json.dump(full_data, f, indent=4)
        
    with open(md_path, "w") as f:
        f.write(dossier_content)
        
    print(f"\n✅ Profile Dossier successfully generated!")
    print(f"📄 Markdown dossier: {md_path}")
    print(f"📊 Raw JSON dataset: {json_path}")

if __name__ == "__main__":
    main()
