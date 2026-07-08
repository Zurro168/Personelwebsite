// GCTS 决策中心 & 智能报价系统 JS 控制引擎

// 1. 系统主数据配置 (支持多维度复用：国家 + 矿种)
const gctsData = {
    // 乍得 + 锑矿 (Case No.001)
    "chad-antimony": {
        countryName: "乍得 (Chad)",
        commodityName: "锑矿 (Antimony - Sb)",
        score: 83,
        verdict: "GO",
        verdictText: "GO (建议签约推进)",
        verdictDesc: "项目财务回报极高，原矿品位表现优异，符合环保及非冲突矿产准入，虽面临物流季节性阻断风险，但整体可控，建议在干季抓紧签署包销SPA并开立信用证。",
        scores: { country: 45, commodity: 85, logistics: 50, risk: 80, finance: 88 },
        summary: { margin: "79.63%", irr: "45.20%", cycle: "75 天", logistics: "$385.00" },
        pricingDefaults: {
            quantity: 526.3,
            grade: 50.0,
            moisture: 5.0,
            purchaseCost: 3000,
            trucking: 200,
            rail: 120,
            intl: {
                basePrice: 55000,
                payability: 80.0,
                tc: 1200,
                seaFreight: 65,
                customs: 35,
                dutyRate: 2.0
            },
            dom: {
                basePrice: 395000,
                payability: 72.0,
                tc: 8500,
                seaFreight: 65,
                customs: 35,
                dutyRate: 2.0
            }
        },
        alarms: [
            { type: "orange", icon: "⚠️", title: "乍得南部及湖区存在“博科圣地”地缘冲突溢出风险", time: "2小时前 | 来源: Risk Agent" },
            { type: "red", icon: "🚫", title: "雨季物理阻断警报：7月-10月 Mongo 土路无法通行重卡", time: "5小时前 | 来源: Logistics Agent" },
            { type: "green", icon: "✓", title: "合规通过：供应商 (Chad Minerals Corp) 100% 通过 OFAC 制藏名单筛查", time: "昨日审查 | 来源: Compliance Agent" }
        ],
        timeline: [
            { title: "Mongo 镇矿区中转堆场 (起始点)", meta: "公路起点 | 距离口岸 630km | 品质粗选与初检批次贴标", status: "正常运行", class: "done" },
            { title: "蒙杜海关监管区 (Moundou Clearance)", meta: "乍得封关口 | 乍得海关出境D15申报、矿业出口许可核销", status: "正常通关", class: "done" },
            { title: "Koutéré / Touboro 边境口岸", meta: "跨国边界 | 乍得-喀麦隆转关交接 | T1 单证过境保函核验", status: "卡车排队 (过关天数约1.5天)", class: "active" },
            { title: "恩冈代雷铁路货运站 (Ngaoundéré)", meta: "铁水换装点 | 公路重卡换装 CAMRAIL 火车车皮 (约需1-2天)", status: "等待车皮调配", class: "next" },
            { title: "喀麦隆杜阿拉港 (卸运码头)", meta: "海运装货港 | 港口保税仓理箱装集装箱，达飞大船周班靠泊", status: "水深 8.8m | 免租期 21天已申请", class: "next" }
        ],
        logisticsParams: { paved: "82%", weight: "重卡限重 50吨", rain: "每年 7.15 - 10.15", bond: "货值额度的 120%" },
        logisticsAlert: "⚠️ 提示：7月份即将进入雨季阶段，砂石土路段路况恶化。GCTS 物流引擎建议在 7月10日 前将矿区精矿全数起运至恩冈代雷保税堆场，以防后期公路断交。"
    },
    // 乍得 + 钨矿 (Case No.002)
    "chad-tungsten": {
        countryName: "乍得 (Chad)",
        commodityName: "钨矿 (Tungsten - WO3)",
        score: 78,
        verdict: "WATCH",
        verdictText: "WATCH (建议观望并强化单证审查)",
        verdictDesc: "黑钨精矿海外外销毛利率为 37.59% (预估净利润 65 万美元)，显著优于国内运回销售。但境外路线面临极其严格的 3TG 合规监管链要求。现场团队必须核实发货人能否出具采矿特许权证与矿山原产地证明，若无法提供或有走私嫌疑，必须强制退守运回国内销售。",
        scores: { country: 45, commodity: 90, logistics: 50, risk: 75, finance: 82 },
        summary: { margin: "37.59%", irr: "38.50%", cycle: "75 天", logistics: "$385.00" },
        pricingDefaults: {
            quantity: 30.61,
            grade: 43.0,
            moisture: 2.0,
            purchaseCost: 750,
            trucking: 200,
            rail: 120,
            intl: {
                basePrice: 3000,
                payability: 45.0,
                tc: 0,
                seaFreight: 65,
                customs: 35,
                dutyRate: 2.0
            },
            dom: {
                basePrice: 7246.15,
                payability: 85.0,
                tc: 0,
                seaFreight: 65,
                customs: 35,
                dutyRate: 2.0
            }
        },
        alarms: [
            { type: "red", icon: "🚫", title: "3TG合规预警：外销越南马山必须备妥10大RMAP/CoC监管链单证，否则面临退货扣留风险", time: "1小时前 | 来源: Compliance Agent" },
            { type: "orange", icon: "⚠️", title: "运价博弈：海外折扣系数平衡点为 30.27%，高于此比例外销在经济上均优于国内运回", time: "3小时前 | 来源: Pricing Agent" },
            { type: "green", icon: "✓", title: "港口就绪：杜阿拉港保税仓已为该批 30 吨黑钨精矿预留专属仓位", time: "昨日 | 来源: Logistics Agent" }
        ],
        timeline: [
            { title: "Mongo 镇矿区中转堆场 (起始点)", meta: "公路起点 | 品质43%黑钨精矿，SGS现场铅封", status: "正常运行", class: "done" },
            { title: "蒙杜海关监管区 (Moundou Clearance)", meta: "乍得封关口 | 乍得海关出境D15申报、黑钨出口许可核销", status: "正常通关", class: "done" },
            { title: "Koutéré / Touboro 边境口岸", meta: "跨国边界 | 乍得-喀麦隆转关交接 | T1 单证过境保函核验", status: "卡车排队过关中", class: "active" },
            { title: "恩冈代雷铁路货运站 (Ngaoundéré)", meta: "铁水换装点 | 公路重卡换装 CAMRAIL 火车车皮", status: "等待车皮调配", class: "next" },
            { title: "喀麦隆杜阿拉港 (卸运码头)", meta: "海运装货港 | 港口保税仓理箱装集装箱，达飞大船周班靠泊", status: "水深 8.8m | 船代21天免箱期已申请", class: "next" }
        ],
        logisticsParams: { paved: "82%", weight: "重卡限重 50吨", rain: "每年 7.15 - 10.15", bond: "货值额度的 120%" },
        logisticsAlert: "⚠️ 提示：黑钨精矿单吨货值超过 5.8 万美元，中途物流防盗及铅封完整性风险极高，重卡运输和铁路换装段必须落实每日GPS视频监控。"
    },
    // 尼日利亚 + 锂矿 (Mock复用案例)
    "nigeria-lithium": {
        countryName: "尼日利亚 (Nigeria)",
        commodityName: "锂矿 (Lithium - Li)",
        score: 68,
        verdict: "WATCH",
        verdictText: "WATCH (建议观望/附条件推进)",
        verdictDesc: "锂矿国际基准价波动剧烈，财务毛利空间受压。尼日利亚拉各斯港口拥堵严重，且存在部分安全及环保合规瑕疵，建议要求供应商给予更高的价格折扣或在到岸后再行结算。",
        scores: { country: 65, commodity: 70, logistics: 60, risk: 65, finance: 60 },
        summary: { margin: "10.26%", irr: "16.80%", cycle: "60 天", logistics: "$150.00" },
        pricingDefaults: {
            quantity: 1030.9,
            grade: 6.0,
            moisture: 3.0,
            purchaseCost: 750,
            trucking: 80,
            rail: 0,
            intl: {
                basePrice: 1500,
                payability: 75.0,
                tc: 0,
                seaFreight: 70,
                customs: 30,
                dutyRate: 1.0
            },
            dom: {
                basePrice: 10800,
                payability: 70.0,
                tc: 0,
                seaFreight: 70,
                customs: 30,
                dutyRate: 1.0
            }
        },
        alarms: [
            { type: "red", icon: "🚫", title: "价格预警：碳酸锂供需过剩，Fastmarkets 锂精矿指数跌破 1,500 美元/吨", time: "1小时前 | 来源: Pricing Agent" },
            { type: "orange", icon: "⚠️", title: "港口拥堵警报：拉各斯 Apapa 码头集装箱滞港天数延至 12 天", time: "3小时前 | 来源: Logistics Agent" }
        ],
        timeline: [
            { title: "Kogi 省锂矿区仓库 (起始点)", meta: "公路起点 | 距离拉各斯港口 450km", status: "正常发运", class: "done" },
            { title: "Lokoja 公路内陆卡哨", meta: "路政检查站 | 轴限吨位查验与灰色小费常发地", status: "排队中", class: "active" },
            { title: "拉各斯 Apapa 码头堆场", meta: "装运港 | 集装箱入港通关与装大船，拥堵率极高", status: "积压延误", class: "next" }
        ],
        logisticsParams: { paved: "95%", weight: "重卡限重 45吨", rain: "无明显影响", bond: "无转关保证金 (本国港口)" },
        logisticsAlert: "⚠️ 提示：尼日利亚拉各斯港口拥堵导致空箱调配极其困难，建议提前 15 天向船公司预订舱位并申请 14 天免箱期。"
    },
    // 刚果金 + 铜矿 (Mock复用案例)
    "drc-copper": {
        countryName: "刚果金 (DRC)",
        commodityName: "铜矿 (Copper - Cu)",
        score: 55,
        verdict: "NOGO",
        verdictText: "NO GO (禁止投资与采购)",
        verdictDesc: "刚果金东部地缘安全风险极高，科卢韦齐铜矿区面临手工矿工侵占风险。且出海通道经过多国过境，沿途索赔纠纷多，OFAC 涉及制裁主体频繁，合规风险爆表，系统执行红线拦截。",
        scores: { country: 30, commodity: 90, logistics: 35, risk: 30, finance: 70 },
        summary: { margin: "-17.06%", irr: "25.00%", cycle: "110 天", logistics: "$480.00" },
        pricingDefaults: {
            quantity: 1041.7,
            grade: 25.0,
            moisture: 4.0,
            purchaseCost: 1200,
            trucking: 320,
            rail: 50,
            intl: {
                basePrice: 8500,
                payability: 82.0,
                tc: 0,
                seaFreight: 110,
                customs: 50,
                dutyRate: 5.0
            },
            dom: {
                basePrice: 61200,
                payability: 78.0,
                tc: 0,
                seaFreight: 110,
                customs: 50,
                dutyRate: 5.0
            }
        },
        alarms: [
            { type: "red", icon: "🚫", title: "安全红色警报：科卢韦齐往赞比亚边境公路上发生武装抢劫矿车事件", time: "30分钟前 | 来源: Risk Agent" },
            { type: "red", icon: "🚫", title: "合规拦截：发现供应商关联受益人与受制裁军阀存在非直接资金往来", time: "2小时前 | 来源: Compliance Agent" }
        ],
        timeline: [
            { title: "科卢韦齐铜精矿仓库 (起始点)", meta: "铜带中心 | 吨袋包装，封条加挂", status: "暂停装运", class: "active" },
            { title: "Kasumbalesa 刚赞边境口岸", meta: "极其拥堵 | 跨国出境通关，重卡排队平均 5-8天", status: "暂停排队", class: "next" },
            { title: "达累斯萨拉姆港 (坦桑尼亚)", meta: "跨国转运出海口 | 里程达 2,500km", status: "等待卸载", class: "next" }
        ],
        logisticsParams: { paved: "65%", weight: "限重 48吨", rain: "雨季导致道路损毁严重", bond: "多国过境保函 150%" },
        logisticsAlert: "❌ 警告：由于该项目安全及合规指标双重触及 GCTS 拦截红线，系统已锁定支付引擎，严禁签署 SPA 和开立信用证。"
    }
};

