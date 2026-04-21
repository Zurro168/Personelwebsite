import fs from 'fs';
import matter from 'gray-matter';

const ASSETS = [
    {
        path: 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published/2026/04-April/21_Copper_Supply_Bottleneck/2026-04-20 - 21 - 全球铜矿供给正在进入瓶颈吗.md',
        topic_id: 21,
        slug: 'global-copper-supply-bottleneck-2026',
        layout: 'paper'
    },
    {
        path: 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published/2026/04-April/2026-04-11 - 11 - 加蓬锰矿出口关税调整预警背后的产业博弈/2026-04-11 - 11 - 加蓬锰矿出口关税调整预警背后的产业博弈html.md',
        topic_id: 11,
        slug: 'gabon-manganese-export-tariff-alert',
        layout: 'interactive'
    },
    {
        path: 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published/2026/04-April/2026-04-11 - 11 - 加蓬锰矿出口关税调整预警背后的产业博弈/2026-04-11 - 11 - 加蓬锰矿出口关税调整预警背后的产业博弈.md',
        topic_id: 11,
        slug: 'gabon-manganese-industrial-game',
        layout: 'paper'
    },
    {
        path: 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published/2026/04-April/2026-04-17 - 2 - 美元周期与全球大宗商品的宏观引力/2026-04-17 - 2 - 美元周期与全球大宗商品的宏观引力.md',
        topic_id: '02',
        slug: 'dollar-cycle-and-commodity-gravity-2026',
        layout: 'paper'
    },
    {
        path: 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published/2026/04-April/2026-04-17 - 22 - 2026年全球战略金属市场深度分析报告：锡、锆、钛/2026-04-17 - 22 - 2026年全球战略金属市场深度分析报告：锡、锆、钛.md',
        topic_id: 22,
        slug: 'strategic-metals-analysis-2026',
        layout: 'paper'
    },
    {
        path: 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published/2026/04-April/2026-04-17 - 88 - 加蓬锰矿出口政策变动背后的产业博弈与实操判断/2026-04-17 - 88 - 加蓬锰矿出口政策变动背后的产业博弈与实操判断.md',
        topic_id: 88,
        slug: 'gabon-manganese-export-ban-analysis',
        layout: 'paper'
    },
    {
        path: 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published/交易员笔记/深度解析‘看对行情却赚不到钱’的盈亏悖论与破局之道 网页代码.md',
        slug: 'profit-loss-paradox-html',
        layout: 'interactive'
    },
    {
        path: 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published/交易员笔记/跨越鸿沟：为什么你赢了判断，却输了账户？.md',
        slug: 'crossing-cognitive-gap',
        layout: 'paper'
    },
    {
        path: 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published/矿业与产业链/矿业巨头战略博弈新格局 html.md',
        slug: 'mining-battle-2026-html',
        layout: 'interactive'
    },
    {
        path: 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published/矿业与产业链/重塑版图：全球十大矿业巨头2026战略大博弈.md',
        slug: 'global-mining-battle-2026',
        layout: 'paper'
    },
    {
        path: 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published/跨界实验/AI 时代的信息生产：从碎片化搜索转向结构化知识合成.md',
        slug: 'ai-information-production',
        layout: 'paper'
    },
    {
        path: 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published/跨界实验/中医系统论：从脏腑平衡到大宗商品供给侧博弈的隐喻.md',
        slug: 'tcm-supply-side-theory',
        layout: 'paper'
    },
    {
        path: 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published/跨界实验/中医系统论：从脏腑平衡到大宗商品供给侧博弈的隐喻 Html.md',
        slug: 'tcm-interactive',
        layout: 'interactive'
    },
    {
        path: 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published/跨界实验/第一线认知：中游加工企业的成本管控与管理哲学思考.md',
        slug: 'first-line-management-philosophy',
        layout: 'paper'
    }
];

ASSETS.forEach(asset => {
    if (!fs.existsSync(asset.path)) {
        console.warn('NOT FOUND: ' + asset.path);
        return;
    }
    const content = fs.readFileSync(asset.path, 'utf-8');
    const { data, content: body } = matter(content);
    
    // Update YAML
    data.web_sync = true;
    data.wechat_sync = true;
    if (asset.topic_id) data.topic_id = asset.topic_id;
    if (asset.slug) data.slug = asset.slug;
    if (asset.layout) data.layout = asset.layout;
    if (!data.author) data.author = '硅基大宗';
    if (!data.title) data.title = asset.path.split('/').pop().replace('.md', '');

    const newContent = matter.stringify(body, data);
    fs.writeFileSync(asset.path, newContent, 'utf-8');
    console.log('UPDATED: ' + asset.slug);
});
