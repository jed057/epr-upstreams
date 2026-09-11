import { useState } from 'react';
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  Building2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  FileCheck2,
  Landmark,
  Layers3,
  MapPinned,
  PackageCheck,
  Recycle,
  ShieldCheck,
  Truck,
  Users,
  X,
} from 'lucide-react';

type Role = {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  use: string;
  tone: 'navy' | 'blue' | 'amber' | 'violet' | 'green' | 'neutral';
  icon: typeof Building2;
};

const roles: Record<string, Role> = {
  r2: {
    id: 'R2',
    title: '超威',
    subtitle: '品牌方 / 生产者',
    detail: 'EPR 责任主体，川渝销售全量由恒驰源大仓托管。',
    use: '查看溯源、台账、回收率与服务费账单',
    tone: 'blue',
    icon: FactoryIcon,
  },
  r1: {
    id: 'R1',
    title: '恒驰源',
    subtitle: '全量托管大仓 · 一级代理 · 川渝分销',
    detail: '平台主使用方，也是货物与资金的双重中枢。',
    use: '采购垫资、进销存、授信应收、调度、合规与结算',
    tone: 'navy',
    icon: Building2,
  },
  r34: {
    id: 'R3 + R4',
    title: '销售网点 = 收集网点',
    subtitle: '约 2,000 家 · 一套账号 · 两个业务身份',
    detail: '正向从大仓小批量进货，逆向负责源头回收与安全暂存。',
    use: '小额下单、查流向、APP 扫码回收、阈值预警',
    tone: 'blue',
    icon: StoreIcon,
  },
  r11: {
    id: 'R11',
    title: '产废单位 / 终端用户',
    subtitle: '电池使用与更换源头',
    detail: '产生废旧电池，由回收环节扫码登记带入系统。',
    use: '以旧换新、维修更换，形成回收来源记录',
    tone: 'neutral',
    icon: Users,
  },
  r5: {
    id: 'R5',
    title: '资源回收个体户',
    subtitle: '散户直收 · 上游供货方',
    detail: '与网点回收并行，直接向集中收集企业交售。',
    use: '供货登记、身份采集、代开发票与货款结算',
    tone: 'violet',
    icon: Recycle,
  },
  r6: {
    id: 'R6',
    title: '集中收集 / 贮存企业',
    subtitle: '集中转运点 · 由 R1 自建危废仓承担',
    detail: 'R4 与 R5 的逆向货物流最终汇入此处。',
    use: '归集入库、库位管理、联单规则、期限与容量监控',
    tone: 'amber',
    icon: Boxes,
  },
  r8: {
    id: 'R8',
    title: '收运方',
    subtitle: '自有合规车辆 / 合作车队',
    detail: '负责危废转运、交接与轨迹回填。',
    use: '移动端接单、运输交接、GPS 轨迹回传',
    tone: 'amber',
    icon: Truck,
  },
  r7: {
    id: 'R7',
    title: '白名单处置企业',
    subtitle: '终端合规处置',
    detail: '接收废电池并回传最终处置凭证。',
    use: '处置回执回传，完成末端核销',
    tone: 'amber',
    icon: ShieldCheck,
  },
};

function FactoryIcon(props: { size?: number; strokeWidth?: number }) {
  return <Landmark {...props} />;
}

function StoreIcon(props: { size?: number; strokeWidth?: number }) {
  return <PackageCheck {...props} />;
}

function RoleCard({ role, onSelect, compact = false }: { role: Role; onSelect: (role: Role) => void; compact?: boolean }) {
  const Icon = role.icon;
  return (
    <button type="button" className={`role-card ${role.tone} ${compact ? 'compact' : ''}`} onClick={() => onSelect(role)}>
      <span className="role-icon"><Icon size={compact ? 18 : 22} strokeWidth={1.8} /></span>
      <span className="role-copy">
        <span className="role-id">{role.id}</span>
        <strong>{role.title}</strong>
        <small>{role.subtitle}</small>
      </span>
      {!compact && <ChevronRight className="card-chevron" size={18} />}
    </button>
  );
}