// 知识库数据库静态主数据
const kbDatabase = {
    country: {
        title: "DB001 国家主数据档案：乍得 (Chad)",
        body: `
            <h4>1. 基本面概述</h4>
            <p><strong>首都:</strong> 恩贾梅纳 (N'Djamena) | <strong>官方货币:</strong> 中非金融法郎 (XAF) | <strong>汇率机制:</strong> 挂钩欧元 (固定汇率 1 EUR = 655.957 XAF)</p>
            <p>乍得是典型的中部非洲内陆国家，矿产资源丰富但开采极度落后。主权信用评级处于违约边缘（Fitch CCC），面临较高的地缘政治冲突和恐怖主义溢出风险。</p>
            
            <h4>2. 矿业法与税制要点</h4>
            <ul>
                <li><strong>特许使用费 (Royalty):</strong> 锑、钨等金属按 FOB 销售额的 5.0% 征收。</li>
                <li><strong>国家免费持股:</strong> 外资项目必须无偿给予乍得国家 10% 股份。</li>
                <li><strong>所得税:</strong> 矿业企业所得税率高达 35%。</li>
            </ul>

            <h4>3. 物流与出口管理</h4>
            <p>乍得无任何本国铁路，所有出口物资必须通过公路拉运 1,800 公里，越过边境运往喀麦隆杜阿拉港装船。海关出口征税 2%，大额出境需办理严格的外汇汇回登记核销手续。</p>
        `
    },
    commodity: {
        title: "DB002 矿物主数据属性：锑矿石/精矿 (Sb)",
        body: `
            <h4>1. 化学物理特征</h4>
            <p><strong>元素符号:</strong> Sb | <strong>主矿物形态:</strong> 辉锑矿 (Sb2S3) | <strong>莫氏硬度:</strong> 2.0 - 2.5 | <strong>基准干重品位:</strong> 50% Sb</p>
            <p>锑属于小金属，具有极高阻燃和半导体特性。精矿粉尘在空气中遇明火有弱燃爆风险，开采与包装要求除尘与通风。</p>
            
            <h4>2. 有害杂质拒收线 (中国商检及环保准入)</h4>
            <table class="kb-table">
                <thead>
                    <tr>
                        <th>杂质元素</th>
                        <th>基准限值</th>
                        <th>惩罚扣款</th>
                        <th>拒收红线 (中国禁进线)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>砷 (As)</td>
                        <td>0.20%</td>
                        <td>每超0.1%扣 $20/吨</td>
                        <td>> 0.50% (按固废退运)</td>
                    </tr>
                    <tr>
                        <td>铅 (Pb)</td>
                        <td>0.50%</td>
                        <td>每超0.1%扣 $15/吨</td>
                        <td>> 1.00% (按固废退运)</td>
                    </tr>
                    <tr>
                        <td>汞 (Hg)</td>
                        <td>0.01%</td>
                        <td>每超0.01%扣 $5/吨</td>
                        <td>> 0.05%</td>
                    </tr>
                </tbody>
            </table>

            <h4>3. 下游终端用途</h4>
            <p>主要用作塑料阻燃剂（三氧化二锑，占 55%）以及光伏玻璃除气澄清剂（焦锑酸钠，占 15% 且高速增长）。</p>
        `
    },
    port: {
        title: "DB004 转运港口主数据：喀麦隆杜阿拉港 (Douala)",
        body: `
            <h4>1. 基本通航条件</h4>
            <p><strong>吃水深度:</strong> 8.5m - 9.2m (大船无法直靠，须中转支线小船) | <strong>港区水域:</strong> 河口港，泥沙淤积严重，常年需要挖泥船疏浚。</p>
            
            <h4>2. 仓储堆场与效率</h4>
            <ul>
                <li><strong>集装箱免租期:</strong> 默认 14 天。大宗矿石出海建议提前向船代（CMA/Maersk）申请 21 天以上超长免箱租。</li>
                <li><strong>装船效率:</strong> 80 - 120 箱/天，效率较低。</li>
                <li><strong>工会罢工风险:</strong> 较高，码头工会平均每两年爆发一次薪酬争议罢工。</li>
            </ul>
        `
    },
    logistics: {
        title: "DB005 物流走廊主数据：乍得Mongo - 喀麦隆Douala",
        body: `
            <h4>1. 核心物流走廊路由</h4>
            <p>Mongo矿区 ── RN6公路(630km) ──> 蒙杜海关 ── RN2公路(120km) ──> Touboro边界 ── 公路(250km) ──> Ngaoundéré陆港 ── CAMRAIL铁路(900km) ──> 杜阿拉港。</p>
            
            <h4>2. 沿途关键风险与过路费</h4>
            <p>全线公路铺装率约 82%。在乍得境内 RN6/RN2 沿线，平均每 100公里分布有多个非正式军警卡哨，单车单次过境灰色小费约计 16-25 美元。7-10月雨季山洪频发，土路段彻底阻断时间长达 45-60 天。</p>
        `
    }
};

