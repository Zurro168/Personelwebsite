import os

source_file = r"D:\iCloudDrive\iCloud~md~obsidian\Study\English\未命名.md"
base_dir = r"D:\iCloudDrive\iCloud~md~obsidian\Study\English"
out_dir = os.path.join(base_dir, "牛津高阶9_例句")
os.makedirs(out_dir, exist_ok=True)

with open(source_file, 'r', encoding='utf-8') as f:
    all_lines = f.readlines()

print(f"Total lines: {len(all_lines)}")

# Find table header
table_start = -1
for i, line in enumerate(all_lines):
    if '序号' in line and '英文' in line and '中文' in line:
        table_start = i
        break

print(f"Table starts at line: {table_start}")

# Collect data rows
data_rows = []
for i in range(table_start + 1, len(all_lines)):
    line = all_lines[i].strip()
    if line.startswith('|') and '|' in line[1:]:
        parts = line.split('|')
        if len(parts) >= 3 and parts[1].isdigit():
            data_rows.append(line)

print(f"Total data rows: {len(data_rows)}")

# Split into chunks of 1000
chunk_size = 1000
chunk_index = 0

for start in range(0, len(data_rows), chunk_size):
    chunk = data_rows[start:start + chunk_size]
    file_num = chunk_index + 1
    file_name = f"part_{file_num:03d}.md"
    file_path = os.path.join(out_dir, file_name)

    first_row = chunk[0]
    seq_num = first_row.split('|')[1]

    header = f"# 牛津高阶9中英文对照例句 - 第{file_num}部分（序号 {seq_num} 起）\n\n|序号|英文|中文|\n|---|---|---|\n"
    body = '\n'.join(chunk)
    content = f"{header}\n{body}\n"

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    chunk_index += 1

print(f"Done! Created {chunk_index} files")
