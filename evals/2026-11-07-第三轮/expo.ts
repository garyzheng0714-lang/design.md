// 测试台第二题共用数据：FBIF 2027 食品饮料创新大会 · 展商权益交付。所有参赛页面用同一份，只比布局与交互。
// 每家展商签一个套餐，套餐带一组权益；每项权益走「待提交物料 → 待审核 → 已交付」，有截止日。值可以在页面里本地改，字段不增不减。

export type Pkg = "钻石" | "金牌" | "银牌" | "展位"
export const PACKAGES: Pkg[] = ["钻石", "金牌", "银牌", "展位"]

export type RightStatus = "待提交物料" | "待审核" | "已交付"
/** 权益的流程节点，按顺序 */
export const RIGHT_FLOW: RightStatus[] = ["待提交物料", "待审核", "已交付"]

export type RightKind = "现场" | "印刷" | "线上" | "票务"
export type Right = {
  id: string
  name: string // 权益
  kind: RightKind // 类别
  status: RightStatus // 状态
  due: string // 截止日
  material: string | null // 物料（文件名）
}

export type Channel = "电话" | "微信" | "邮件" | "面谈"
export type Reminder = { date: string; channel: Channel; by: string; note: string }

export type Contact = { name: string; title: string; phone: string; email: string; wechat: string }
export type Exhibitor = {
  id: string
  company: string // 公司
  pkg: Pkg // 套餐
  owner: string // 招商负责人
  signedAt: string // 签约日期
  booth: string | null // 展位号（还没分配为 null）
  contact: Contact // 对接人
  rights: Right[] // 权益
  reminders: Reminder[] // 催办记录，新的在前
}

export const OWNERS = ["王悦", "赵一凡", "孙婷", "何川"]
export const ME = "王悦"
export const TODAY = "2026-11-06"
/** 大会日期 */
export const EVENT_DATE = "2027-04-21"

type Template = [name: string, kind: RightKind, due: string]
/** 每个套餐自带的权益与默认截止日（新增展商时照它生成） */
export const PACKAGE_RIGHTS: Record<Pkg, Template[]> = {
  钻石: [
    ["主论坛演讲", "现场", "2026-12-15"],
    ["分论坛冠名", "现场", "2026-11-30"],
    ["特装展位 54㎡", "现场", "2027-02-28"],
    ["会刊跨页广告", "印刷", "2026-11-20"],
    ["官网首页 logo", "线上", "2026-10-31"],
    ["公众号专访推文", "线上", "2027-01-15"],
    ["晚宴致辞", "现场", "2027-03-15"],
    ["嘉宾门票 20 张", "票务", "2027-03-31"],
  ],
  金牌: [
    ["分论坛演讲", "现场", "2026-12-15"],
    ["特装展位 36㎡", "现场", "2027-02-28"],
    ["会刊整页广告", "印刷", "2026-11-20"],
    ["官网 logo", "线上", "2026-10-31"],
    ["公众号推文", "线上", "2027-01-15"],
    ["嘉宾门票 10 张", "票务", "2027-03-31"],
  ],
  银牌: [
    ["圆桌嘉宾席位", "现场", "2027-01-10"],
    ["标准展位 18㎡", "现场", "2027-02-28"],
    ["会刊半页广告", "印刷", "2026-11-20"],
    ["官网 logo", "线上", "2026-10-31"],
    ["嘉宾门票 6 张", "票务", "2027-03-31"],
  ],
  展位: [
    ["标准展位 9㎡", "现场", "2027-02-28"],
    ["会刊名录", "印刷", "2026-11-05"],
    ["嘉宾门票 2 张", "票务", "2027-03-31"],
  ],
}

