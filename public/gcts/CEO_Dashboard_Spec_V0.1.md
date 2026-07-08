# 董事长决策驾驶舱 V0.1

## 目标

董事长不需要看所有数据库、模型和文档，而是看最终决策界面。驾驶舱必须回答：

1. 今天有哪些必须处理的机会和风险？
2. 当前现金、订单、物流和利润是否安全？
3. 哪些项目建议Go、Watch或No Go？
4. 哪些信息需要董事长亲自判断？

## 一级指标

| 模块 | 指标 |
| --- | --- |
| 利润 | 今日毛利、项目毛利率、预计净利润 |
| 现金 | 可用现金、应收、应付、融资缺口 |
| 订单 | 已签、待签、执行中、逾期 |
| 运输 | 在途货物、路线延误、港口拥堵、保险 |
| 库存 | 国内库存、海外库存、仓储天数 |
| 风险 | 国家风险、供应商风险、客户风险、物流风险、合规风险 |
| 价格 | 关键矿种价格、价格波动、报价有效期 |
| 新闻 | 战争、政策、制裁、矿业事件、港口事件 |
| 决策 | Go、Watch、No Go项目清单 |

## 决策卡片格式

```text
Project:
Country:
Commodity:
Volume:
Route:
Expected Margin:
Cash Requirement:
Risk Score:
Compliance Status:
Recommendation: Go / Watch / No Go
CEO Decision Needed:
```