// 2. 初始化加载页面
window.onload = function() {
    onSelectorChange(); // 默认执行一次选择器绑定更新
    switchKBData('country'); // 默认展示KB国家主数据
    recalculatePricing(); // 首次执行报价引擎算费
};

// 3. 全局选择器联动更新逻辑 (支持模块化复用)
function onSelectorChange() {
    const country = document.getElementById("select-country").value;
    const commodity = document.getElementById("select-commodity").value;
    const key = `${country}-${commodity}`;

    // 获取对应配置数据，若不存在则降级到乍得锑矿
    const data = gctsData[key] || gctsData["chad-antimony"];

    // A. 更新 L8 决策与评分卡
    document.getElementById("page-title").innerText = `GCTS 决策驾驶舱：${data.countryName} - ${data.commodityName}`;
    document.getElementById("decision-score-value").innerText = data.score;
    
    // 更新评分圆圈发光色
    const circle = document.getElementById("decision-score-circle");
    circle.style.borderColor = data.verdict === "GO" ? "var(--color-success)" : (data.verdict === "WATCH" ? "var(--color-warning)" : "var(--color-danger)");
    circle.style.boxShadow = `0 0 25px ${data.verdict === "GO" ? "rgba(0, 230, 118, 0.25)" : (data.verdict === "WATCH" ? "rgba(255, 179, 0, 0.25)" : "rgba(255, 23, 68, 0.25)")}`;
    
    // Verdict Badge
    const badge = document.getElementById("verdict-badge-value");
    badge.innerText = data.verdictText;
    badge.className = `verdict-badge ${data.verdict.toLowerCase()}`;
    document.getElementById("verdict-description").innerText = data.verdictDesc;

    // B. 更新 L6 五大维度 bar 分数
    updateScoreBar("country", data.scores.country);
    updateScoreBar("commodity", data.scores.commodity);
    updateScoreBar("logistics", data.scores.logistics);
    updateScoreBar("risk", data.scores.risk);
    updateScoreBar("finance", data.scores.finance);

    // C. 更新摘要核心指标
    document.getElementById("summary-profit-margin").innerText = data.summary.margin;
    document.getElementById("summary-profit-margin").className = data.verdict === "NOGO" ? "value danger-text" : "value success-text";
    document.getElementById("summary-irr").innerText = data.summary.irr;
    document.getElementById("summary-irr").className = data.verdict === "NOGO" ? "value danger-text" : "value success-text";
    document.getElementById("summary-cycle").innerText = data.summary.cycle;
    document.getElementById("summary-logistics-cost").innerText = data.summary.logistics;
    // D. 更新报价引擎输入默认值与标签文字
    document.getElementById("in-quantity").value = data.pricingDefaults.quantity;
    document.getElementById("in-grade").value = data.pricingDefaults.grade;
    document.getElementById("in-moisture").value = data.pricingDefaults.moisture;
    document.getElementById("in-purchase-cost").value = data.pricingDefaults.purchaseCost;
    document.getElementById("in-trucking").value = data.pricingDefaults.trucking;
    document.getElementById("in-rail").value = data.pricingDefaults.rail;

    // 国际流向输入初始化
    document.getElementById("intl-base-price").value = data.pricingDefaults.intl.basePrice;
    document.getElementById("intl-payability").value = data.pricingDefaults.intl.payability;
    document.getElementById("intl-tc").value = data.pricingDefaults.intl.tc;
    document.getElementById("intl-sea-freight").value = data.pricingDefaults.intl.seaFreight;
    document.getElementById("intl-customs").value = data.pricingDefaults.intl.customs;
    document.getElementById("intl-duty-rate").value = data.pricingDefaults.intl.dutyRate;

    // 国内流向输入初始化
    document.getElementById("dom-base-price").value = data.pricingDefaults.dom.basePrice;
    document.getElementById("dom-payability").value = data.pricingDefaults.dom.payability;
    document.getElementById("dom-tc").value = data.pricingDefaults.dom.tc;
    document.getElementById("dom-sea-freight").value = data.pricingDefaults.dom.seaFreight;
    document.getElementById("dom-customs").value = data.pricingDefaults.dom.customs;
    document.getElementById("dom-duty-rate").value = data.pricingDefaults.dom.dutyRate;

    // 动态更新输入框 Label 标签
    const lblGrade = document.getElementById("lbl-grade");
    const lblPurchaseCost = document.getElementById("lbl-purchase-cost");
    const lblIntlBasePrice = document.getElementById("lbl-intl-base-price");
    const lblDomBasePrice = document.getElementById("lbl-dom-base-price");
    const lblIntlTc = document.getElementById("lbl-intl-tc");
    const lblDomTc = document.getElementById("lbl-dom-tc");

    if (commodity === "antimony") {
        lblGrade.innerText = "原矿干基品位 Sb (%)";
        lblPurchaseCost.innerText = "本地开采采购价 (USD/干吨)";
        lblIntlBasePrice.innerText = "国际基准价 (Sb锭 USD/吨)";
        lblDomBasePrice.innerText = "国内基准价 (Sb锭 RMB/吨)";
        lblIntlTc.innerText = "处理费/扣减 TC (USD/DMT)";
        lblDomTc.innerText = "处理费/扣减 TC (RMB/DMT)";
    } else if (commodity === "tungsten") {
        lblGrade.innerText = "原矿干基品位 WO3 (%)";
        lblPurchaseCost.innerText = "本地采购价 (USD/吨度)";
        lblIntlBasePrice.innerText = "国际基准价 (APT USD/吨度)";
        lblDomBasePrice.innerText = "国内基准价 (黑钨矿 RMB/吨度)";
        lblIntlTc.innerText = "处理费/扣减 TC (USD/DMT)";
        lblDomTc.innerText = "处理费/扣减 TC (RMB/DMT)";
    } else if (commodity === "lithium") {
        lblGrade.innerText = "原矿干基品位 Li2O (%)";
        lblPurchaseCost.innerText = "本地开采采购价 (USD/干吨)";
        lblIntlBasePrice.innerText = "6%精矿基准指数价 (USD/吨)";
        lblDomBasePrice.innerText = "中国国内基准价 (RMB/吨)";
        lblIntlTc.innerText = "扣减/处理费 TC (USD/DMT)";
        lblDomTc.innerText = "扣减/处理费 TC (RMB/DMT)";
    } else if (commodity === "copper") {
        lblGrade.innerText = "原矿干基品位 Cu (%)";
        lblPurchaseCost.innerText = "本地开采采购价 (USD/干吨)";
        lblIntlBasePrice.innerText = "LME铜期货基准价 (USD/吨)";
        lblDomBasePrice.innerText = "国内基准价 (RMB/吨)";
        lblIntlTc.innerText = "处理费/扣减 TC (USD/DMT)";
        lblDomTc.innerText = "处理费/扣减 TC (RMB/DMT)";
    }

    // 动态更新今日行情参考值
    const refIntl = document.getElementById("ref-intl-val");
    const refDom = document.getElementById("ref-dom-val");

    if (commodity === "antimony") {
        refIntl.innerText = "Fastmarkets 锑锭: $55,000 / 吨";
        refDom.innerText = "SMM 锑锭: ¥395,000 / 吨";
    } else if (commodity === "tungsten") {
        refIntl.innerText = "Fastmarkets APT: $3,000 / 吨度";
        refDom.innerText = "SMM 黑钨精矿: ¥7,246.15 / 吨度";
    } else if (commodity === "lithium") {
        refIntl.innerText = "Fastmarkets 锂精矿(6%): $1,500 / 吨";
        refDom.innerText = "SMM 锂精矿(6%): ¥10,800 / 吨";
    } else if (commodity === "copper") {
        refIntl.innerText = "LME 电解铜: $8,500 / 吨";
        refDom.innerText = "SMM 电解铜: ¥61,200 / 吨";
    }
    // E. 更新警报器
    const alarmsContainer = document.getElementById("alarm-list-container");
    alarmsContainer.innerHTML = "";
    data.alarms.forEach(alarm => {
        const itemDiv = document.createElement("div");
        itemDiv.className = `alarm-item ${alarm.type}`;
        itemDiv.innerHTML = `
            <span class="alarm-icon">${alarm.icon}</span>
            <div class="alarm-info">
                <div class="alarm-title">${alarm.title}</div>
                <div class="alarm-time">${alarm.time}</div>
            </div>
        `;
        alarmsContainer.appendChild(itemDiv);
    });

    // F. 更新物流走廊 Timeline
    const timelineContainer = document.getElementById("logistics-timeline-container");
    timelineContainer.innerHTML = "";
    data.timeline.forEach((node, idx) => {
        const nodeDiv = document.createElement("div");
        nodeDiv.className = `route-node ${node.class}`;
        nodeDiv.innerHTML = `
            <div class="node-badge">${idx + 1}</div>
            <div class="node-content">
                <h4>${node.title}</h4>
                <p class="node-meta">${node.meta}</p>
                <span class="node-status">${node.status}</span>
            </div>
        `;
        timelineContainer.appendChild(nodeDiv);
    });

    // 更新物流基本指标
    document.getElementById("log-param-paved").innerText = data.logisticsParams.paved;
    document.getElementById("log-param-weight").innerText = data.logisticsParams.weight;
    document.getElementById("log-param-rain").innerText = data.logisticsParams.rain;
    document.getElementById("log-param-bond").innerText = data.logisticsParams.bond;
    
    // 物流提示框
    const alertBox = document.getElementById("logistics-alert-box");
    alertBox.innerText = data.logisticsAlert;
    alertBox.className = data.verdict === "NOGO" ? "alert-box-info danger-text" : "alert-box-info";
    if (data.verdict === "NOGO") {
        alertBox.style.borderLeftColor = "var(--color-danger)";
        alertBox.style.backgroundColor = "rgba(255, 23, 68, 0.05)";
    } else {
        alertBox.style.borderLeftColor = "var(--color-warning)";
        alertBox.style.backgroundColor = "rgba(255, 179, 0, 0.05)";
    }

    // 触发贸易条款及报价计算
    onIncotermChange();
}