// [公司, 套餐, 负责人, 签约日期, 展位号, 对接人, 职位, 交付进度 0–1（大致）]
type Row = [string, Pkg, string, string, string | null, string, string, number]
const ROWS: Row[] = [
  ["禾川乳业", "钻石", "王悦", "2026-06-18", "A01", "周敏", "品牌总监", 0.6],
  ["山岚饮品", "钻石", "赵一凡", "2026-07-02", "A02", "高远", "市场副总裁", 0.35],
  ["青屿饮品", "金牌", "王悦", "2026-07-20", "B03", "林可", "市场经理", 0.3],
  ["北纬茶研", "金牌", "孙婷", "2026-07-25", "B05", "顾一宁", "品牌经理", 0.7],
  ["鲜道冷链", "金牌", "何川", "2026-08-03", "B07", "钱程", "销售总监", 0.15],
  ["植选蛋白", "金牌", "王悦", "2026-08-11", "B08", "沈佳", "市场总监", 0.5],
  ["Nordvik Foods", "金牌", "赵一凡", "2026-08-19", null, "Emma Lind", "Marketing Lead", 0.0],
  ["山麓咖啡", "银牌", "孙婷", "2026-08-22", "C02", "唐果", "品牌主理人", 0.8],
  ["朴食坊", "银牌", "王悦", "2026-08-28", "C04", "许嘉", "创始人", 0.4],
  ["甘味实验室", "银牌", "何川", "2026-09-01", "C05", "白露", "研发经理", 0.2],
  ["云岭果业", "银牌", "赵一凡", "2026-09-05", "C06", "杨帆", "电商负责人", 1],
  ["麦芽工坊", "银牌", "孙婷", "2026-09-09", "C08", "罗晨", "市场专员", 0.6],
  ["小满酸奶", "银牌", "王悦", "2026-09-12", null, "潘悦", "品牌经理", 0.0],
  ["晨露椰水", "银牌", "何川", "2026-09-16", "C11", "江涛", "渠道总监", 0.4],
  ["澄心气泡水", "银牌", "赵一凡", "2026-09-20", "C12", "夏雨", "市场经理", 0.8],
  ["沐田谷物", "展位", "孙婷", "2026-09-23", "D01", "冯博", "销售经理", 0.67],
  ["野森菌菇", "展位", "王悦", "2026-09-26", "D02", "韩梅", "总经理", 0.33],
  ["拾味调味", "展位", "何川", "2026-09-29", "D04", "曹宇", "市场主管", 1],
  ["金穗粮油", "展位", "赵一凡", "2026-10-02", "D05", "邓刚", "大客户经理", 0.33],
  ["海晏鱼业", "展位", "孙婷", "2026-10-06", "D07", "宋琪", "品牌专员", 0.0],
  ["乐蔓烘焙", "展位", "王悦", "2026-10-09", "D08", "陆遥", "创始人", 0.67],
  ["霁月茶饮", "展位", "何川", "2026-10-12", "D10", "苏晴", "运营总监", 0.33],
  ["南风果汁", "展位", "赵一凡", "2026-10-15", "D11", "程亮", "市场经理", 0.67],
  ["一禾代餐", "展位", "孙婷", "2026-10-18", null, "叶子", "品牌经理", 0.0],
  ["森氧瓶装水", "展位", "王悦", "2026-10-21", "D13", "方舟", "销售总监", 0.33],
  ["白鹭包装", "展位", "何川", "2026-10-24", "D15", "孔维", "业务经理", 0.67],
  ["清研益生菌", "展位", "赵一凡", "2026-10-27", "D16", "严晓", "研发总监", 0.33],
  ["万象食品机械", "展位", "孙婷", "2026-10-30", "D18", "季风", "华东区经理", 0.0],
]