function FlowArrow({ label, tone = 'blue', direction = 'right' }: { label: string; tone?: string; direction?: 'right' | 'down' }) {
  return (
    <div className={`flow-arrow ${tone} ${direction}`}>
      <span>{label}</span>
      {direction === 'down' ? <ArrowDown size={17} /> : <ArrowRight size={17} />}
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState<Role | null>(null);

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /> EPR · 业务架构总览</div>
          <h1>平台业务角色与链路全景</h1>
          <p>以恒驰源为核心，串联正向销售、逆向回收与合规处置，清晰呈现货物流、资金流与数据流。</p>
        </div>
        <div className="header-meta">
          <span className="version-tag">SCOPE V8</span>
          <span>2026.09.10</span>
        </div>
      </header>

      <section className="legend-bar" aria-label="图例">
        <span className="legend-title">链路图例</span>
        <span><i className="legend-line goods" />货物流</span>
        <span><i className="legend-line money" />资金流</span>
        <span><i className="legend-line data" />核销回传</span>
        <span className="legend-note"><BadgeCheck size={15} /> 点击角色卡片查看平台职责</span>
      </section>

      <section className="diagram-panel">
        <div className="section-heading">
          <div><span className="section-kicker">01 / 正向业务</span><h2>全量托管 · 单一销售通路</h2></div>
          <span className="section-description">所有经销商统一从恒驰源大仓进货，形成可控的销售与追溯闭环</span>
        </div>

        <div className="forward-grid">
          <RoleCard role={roles.r2} onSelect={setSelected} />
          <FlowArrow label="成品电池入仓" />
          <RoleCard role={roles.r1} onSelect={setSelected} />
          <FlowArrow label="统一分拣配送" />
          <RoleCard role={roles.r34} onSelect={setSelected} />
          <FlowArrow label="终端销售 / 使用" />
          <RoleCard role={roles.r11} onSelect={setSelected} />
        </div>

        <div className="money-strip">
          <span><CircleDollarSign size={15} /> R1 向 R2 采购垫资：底价 400 / 预付 420</span>
          <span><CircleDollarSign size={15} /> R3 + R4 小批量进货：可配置账期</span>
          <span><CircleDollarSign size={15} /> R2 向 R1 支付仓储 / 分拣 / 配送服务费</span>
        </div>

        <div className="forward-footnote"><ArrowLeftRight size={17} /> 全量销售数据沉淀至平台，自动形成 EPR 合规基数与回收任务</div>
      </section>

      <section className="diagram-panel reverse-panel">
        <div className="section-heading">
          <div><span className="section-kicker amber-text">02 / 逆向业务</span><h2>两条并行回收通路 · 最终汇入 R6</h2></div>
          <span className="section-description">网点回收与散户直收分开表达，避免角色职责与流向混淆</span>
        </div>

        <div className="reverse-source">
          <RoleCard role={roles.r11} onSelect={setSelected} />
          <div className="split-arrows">
            <div className="split-branch">
              <span>以旧换新 / 维修更换</span>
              <ArrowDown size={18} />
            </div>
            <div className="split-branch">
              <span>卖给上门收购个体户</span>
              <ArrowDown size={18} />
            </div>
          </div>
        </div>
        <div className="reverse-lanes">
          <div className="lane lane-left">
            <div className="lane-label"><span>通路 01</span> 网点回收 <small>政策主渠道</small></div>
            <RoleCard role={roles.r34} onSelect={setSelected} compact />
            <div className="lane-caption"><ClipboardCheck size={15} /> APP 扫码 · 数量 / 重量 / 状态 · ≤3 吨 / ≤90 天</div>
          </div>
          <div className="lane lane-right">
            <div className="lane-label"><span>通路 02</span> 散户直收 <small>个体户</small></div>
            <RoleCard role={roles.r5} onSelect={setSelected} compact />
            <div className="lane-caption"><FileCheck2 size={15} /> 身份采集 · 代开发票 · 代付货款</div>
          </div>
        </div>
        <div className="merge-line"><span>两条通路均直接交售至 R6，不经过彼此转手</span><ArrowDown size={18} /></div>
        <div className="hub-row"><RoleCard role={roles.r6} onSelect={setSelected} /></div>
        <div className="compliance-callout"><ShieldCheck size={17} /><span><strong>合规控制点</strong> 分类判断联单 · 监控库龄 ≤ 1 年 · 存量不超过设计容量</span></div>

        <div className="disposal-flow">
          <RoleCard role={roles.r8} onSelect={setSelected} compact />
          <FlowArrow label="合规转运" tone="amber" />
          <RoleCard role={roles.r7} onSelect={setSelected} compact />
          <FlowArrow label="处置凭证回传" tone="green" />
          <div className="close-card"><span><ShieldCheck size={20} /></span><strong>核销闭环</strong><small>回收率达成 · 回传 R2</small></div>
        </div>
      </section>

      <section className="support-panel">
        <div className="support-heading"><span className="section-kicker">03 / 全程支撑</span><h2>平台运营与外部协同</h2><span>按使用边界区分“平台用户”与“数据接收方”</span></div>
        <div className="support-grid">
          <RoleCard role={{ ...roles.r1, subtitle: '平台运营方 · 七重业务身份', use: '统筹全链路运营、权限、报表、台账与数据上报' }} onSelect={setSelected} compact />
          <RoleCard role={{ id: 'R12', title: '企业管理层', subtitle: '经营决策者', detail: '通过经营数据掌握业务与资金运行情况。', use: '查看报表、看板、回收率与垫资占用', tone: 'neutral', icon: BarChart3 }} onSelect={setSelected} compact />
          <RoleCard role={{ id: 'R13', title: '第三方审计 / 稽查方', subtitle: '外部查证角色', detail: '必要时调取全流程合规凭证。', use: '查证存证记录与处置回执', tone: 'neutral', icon: FileCheck2 }} onSelect={setSelected} compact />
          <RoleCard role={{ id: 'R9', title: '银行 / 税务 / 银联', subtitle: '外部结算协同方', detail: '不直接使用本平台。', use: '承接资金结算、开票与税务处理', tone: 'neutral', icon: Landmark }} onSelect={setSelected} compact />
          <RoleCard role={{ id: 'R10', title: '政府监管部门', subtitle: '外部数据接收方', detail: '不直接使用本平台。', use: '接收上报数据，开展监管与考核', tone: 'neutral', icon: MapPinned }} onSelect={setSelected} compact />
        </div>
      </section>

      <footer className="page-footer"><span><Layers3 size={15} /> 角色定义基于“一（正文）、平台业务角色定义”</span><span>数据流以平台留痕，资金流以对账核销，货物流以唯一溯源码贯通</span></footer>

      {selected && <div className="detail-overlay" role="presentation" onClick={() => setSelected(null)}>
        <aside className={`detail-drawer ${selected.tone}`} role="dialog" aria-modal="true" aria-label={`${selected.id} 角色详情`} onClick={(event) => event.stopPropagation()}>
          <button type="button" className="close-button" onClick={() => setSelected(null)} aria-label="关闭"><X size={20} /></button>
          <div className="drawer-icon"><selected.icon size={28} strokeWidth={1.8} /></div>
          <span className="drawer-id">{selected.id}</span>
          <h2>{selected.title}</h2>
          <p className="drawer-subtitle">{selected.subtitle}</p>
          <div className="drawer-block"><span>角色定位</span><p>{selected.detail}</p></div>
          <div className="drawer-block"><span>平台使用重点</span><p>{selected.use}</p></div>
          <div className="drawer-tip"><PackageCheck size={17} /> 点击页面空白处可关闭详情</div>
        </aside>
      </div>}
    </main>
  );
}

export default App;