// 辅助方法：更新评分进度条
function updateScoreBar(type, score) {
    const bar = document.getElementById(`score-bar-${type}`);
    const valText = document.getElementById(`score-val-${type}`);
    bar.style.width = `${score}%`;
    valText.innerText = `${score}/100`;

    // 动态调整条形图颜色
    bar.className = "progress-bar";
    if (score >= 80) bar.classList.add("success");
    else if (score >= 50) bar.classList.add("warning");
    else bar.classList.add("danger");
}

// 采购条款切换联动逻辑
function onIncotermChange() {
    const incoterm = document.getElementById("in-incoterm").value;
    const inTrucking = document.getElementById("in-trucking");
    const inRail = document.getElementById("in-rail");
    const lblPurchaseCost = document.getElementById("lbl-purchase-cost");
    const commodity = document.getElementById("select-commodity").value;

    if (incoterm === "FOB") {
        inTrucking.disabled = true;
        inRail.disabled = true;
        inTrucking.style.opacity = "0.4";
        inRail.style.opacity = "0.4";
        lblPurchaseCost.innerText = commodity === "tungsten" ? "FOB采购价 (USD/吨度)" : "FOB采购价 (USD/干吨)";
    } else {
        inTrucking.disabled = false;
        inRail.disabled = false;
        inTrucking.style.opacity = "1";
        inRail.style.opacity = "1";
        lblPurchaseCost.innerText = commodity === "tungsten" ? "本地采购价 (USD/吨度)" : "本地开采采购价 (USD/干吨)";
    }
    recalculatePricing();
}