const NOTES: Record<Channel, string[]> = {
  电话: ["电话催会刊广告终稿，对方说下周给", "确认展位搭建商，已发对接人联系方式", "提醒官网 logo 要矢量文件", "电话沟通演讲嘉宾人选，还在内部定"],
  微信: ["微信发了物料规范和截止日", "对方发来 logo 初稿，分辨率不够，已退回", "催推文素材，对方说本周内", "确认门票领取人名单格式"],
  邮件: ["邮件发送权益确认单", "邮件附上会刊广告尺寸说明", "发送展位平面图供确认"],
  面谈: ["上门拜访，过了一遍全部权益和时间表", "糖酒会现场碰面，确认演讲主题方向"],
}
const CHANNELS: Channel[] = ["电话", "微信", "邮件", "面谈"]

// 固定种子的伪随机：每次打开数据一样
let seed = 20261106
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648)
const pick = <T,>(list: T[]) => list[Math.floor(rand() * list.length)]
const addDays = (date: string, days: number) => { const d = new Date(date + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + days); return d.toISOString().slice(0, 10) }
const slug = (s: string) => s.replace(/\s+/g, "")

function makeRights(company: string, pkg: Pkg, progress: number, prefix: string): Right[] {
  const list = PACKAGE_RIGHTS[pkg]
  const done = Math.round(list.length * progress)
  // 先交付截止早的；没交付的里有一部分已经交了物料在等审核
  const order = list.map((t, i) => ({ t, i })).sort((a, b) => a.t[2].localeCompare(b.t[2]))
  const rank = new Map(order.map((o, r) => [o.i, r]))
  return list.map(([name, kind, due], i) => {
    const r = rank.get(i)!
    const status: RightStatus = r < done ? "已交付" : rand() < 0.35 ? "待审核" : "待提交物料"
    const hasFile = status !== "待提交物料" && kind !== "票务"
    return {
      id: `${prefix}-${i + 1}`,
      name,
      kind,
      status,
      due: rand() < 0.15 ? addDays(due, -7) : due,
      material: hasFile ? `${company}-${slug(name)}-v${1 + Math.floor(rand() * 3)}.${kind === "线上" ? "png" : "pdf"}` : null,
    }
  })
}

function makeReminders(owner: string, signedAt: string): Reminder[] {
  const n = Math.floor(rand() * 5)
  const out: Reminder[] = []
  let date = TODAY
  for (let i = 0; i < n; i++) {
    date = addDays(date, -(2 + Math.floor(rand() * 12)))
    if (date <= signedAt) break
    const channel = pick(CHANNELS)
    out.push({ date, channel, by: rand() < 0.8 ? owner : pick(OWNERS), note: pick(NOTES[channel]) })
  }
  return out
}

export const EXHIBITORS: Exhibitor[] = ROWS.map(([company, pkg, owner, signedAt, booth, name, title, progress], i) => {
  const id = `e${String(i + 1).padStart(2, "0")}`
  const tail = String(1000 + Math.floor(rand() * 9000))
  return {
    id,
    company,
    pkg,
    owner,
    signedAt,
    booth,
    contact: { name, title, phone: `13${Math.floor(rand() * 10)} ${tail.slice(0, 2)}${Math.floor(rand() * 90 + 10)} ${tail}`, email: `${/^[A-Za-z]/.test(company) ? company.split(" ")[0].toLowerCase() : "contact"}${i + 1}@example.com`, wechat: `wx_${id}_${tail}` },
    rights: makeRights(company, pkg, progress, id),
    reminders: makeReminders(owner, signedAt),
  }
})

// 题目场景要用到的固定值：青屿饮品的「会刊整页广告」还没交付、已经逾期前的状态清楚
{
  const qy = EXHIBITORS.find((e) => e.company === "青屿饮品")!
  const ad = qy.rights.find((r) => r.name === "会刊整页广告")!
  ad.status = "待提交物料"
  ad.material = null
  const logo = qy.rights.find((r) => r.name === "官网 logo")!
  logo.status = "待审核"
  logo.material = "青屿饮品-官网logo-v2.png"
}

/** 逾期：截止日已过还没交付 */
export const isOverdue = (r: Right, today = TODAY) => r.status !== "已交付" && r.due < today
