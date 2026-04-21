import os
import json

vault_path = r"d:\iCloudDrive\iCloud~md~obsidian\Obsidian Vault\SiliconCommand\10_Content\03_Published"
files_list = []

for root, dirs, files in os.walk(vault_path):
    for file in files:
        if file.endswith(".md"):
            files_list.append(os.path.join(root, file))

# Write to a file instead of console
with open("published_files.json", "w", encoding="utf-8") as f:
    json.dump(files_list, f, ensure_ascii=False, indent=4)

print(f"Total files found: {len(files_list)}")