// 4. 核心报价引擎计算算法 (L6 Pricing Engine) - 双流向侧边对比测算 V0.2
function recalculatePricing() {
    const FX_RATE = 7.20;

    // Common Inputs
    const incoterm = document.getElementById("in-incoterm").value;
    const quantityWMT = parseFloat(document.getElementById("in-quantity").value) || 0;
    const grade = parseFloat(document.getElementById("in-grade").value) || 0;
    const moisture = parseFloat(document.getElementById("in-moisture").value) || 0;
    const purchaseCost = parseFloat(document.getElementById("in-purchase-cost").value) || 0; // in USD
    const trucking = parseFloat(document.getElementById("in-trucking").value) || 0; // in USD
    const rail = parseFloat(document.getElementById("in-rail").value) || 0; // in USD

    // Calculated Common quantities
    const quantityDMT = quantityWMT * (1 - moisture / 100);

    const commodity = document.getElementById("select-commodity").value;
    const country = document.getElementById("select-country").value;

    // Route specific inputs
    // Intl
    const intlBasePrice = parseFloat(document.getElementById("intl-base-price").value) || 0;
    const intlPayability = parseFloat(document.getElementById("intl-payability").value) || 0;
    const intlTC = parseFloat(document.getElementById("intl-tc").value) || 0;
    const intlSeaFreight = parseFloat(document.getElementById("intl-sea-freight").value) || 0;
    const intlCustoms = parseFloat(document.getElementById("intl-customs").value) || 0;
    const intlDutyRate = parseFloat(document.getElementById("intl-duty-rate").value) || 0;

    // Dom
    const domBasePrice = parseFloat(document.getElementById("dom-base-price").value) || 0;
    const domPayability = parseFloat(document.getElementById("dom-payability").value) || 0;
    const domTC = parseFloat(document.getElementById("dom-tc").value) || 0;
    const domSeaFreight = parseFloat(document.getElementById("dom-sea-freight").value) || 0;
    const domCustoms = parseFloat(document.getElementById("dom-customs").value) || 0;
    const domDutyRate = parseFloat(document.getElementById("dom-duty-rate").value) || 0;

    // A Helper function to run the full P&L calculation for a given route
    function calculateRoutePL(route, basePrice, payability, tc, seaFreight, customs, dutyRate) {
        let fobPriceUSD = 0;
        let fobPriceRMB = 0;

        // Base price: Antimony (USD/t or RMB/t), Tungsten (USD/MTU or RMB/MTU), Lithium/Copper (USD/t or RMB/t)
        if (commodity === "tungsten") {
            // Tungsten formula: Base Price * Grade * Payability%
            // Since grade is e.g. 43.0%, 1 DMT contains 43 MTU. Price per DMT = Base Price * 43.0 * (Payability / 100) - TC
            if (route === 'intl') {
                fobPriceUSD = basePrice * grade * (payability / 100) - tc;
                fobPriceRMB = fobPriceUSD * FX_RATE;
            } else {
                fobPriceRMB = basePrice * grade * (payability / 100) - tc;
                fobPriceUSD = fobPriceRMB / FX_RATE;
            }
        } else if (commodity === "lithium") {
            // Lithium formula: Base Price * (Grade / 6.0) * (Payability / 100) - TC
            if (route === 'intl') {
                fobPriceUSD = basePrice * (grade / 6.0) * (payability / 100) - tc;
                fobPriceRMB = fobPriceUSD * FX_RATE;
            } else {
                fobPriceRMB = basePrice * (grade / 6.0) * (payability / 100) - tc;
                fobPriceUSD = fobPriceRMB / FX_RATE;
            }
        } else {
            // Antimony/Copper formula: Base Price * (Grade / 100) * (Payability / 100) - TC
            if (route === 'intl') {
                fobPriceUSD = basePrice * (grade / 100) * (payability / 100) - tc;
                fobPriceRMB = fobPriceUSD * FX_RATE;
            } else {
                fobPriceRMB = basePrice * (grade / 100) * (payability / 100) - tc;
                fobPriceUSD = fobPriceRMB / FX_RATE;
            }
        }

        // Revenues
        const revenueUSD = quantityDMT * fobPriceUSD;
        const revenueRMB = quantityDMT * fobPriceRMB;

        // Cost elements (Purchase is always in USD, trucking & rail in USD, fixed logistics $6000 is USD, sea freight is USD)
        // 1. Purchase cost
        let purchaseCostUSD = 0;
        if (commodity === "tungsten") {
            purchaseCostUSD = quantityDMT * grade * purchaseCost;
        } else {
            purchaseCostUSD = quantityDMT * purchaseCost;
        }
        const purchaseCostRMB = purchaseCostUSD * FX_RATE;

        // 2. Trucking
        const truckingCostUSD = incoterm === "FOB" ? 0 : quantityWMT * trucking;
        const truckingCostRMB = truckingCostUSD * FX_RATE;

        // 3. Rail
        const railCostUSD = incoterm === "FOB" ? 0 : quantityWMT * rail;
        const railCostRMB = railCostUSD * FX_RATE;

        // 4. Customs variable and Fixed ($6000 batch fixed fee)
        const fixedLogisticsUSD = incoterm === "FOB" ? 0 : 6000;
        const customsCostUSD = incoterm === "FOB" ? 0 : (quantityDMT * customs + fixedLogisticsUSD);
        const customsCostRMB = customsCostUSD * FX_RATE;

        // 5. Export resource tax (based on local purchase cost + inland trucking/rail/customs logistics)
        const localCostBaseUSD = purchaseCostUSD + truckingCostUSD + railCostUSD + customsCostUSD;
        const dutyCostUSD = incoterm === "FOB" ? 0 : (localCostBaseUSD * (dutyRate / 100));
        const dutyCostRMB = dutyCostUSD * FX_RATE;

        // 6. Sea freight
        const seaCostUSD = quantityWMT * seaFreight;
        const seaCostRMB = seaCostUSD * FX_RATE;

        // 7. Value-based costs (insurance 0.6% + bank 0.3% = 0.9% of revenue)
        const valueCostUSD = revenueUSD * 0.009;
        const valueCostRMB = revenueRMB * 0.009;

        // 8. Smelter TCRC (only for copper, $88/DMT)
        const tcrcCostUSD = commodity === "copper" ? quantityDMT * 88 : 0;
        const tcrcCostRMB = tcrcCostUSD * FX_RATE;

        // 9. Contingency (5% of base)
        const baseForContingencyUSD = purchaseCostUSD + truckingCostUSD + railCostUSD + customsCostUSD + dutyCostUSD + seaCostUSD + valueCostUSD + tcrcCostUSD;
        const contingencyCostUSD = baseForContingencyUSD * 0.05;
        const contingencyCostRMB = contingencyCostUSD * FX_RATE;

        // Other/Misc Cost = Value Based + Smelter TCRC + Contingency
        const otherCostUSD = valueCostUSD + tcrcCostUSD + contingencyCostUSD;
        const otherCostRMB = valueCostRMB + tcrcCostRMB + contingencyCostRMB;

        // Total Cost
        const totalCostUSD = purchaseCostUSD + truckingCostUSD + railCostUSD + customsCostUSD + dutyCostUSD + seaCostUSD + otherCostUSD;
        const totalCostRMB = totalCostUSD * FX_RATE;

        // Net profit
        const netProfitUSD = revenueUSD - totalCostUSD;
        const netProfitRMB = revenueRMB - totalCostRMB;

        // Margin %
        const marginPercent = revenueUSD > 0 ? (netProfitUSD / revenueUSD) * 100 : 0;

        return {
            fobPriceUSD,
            fobPriceRMB,
            revenueUSD,
            revenueRMB,
            purchaseCostUSD,
            purchaseCostRMB,
            truckingCostUSD,
            truckingCostRMB,
            railCostUSD,
            railCostRMB,
            customsCostUSD,
            customsCostRMB,
            dutyCostUSD,
            dutyCostRMB,
            seaCostUSD,
            seaCostRMB,
            otherCostUSD,
            otherCostRMB,
            netProfitUSD,
            netProfitRMB,
            marginPercent
        };
    }

    // Run calculation for both directions
    const intlPL = calculateRoutePL('intl', intlBasePrice, intlPayability, intlTC, intlSeaFreight, intlCustoms, intlDutyRate);
    const domPL = calculateRoutePL('dom', domBasePrice, domPayability, domTC, domSeaFreight, domCustoms, domDutyRate);

    // B. Helper functions for formatting
    function fmtUSD(val, withParen = true) {
        const sign = val < 0 ? "-" : "";
        const absVal = Math.abs(val);
        const formatted = `$${absVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        if (val < 0 && withParen) {
            return `(${formatted})`;
        }
        return sign + formatted;
    }

    function fmtRMB(val, withParen = true) {
        const sign = val < 0 ? "-" : "";
        const absVal = Math.abs(val);
        const formatted = `¥${absVal.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        if (val < 0 && withParen) {
            return `(${formatted})`;
        }
        return sign + formatted;
    }

    function fmtPercent(val, withSign = false) {
        const sign = (withSign && val > 0) ? "+" : "";
        return `${sign}${val.toFixed(2)}%`;
    }

    // C. Render to DOM
    // 1. DMT Row
    document.getElementById("res-intl-dmt").innerText = `${quantityDMT.toFixed(2)} DMT`;
    document.getElementById("res-dom-dmt-rmb").innerText = `${quantityDMT.toFixed(2)} DMT`;
    document.getElementById("res-dom-dmt-usd").innerText = `${quantityDMT.toFixed(2)} DMT`;
    document.getElementById("res-diff-dmt").innerText = "-";

    // 2. FOB Price Row
    document.getElementById("res-intl-fob-price").innerText = `${fmtUSD(intlPL.fobPriceUSD, false)} / DMT`;
    document.getElementById("res-dom-fob-price-rmb").innerText = `${fmtRMB(domPL.fobPriceRMB, false)} / DMT`;
    document.getElementById("res-dom-fob-price-usd").innerText = `${fmtUSD(domPL.fobPriceUSD, false)} / DMT`;
    const diffFob = intlPL.fobPriceUSD - domPL.fobPriceUSD;
    document.getElementById("res-diff-fob-price").innerText = (diffFob >= 0 ? "+" : "") + fmtUSD(diffFob, false);
    document.getElementById("res-diff-fob-price").className = diffFob >= 0 ? "text-right font-bold success-text" : "text-right font-bold danger-text";

    // 3. Total Revenue
    document.getElementById("res-intl-revenue").innerText = fmtUSD(intlPL.revenueUSD, false);
    document.getElementById("res-dom-revenue-rmb").innerText = fmtRMB(domPL.revenueRMB, false);
    document.getElementById("res-dom-revenue-usd").innerText = fmtUSD(domPL.revenueUSD, false);
    const diffRev = intlPL.revenueUSD - domPL.revenueUSD;
    document.getElementById("res-diff-revenue").innerText = (diffRev >= 0 ? "+" : "") + fmtUSD(diffRev, false);
    document.getElementById("res-diff-revenue").className = diffRev >= 0 ? "text-right font-bold success-text" : "text-right font-bold danger-text";

    // 4. Purchase Cost
    document.getElementById("res-intl-purchase").innerText = `(${fmtUSD(intlPL.purchaseCostUSD, false)})`;
    document.getElementById("res-dom-purchase-rmb").innerText = `(${fmtRMB(domPL.purchaseCostRMB, false)})`;
    document.getElementById("res-dom-purchase-usd").innerText = `(${fmtUSD(domPL.purchaseCostUSD, false)})`;
    const diffPur = intlPL.purchaseCostUSD - domPL.purchaseCostUSD;
    document.getElementById("res-diff-purchase").innerText = fmtUSD(diffPur, false);
    document.getElementById("res-diff-purchase").className = "text-right font-bold";

    // 5. Trucking
    document.getElementById("res-intl-trucking").innerText = incoterm === "FOB" ? "$0.00 (含于FOB)" : `(${fmtUSD(intlPL.truckingCostUSD, false)})`;
    document.getElementById("res-dom-trucking-rmb").innerText = incoterm === "FOB" ? "¥0.00 (含于FOB)" : `(${fmtRMB(domPL.truckingCostRMB, false)})`;
    document.getElementById("res-dom-trucking-usd").innerText = incoterm === "FOB" ? "$0.00 (含于FOB)" : `(${fmtUSD(domPL.truckingCostUSD, false)})`;
    const diffTrucking = intlPL.truckingCostUSD - domPL.truckingCostUSD;
    document.getElementById("res-diff-trucking").innerText = fmtUSD(diffTrucking, false);
    document.getElementById("res-diff-trucking").className = "text-right font-bold";

    // 6. Rail
    document.getElementById("res-intl-rail").innerText = incoterm === "FOB" ? "$0.00 (含于FOB)" : `(${fmtUSD(intlPL.railCostUSD, false)})`;
    document.getElementById("res-dom-rail-rmb").innerText = incoterm === "FOB" ? "¥0.00 (含于FOB)" : `(${fmtRMB(domPL.railCostRMB, false)})`;
    document.getElementById("res-dom-rail-usd").innerText = incoterm === "FOB" ? "$0.00 (含于FOB)" : `(${fmtUSD(domPL.railCostUSD, false)})`;
    const diffRail = intlPL.railCostUSD - domPL.railCostUSD;
    document.getElementById("res-diff-rail").innerText = fmtUSD(diffRail, false);
    document.getElementById("res-diff-rail").className = "text-right font-bold";

    // 7. Customs
    document.getElementById("res-intl-customs").innerText = incoterm === "FOB" ? "$0.00 (含于FOB)" : `(${fmtUSD(intlPL.customsCostUSD, false)})`;
    document.getElementById("res-dom-customs-rmb").innerText = incoterm === "FOB" ? "¥0.00 (含于FOB)" : `(${fmtRMB(domPL.customsCostRMB, false)})`;
    document.getElementById("res-dom-customs-usd").innerText = incoterm === "FOB" ? "$0.00 (含于FOB)" : `(${fmtUSD(domPL.customsCostUSD, false)})`;
    const diffCustoms = intlPL.customsCostUSD - domPL.customsCostUSD;
    document.getElementById("res-diff-customs").innerText = fmtUSD(diffCustoms, false);
    document.getElementById("res-diff-customs").className = "text-right font-bold";

    // 8. Duty
    document.getElementById("res-intl-duty").innerText = incoterm === "FOB" ? "$0.00 (含于FOB)" : `(${fmtUSD(intlPL.dutyCostUSD, false)})`;
    document.getElementById("res-dom-duty-rmb").innerText = incoterm === "FOB" ? "¥0.00 (含于FOB)" : `(${fmtRMB(domPL.dutyCostRMB, false)})`;
    document.getElementById("res-dom-duty-usd").innerText = incoterm === "FOB" ? "$0.00 (含于FOB)" : `(${fmtUSD(domPL.dutyCostUSD, false)})`;
    const diffDuty = intlPL.dutyCostUSD - domPL.dutyCostUSD;
    document.getElementById("res-diff-duty").innerText = (diffDuty >= 0 ? "+" : "") + fmtUSD(diffDuty, false);
    document.getElementById("res-diff-duty").className = diffDuty >= 0 ? "text-right font-bold success-text" : "text-right font-bold danger-text";

    // 9. Sea Freight
    document.getElementById("res-intl-sea").innerText = `(${fmtUSD(intlPL.seaCostUSD, false)})`;
    document.getElementById("res-dom-sea-rmb").innerText = `(${fmtRMB(domPL.seaCostRMB, false)})`;
    document.getElementById("res-dom-sea-usd").innerText = `(${fmtUSD(domPL.seaCostUSD, false)})`;
    const diffSea = intlPL.seaCostUSD - domPL.seaCostUSD;
    document.getElementById("res-diff-sea").innerText = fmtUSD(diffSea, false);
    document.getElementById("res-diff-sea").className = "text-right font-bold";

    // 10. Other
    document.getElementById("res-intl-other").innerText = `(${fmtUSD(intlPL.otherCostUSD, false)})`;
    document.getElementById("res-dom-other-rmb").innerText = `(${fmtRMB(domPL.otherCostRMB, false)})`;
    document.getElementById("res-dom-other-usd").innerText = `(${fmtUSD(domPL.otherCostUSD, false)})`;
    const diffOther = intlPL.otherCostUSD - domPL.otherCostUSD;
    document.getElementById("res-diff-other").innerText = (diffOther >= 0 ? "+" : "") + fmtUSD(diffOther, false);
    document.getElementById("res-diff-other").className = diffOther >= 0 ? "text-right font-bold success-text" : "text-right font-bold danger-text";

    // 11. Net Profit
    const profitIntlEl = document.getElementById("res-intl-net-profit");
    const profitDomRmbEl = document.getElementById("res-dom-net-profit-rmb");
    const profitDomUsdEl = document.getElementById("res-dom-net-profit-usd");
    const profitDiffEl = document.getElementById("res-diff-net-profit");

    profitIntlEl.innerText = fmtUSD(intlPL.netProfitUSD, false);
    profitDomRmbEl.innerText = fmtRMB(domPL.netProfitRMB, false);
    profitDomUsdEl.innerText = fmtUSD(domPL.netProfitUSD, false);
    
    const diffProfit = intlPL.netProfitUSD - domPL.netProfitUSD;
    profitDiffEl.innerText = (diffProfit >= 0 ? "+" : "") + fmtUSD(diffProfit, false);

    profitIntlEl.className = intlPL.netProfitUSD >= 0 ? "text-right font-bold success-text" : "text-right font-bold danger-text";
    profitDomRmbEl.className = domPL.netProfitRMB >= 0 ? "text-right font-bold success-text" : "text-right font-bold danger-text";
    profitDomUsdEl.className = domPL.netProfitUSD >= 0 ? "text-right font-bold success-text" : "text-right font-bold danger-text";
    profitDiffEl.className = diffProfit >= 0 ? "text-right font-bold gold-text" : "text-right font-bold danger-text";

    // 12. Margin
    const marginIntlEl = document.getElementById("res-intl-margin-percent");
    const marginDomRmbEl = document.getElementById("res-dom-margin-percent-rmb");
    const marginDomUsdEl = document.getElementById("res-dom-margin-percent-usd");
    const marginDiffEl = document.getElementById("res-diff-margin-percent");

    marginIntlEl.innerText = fmtPercent(intlPL.marginPercent);
    marginDomRmbEl.innerText = "-";
    marginDomUsdEl.innerText = fmtPercent(domPL.marginPercent);

    const diffMargin = intlPL.marginPercent - domPL.marginPercent;
    marginDiffEl.innerText = fmtPercent(diffMargin, true);

    marginIntlEl.className = intlPL.marginPercent >= 0 ? "text-right font-bold success-text" : "text-right font-bold danger-text";
    marginDomUsdEl.className = domPL.marginPercent >= 0 ? "text-right font-bold success-text" : "text-right font-bold danger-text";
    marginDiffEl.className = diffMargin >= 0 ? "text-right font-bold gold-text" : "text-right font-bold danger-text";
}

// 5. CSV 数据导出模拟引擎
function exportPricingCSV() {
    const country = document.getElementById("select-country").options[document.getElementById("select-country").selectedIndex].text;
    const commodity = document.getElementById("select-commodity").options[document.getElementById("select-commodity").selectedIndex].text;
    
    // 构造CSV字符串
    let csv = `GCTS Pricing Model,${country} - ${commodity},Export Date: 2026-07-06\n`;
    csv += `Financial Item,International (USD),Domestic (RMB),Domestic (USD),Arbitrage Spread (USD)\n`;
    
    csv += `DMT,${document.getElementById("res-intl-dmt").innerText.replace(/,/g, '')},${document.getElementById("res-dom-dmt-rmb").innerText.replace(/,/g, '')},${document.getElementById("res-dom-dmt-usd").innerText.replace(/,/g, '')},${document.getElementById("res-diff-dmt").innerText}\n`;
    csv += `FOB Unit Price,${document.getElementById("res-intl-fob-price").innerText.replace(/ /g, '').replace(/,/g, '')},${document.getElementById("res-dom-fob-price-rmb").innerText.replace(/ /g, '').replace(/,/g, '')},${document.getElementById("res-dom-fob-price-usd").innerText.replace(/ /g, '').replace(/,/g, '')},${document.getElementById("res-diff-fob-price").innerText.replace(/,/g, '')}\n`;
    csv += `Total Revenue,${document.getElementById("res-intl-revenue").innerText.replace(/,/g, '')},${document.getElementById("res-dom-revenue-rmb").innerText.replace(/,/g, '')},${document.getElementById("res-dom-revenue-usd").innerText.replace(/,/g, '')},${document.getElementById("res-diff-revenue").innerText.replace(/,/g, '')}\n`;
    csv += `1. Purchase Cost,${document.getElementById("res-intl-purchase").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-dom-purchase-rmb").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-dom-purchase-usd").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-diff-purchase").innerText.replace(/,/g, '')}\n`;
    csv += `2. Trucking Freight,${document.getElementById("res-intl-trucking").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-dom-trucking-rmb").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-dom-trucking-usd").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-diff-trucking").innerText.replace(/,/g, '')}\n`;
    csv += `3. Rail Freight,${document.getElementById("res-intl-rail").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-dom-rail-rmb").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-dom-rail-usd").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-diff-rail").innerText.replace(/,/g, '')}\n`;
    csv += `4. Customs & Port Fees,${document.getElementById("res-intl-customs").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-dom-customs-rmb").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-dom-customs-usd").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-diff-customs").innerText.replace(/,/g, '')}\n`;
    csv += `5. Export Duty,${document.getElementById("res-intl-duty").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-dom-duty-rmb").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-dom-duty-usd").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-diff-duty").innerText.replace(/,/g, '')}\n`;
    csv += `6. Sea Freight,${document.getElementById("res-intl-sea").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-dom-sea-rmb").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-dom-sea-usd").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-diff-sea").innerText.replace(/,/g, '')}\n`;
    csv += `7. Other Fees,${document.getElementById("res-intl-other").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-dom-other-rmb").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-dom-other-usd").innerText.replace(/[()]/g, '').replace(/,/g, '')},${document.getElementById("res-diff-other").innerText.replace(/,/g, '')}\n`;
    csv += `Net Profit,${document.getElementById("res-intl-net-profit").innerText.replace(/,/g, '')},${document.getElementById("res-dom-net-profit-rmb").innerText.replace(/,/g, '')},${document.getElementById("res-dom-net-profit-usd").innerText.replace(/,/g, '')},${document.getElementById("res-diff-net-profit").innerText.replace(/,/g, '')}\n`;
    csv += `Margin %,${document.getElementById("res-intl-margin-percent").innerText},${document.getElementById("res-dom-margin-percent-rmb").innerText},${document.getElementById("res-dom-margin-percent-usd").innerText},${document.getElementById("res-diff-margin-percent").innerText}\n`;

    // 触发下载
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const cleanCountry = country.replace(/[\(\)\s]/g, '').split('-')[0];
    const cleanCommodity = commodity.replace(/[\(\)\s]/g, '').split('-')[0];
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `GCTS_Dual_Model_${cleanCountry}_${cleanCommodity}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 6. 选项卡切换控制器
function switchTab(tabId) {
    // 隐藏所有选项卡内容
    document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".menu-item").forEach(el => el.classList.remove("active"));

    // 激活对应选项卡和菜单项
    document.getElementById(`tab-content-${tabId}`).classList.add("active");
    document.getElementById(`nav-${tabId}`).classList.add("active");

    // 更新页面头部二级副标题说明
    const headerTitle = document.getElementById("page-title");
    const country = document.getElementById("select-country").options[document.getElementById("select-country").selectedIndex].text;
    const commodity = document.getElementById("select-commodity").options[document.getElementById("select-commodity").selectedIndex].text;

    if (tabId === "dashboard") {
        headerTitle.innerText = `GCTS 决策驾驶舱：${country} - ${commodity}`;
    } else if (tabId === "pricing") {
        headerTitle.innerText = `GCTS 智能报价与算费引擎`;
    } else if (tabId === "logistics") {
        headerTitle.innerText = `GCTS 物流与多式联运走廊`;
    } else if (tabId === "kb") {
        headerTitle.innerText = `GCTS 知识库主数据查询`;
    } else if (tabId === "assets") {
        headerTitle.innerText = `GCTS 操作系统成果大地图`;
    }
}

// 7. 知识库主数据内容切换器 (动态解析国家及矿种)
function switchKBData(type) {
    const listItems = document.querySelectorAll(".kb-nav-list li");
    listItems.forEach(item => item.classList.remove("active"));

    // 激活高亮
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add("active");
    } else {
        // 初始化加载时定位激活项
        listItems.forEach(item => {
            if (item.getAttribute("onclick").includes(type)) {
                item.classList.add("active");
            }
        });
    }

    const country = document.getElementById("select-country").value;
    const commodity = document.getElementById("select-commodity").value;

    let title = "";
    let body = "";

    if (type === "country") {
        if (country === "chad") {
            title = "DB001 国家主数据档案：乍得 (Chad)";
            body = `
                <h4>1. 基本面概述</h4>
                <p><strong>首都:</strong> 恩贾梅纳 (N'Djamena) | <strong>官方货币:</strong> 中非金融法郎 (XAF) | <strong>汇率机制:</strong> 固定汇率 (1 EUR = 655.957 XAF)</p>
                <p>乍得是典型的中部非洲内陆国家，矿产资源丰富但开采极度落后。主权信用评级处于违约边缘（Fitch CCC），面临较高的地缘政治冲突和恐怖主义溢出风险。</p>
                
                <h4>2. 矿业法与税制要点</h4>
                <ul>
                    <li><strong>特许使用费 (Royalty):</strong> 锑、钨等金属按 FOB 销售额的 5.0% 征收。</li>
                    <li><strong>国家免费持股:</strong> 外资项目必须无偿给予乍得国家 10% 股份。</li>
                    <li><strong>所得税:</strong> 矿业企业所得税率高达 35%。</li>
                </ul>

                <h4>3. 物流与出口管理</h4>
                <p>乍得无任何本国铁路，所有出口物资必须通过公路运往喀麦隆恩冈代雷陆港，再铁路转运至杜阿拉港。海关出口征税 2%，大额出境需办理严格的外汇结汇登记核销手续。</p>
            `;
        } else if (country === "nigeria") {
            title = "DB001 国家主数据档案：尼日利亚 (Nigeria)";
            body = `
                <h4>1. 基本面概述</h4>
                <p><strong>首都:</strong> 阿布贾 (Abuja) | <strong>官方货币:</strong> 奈拉 (NGN) | <strong>汇率机制:</strong> 自由浮动，本币贬值与外汇波动风险极高。</p>
                <p>西非第一大经济体，矿产储量潜力庞大。南部拉各斯为核心海港，但港口吞吐效率低，Apapa 码头拥堵严重，内陆公路运输卡哨敲诈频发。</p>
                
                <h4>2. 矿业限制政策</h4>
                <p>尼日利亚矿业部近年来推行本地附加值增加法案，限制未加工矿石（Raw Ore）直接出口，强制出口精矿粉，必须办理本地合规原产地税单。</p>
            `;
        } else if (country === "drc") {
            title = "DB001 国家主数据档案：刚果金 (DRC)";
            body = `
                <h4>1. 基本面概述</h4>
                <p><strong>首都:</strong> 金沙萨 (Kinshasa) | <strong>官方货币:</strong> 刚果法郎 (CDF)</p>
                <p>全球最大铜钴矿产区。但东部安全局势长期糜烂，武装叛乱频发，反洗钱（AML）及制裁风险（OFAC/SDN）极高，国际主流买方对冲突矿产（3TG）有极端严苛的溯源链准入门槛。</p>
            `;
        }
    } else if (type === "commodity") {
        if (commodity === "antimony") {
            title = "DB002 矿物主数据属性：锑矿石/精矿 (Sb)";
            body = `
                <h4>1. 化学物理特征</h4>
                <p><strong>元素符号:</strong> Sb | <strong>主矿物形态:</strong> 辉锑矿 (Sb2S3) | <strong>莫氏硬度:</strong> 2.0 - 2.5 | <strong>基准干重品位:</strong> 50% Sb</p>
                <p>锑属于小金属，具有极高阻燃和半导体特性。精矿粉尘在空气中遇明火有弱燃爆风险，开采与包装要求除尘与通风。</p>
                
                <h4>2. 有害杂质拒收线 (中国商检及环保准入)</h4>
                <table class="kb-table">
                    <thead>
                        <tr>
                            <th>杂质元素</th>
                            <th>基准限值</th>
                            <th>惩罚扣款</th>
                            <th>拒收红线 (中国禁进线)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>砷 (As)</td>
                            <td>0.20%</td>
                            <td>每超0.1%扣 $20/吨</td>
                            <td>> 0.50% (按固废退运)</td>
                        </tr>
                        <tr>
                            <td>铅 (Pb)</td>
                            <td>0.50%</td>
                            <td>每超0.1%扣 $15/吨</td>
                            <td>> 1.00% (按固废退运)</td>
                        </tr>
                        <tr>
                            <td>汞 (Hg)</td>
                            <td>0.01%</td>
                            <td>每超0.01%扣 $5/吨</td>
                            <td>> 0.05%</td>
                        </tr>
                    </tbody>
                </table>
            `;
        } else if (commodity === "tungsten") {
            title = "DB002 矿物主数据属性：钨精矿 (WO3)";
            body = `
                <h4>1. 化学物理特征</h4>
                <p><strong>主要元素:</strong> 钨 (W) / 三氧化钨 (WO3) | <strong>常见矿物:</strong> 黑钨矿 (Fe,Mn)WO4、白钨矿 CaWO4 | <strong>莫氏硬度:</strong> 4.5 - 5.5</p>
                <p>主要用于硬质合金、电子真空器件及国防装备。属于不可回收的战略关键金属，中国占据全球超 70% 供应权，出口受限配额管理。</p>
                
                <h4>2. 定价与结算口径</h4>
                <p>国际上以 <strong>APT (仲钨酸铵) 美元/吨度 (MTU)</strong> 为基准价格，按精矿品位折算系数交易；国内贸易基准为 <strong>元/标吨 (含WO3 65%)</strong> 结算。</p>
                
                <h4>3. 3TG 合规红线</h4>
                <p>钨属于国际规定的 3TG 冲突金属（锡锡钨金），出口商必须在交单时提供无瑕疵的 RMAP/CoC 产销监管链证明，否则一律拒收退运。</p>
            `;
        } else if (commodity === "lithium") {
            title = "DB002 矿物主数据属性：锂矿精矿 (Li2O)";
            body = `
                <h4>1. 化学物理特征</h4>
                <p>主要存在于锂辉石和锂云母中，交易基准品位通常为 <strong>6.0% Li2O</strong>。下游广泛应用于锂电池和陶瓷工业，因产能快速过剩，价格受宏观新能源供需周期波动剧烈。</p>
            `;
        } else if (commodity === "copper") {
            title = "DB002 矿物主数据属性：铜精矿 (Cu)";
            body = `
                <h4>1. 化学物理特征</h4>
                <p>交易基准品位 <strong>25% Cu</strong>。属于流动性极强的大宗贱金属（Base Metals），价格直接由 LME 期货盘面及加工费 (TC/RC) 控制，商业博弈深度大，资金占用多。</p>
            `;
        }
    } else if (type === "port") {
        title = "DB004 转运港口主数据：喀麦隆杜阿拉港 (Douala)";
        body = `
            <h4>1. 基本通航条件</h4>
            <p><strong>吃水深度:</strong> 8.5m - 9.2m (大船无法直靠，须中转支线小船) | <strong>港区水域:</strong> 河口港，泥沙淤积严重，常年需要挖泥船疏浚。</p>
            
            <h4>2. 仓储堆场与效率</h4>
            <ul>
                <li><strong>集装箱免租期:</strong> 默认 14 天。大宗矿石出海建议提前向船代（CMA/Maersk）申请 21 天以上超长免箱租。</li>
                <li><strong>装船效率:</strong> 80 - 120 箱/天，效率较低。</li>
                <li><strong>工会罢工风险:</strong> 较高，码头工会平均每两年爆发一次薪酬争议罢工。</li>
            </ul>
        `;
    } else if (type === "logistics") {
        title = "DB005 物流走廊主数据：乍得Mongo - 喀麦隆Douala";
        body = `
            <h4>1. 核心物流走廊路由</h4>
            <p>Mongo矿区 ── RN6公路(630km) ──> 蒙杜海关 ── RN2公路(120km) ──> Touboro边界 ── 公路(250km) ──> Ngaoundéré陆港 ── CAMRAIL铁路(900km) ──> 杜阿拉港。</p>
            
            <h4>2. 沿途关键风险与过路费</h4>
            <p>全线公路铺装率约 82%。在乍得境内 RN6/RN2 沿线，平均每 100公里分布有多个非正式军警卡哨，单车单次过境灰色小费约计 16-25 美元。7-10月雨季山洪频发，土路段彻底阻断时间长达 45-60 天。</p>
        `;
    }

    document.getElementById("kb-data-title").innerText = title;
    document.getElementById("kb-data-body").innerHTML = body;
}

// --- 新增：GCTS 一键重置参数与微交互通知功能 ---
function resetDefaults() {
    // 重新调用主更新选择器，刷新输入框
    onSelectorChange();
    
    // 重新执行智能报价计价引擎重新算账
    recalculatePricing();
    
    // 触发浮动微交互弹层
    showNotification("🔄 测算参数已恢复至当前品类基准默认值");
}

function showNotification(message) {
    // 防止重复弹窗
    const existing = document.querySelector(".gcts-notification");
    if (existing) {
        existing.remove();
    }
    
    const notify = document.createElement("div");
    notify.className = "gcts-notification";
    notify.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(notify);
    
    // 延迟添加显示类以触发动机动画
    setTimeout(() => {
        notify.classList.add("show");
    }, 50);
    
    // 2.5秒后渐隐消逝
    setTimeout(() => {
        notify.classList.remove("show");
        setTimeout(() => notify.remove(), 500);
    }, 2500);
}
