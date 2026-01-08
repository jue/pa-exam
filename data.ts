import { Question } from './types';

// Data parsed from the provided text with analyzed answers
export const EXAM_DATA: Question[] = [
  // --- 单选题 ---
  {
    id: '3',
    originalNo: '3',
    type: 'single',
    content: '自有物业应选用（ ）暖气片。',
    options: ['A. 钢制管式', 'B. 铸铁型', 'C. 铜铝复合型', 'D. 铸铝型'],
    answer: 'C'
  },
  {
    id: '4',
    originalNo: '4',
    type: 'single',
    content: '卫生间通风系数（ ）次/小时。',
    options: ['A. 10', 'B. 15', 'C. 18', 'D. 20'],
    answer: 'A'
  },
  {
    id: '5',
    originalNo: '5',
    type: 'single',
    content: '空调风管及全热交换器风管保温采用（ ）。',
    options: ['A. 银纸', 'B. 棉花', 'C. 闭孔橡塑', 'D. 帆布'],
    answer: 'C'
  },
  {
    id: '6',
    originalNo: '6',
    type: 'single',
    content: '关于职场规划，下列论述不正确的是：（ ）。',
    options: [
      'A. 对已有职场应精确认到的具体事项（租赁、装修、IT、家具、日常运维等），并与职场预算相对应',
      'B. 应做好需求合理性评估及优先级管理，实现职场资源有效配置',
      'C. 由专业公司总部和二级机构编制，与三四级机构无关',
      'D. 当职场规划涉及大幅变化调整时，应提前半年上报集团财务部'
    ],
    answer: 'C'
  },
  {
    id: '7',
    originalNo: '7',
    type: 'single',
    content: '分支机构职场消防安全第一责任人是（ ）。',
    options: ['A. 行政部经理', 'B. 职场管理员', 'C. 机构负责人', 'D. 消防系统施工单位负责人'],
    answer: 'C'
  },
  {
    id: '8',
    originalNo: '8',
    type: 'single',
    content: '成为职场管理系统的操作人员，需要通过下述哪项考核？',
    options: ['A. CAD绘图测试', 'B. 二级建造师认证考试', 'C. 职场管理员认证考试', 'D. 设计师认证考核'],
    answer: 'C'
  },
  {
    id: '9',
    originalNo: '9',
    type: 'single',
    content: '按照《职场管理制度》，原则上应避免签订有哪个条件的租赁合同：（ ）。',
    options: [
      'A. 租赁时间为3年',
      'B. 按照建筑面积计算租金',
      'C. 按照每季度进行租金支付',
      'D. 有复原责任以及有不公平退租、转租条件'
    ],
    answer: 'D'
  },
  {
    id: '10',
    originalNo: '10',
    type: 'single',
    content: '集中租赁项目在系统上市场租金对比取值顺序是（ ）。',
    options: [
      'A. 楼宇-行政区-商圈-城市',
      'B. 楼宇-商圈-行政区-城市',
      'C. 行政区-商圈-城市-楼宇',
      'D. 城市-楼宇-行政区-商圈'
    ],
    answer: 'A'
  },
  {
    id: '11',
    originalNo: '11',
    type: 'single',
    content: '大行提供备选物业后，机构使用部门提出看房需求，该如何操作（ ）。',
    options: [
      'A. 使用部门自行看房',
      'B. 机构带使用部门看房',
      'C. 通知大行，由大行带着或经大行联络业主后安排机构使用部门看房'
    ],
    answer: 'C'
  },
  {
    id: '12',
    originalNo: '12',
    type: 'single',
    content: '职场租赁原则（ ）。',
    options: [
      'A. 内租优先、外租过渡、临时共享',
      'B. 内租布满、外租过渡、临时共享',
      'C. 外租优先、内租过渡、临时共享'
    ],
    answer: 'A'
  },
  {
    id: '13',
    originalNo: '13',
    type: 'single',
    content: '属于集中租赁的项目，机构如有合适的备选物业该如何操作（ ）。',
    options: [
      'A. 推荐给大行，纳入备选物业打分排名中',
      'B. 自行看房谈判签约',
      'C. 机构不可推荐备选物业'
    ],
    answer: 'A'
  },
  {
    id: '14',
    originalNo: '14',
    type: 'single',
    content: '某集中租赁项目，机构对大行谈判情况不满意，该怎么做？（ ）。',
    options: [
      'A. 跳脱大行，不予理睬，独自完成谈判签约',
      'B. 找其他熟悉的中介完成选址谈判合同签约',
      'C. 主动找其他集团委托的大行，完成选址签约谈判',
      'D. 及时告知总部和集团，找到问题，解决问题'
    ],
    answer: 'D'
  },
  {
    id: '15',
    originalNo: '15',
    type: 'single',
    content: '集中租赁项目的租赁合同由哪方拟定（ ）。',
    options: ['A. 大行', 'B. 机构', 'C. 业主'],
    answer: 'A'
  },
  {
    id: '16',
    originalNo: '16',
    type: 'single',
    content: '租金个案咨询服务的覆盖范围是（ ）。',
    options: [
      'A. 市场租金数据覆盖区域，拟租赁物业年租金（含年物业费）< 50万元；市场租金数据未覆盖区域，且拟租赁物业年租金（含年物业费）> 300万元。',
      'B. 市场租金数据覆盖区域，拟租赁物业年租金（含年物业费）> 50万元，按照与职场系统中市场租金数据的楼宇/行政区/市的租金单价进行比照（比照优先级：同楼宇价格 > 同行政区价格 > 全市价格），单价超过市场租金数据参考范围的，需发起租金个案咨询。',
      'C. 市场租金数据覆盖区域，拟租赁物业年租金（含年物业费）> 50万元；市场租金数据覆盖区域，拟租赁物业年租金（含年物业费）≤ 50万元，按照与职场系统中市场租金数据的楼宇/行政区/市的租金单价进行比照（比照优先级：同楼宇价格 > 同行政区价格 > 全市价格），单价超过市场租金数据参考范围的，需发起租金个案咨询；市场租金数据未覆盖区域，且拟租赁物业年租金（含年物业费）> 300万元。'
    ],
    answer: 'C'
  },
  {
    id: '17',
    originalNo: '17',
    type: 'single',
    content: '职场运维管理工作包括哪些方面（ ）。',
    options: [
      'A. 职场消防安全管理、职场环境管理、职场现场管理',
      'B. 职场安全管理、职场设施管理、职场空间管理',
      'C. 职场消防安全管理、职场设施管理、职场现场和空间管理',
      'D. 职场健康安全管理、职场设施管理、职场现场和空间管理'
    ],
    answer: 'C'
  },
  {
    id: '18',
    originalNo: '18',
    type: 'single',
    content: '关于职场安保工作，以下说法错误的是（ ）。',
    options: [
      'A. 建立职场来访人员登记制度和物品放行登记制度，对进入职场的人员和搬离职场的物品无需管控',
      'B. 严禁携带易燃、易爆或其它有安全隐患的物品进入职场',
      'C. 建立保安员定时巡查制度，发现可疑人员或安全隐患应及时报告相关人员',
      'D. 根据管理区域特点和现场情况制定预防和处理上访等突发事件的工作预案'
    ],
    answer: 'A'
  },
  {
    id: '19',
    originalNo: '19',
    type: 'single',
    content: '管理职场大堂背景墙LOGO标识橙色字体高度（ ）。',
    options: ['A. 150mm', 'B. 160mm', 'C. 180mm', 'D. 200mm'],
    answer: 'A'
  },
  {
    id: '20',
    originalNo: '20',
    type: 'single',
    content: '管理职场大堂、走廊灯具为（ ）。',
    options: [
      'A. 600*600mm LED灯盘',
      'B. 筒灯',
      'C. 600*1200mm LED灯盘',
      'D. 600*600mm 光管灯盘'
    ],
    answer: 'A'
  },
  {
    id: '21',
    originalNo: '21',
    type: 'single',
    content: '管理职场茶水间墙面材质（ ）。',
    options: [
      'A. 300*300mm 墙砖',
      'B. 防水乳胶漆',
      'C. 300*600mm 墙砖',
      'D. 300*600mm 墙砖（横向3*3 V字缝）'
    ],
    answer: 'D'
  },
  {
    id: '22',
    originalNo: '22',
    type: 'single',
    content: '管理职场地面铺贴材料必须要做自流平的是（ ）。',
    options: ['A. 地毯', 'B. 瓷砖', 'C. 石材', 'D. 地胶板'],
    answer: 'D'
  },
  {
    id: '23',
    originalNo: '23',
    type: 'single',
    content: '管理职场会议室灯具不包含以下哪种（ ）。',
    options: [
      'A. 600*600mm LED灯盘',
      'B. 筒灯',
      'C. 暗藏灯带',
      'D. LED吊线长条灯'
    ],
    answer: 'A'
  },
  {
    id: '24',
    originalNo: '24',
    type: 'single',
    content: '按照平安CI制作要求，公司法定名称、分公司名称所用字体为（ ）。',
    options: ['A. 宋体', 'B. 方正简体黑体', 'C. 方正姚体', 'D. 方正圆体'],
    answer: 'D'
  },
  {
    id: '25',
    originalNo: '25',
    type: 'single',
    content: '形象墙“中国平安PINGAN”当中，“安”与“P”之间的距离是（ ）。',
    options: ['A. 100mm', 'B. 112mm', 'C. 120mm', 'D. 130mm'],
    answer: 'B'
  },
  {
    id: '26',
    originalNo: '26',
    type: 'single',
    content: '超五类网络一般以箱为单位订购，每箱网线的长度为：（ ）。',
    options: ['A. 295M', 'B. 305M', 'C. 200M', 'D. 150M'],
    answer: 'B'
  },
  {
    id: '27',
    originalNo: '27',
    type: 'single',
    content: '职场配线间工程建设时可以参照以下标准：（ ）。',
    options: [
      'A. 《视频会议技术标准》',
      'B. 《PC服务器技术标准》',
      'C. 《综合布线与机房工程技术标准》',
      'D. 《移动邮件管理规范》'
    ],
    answer: 'C'
  },
  {
    id: '28',
    originalNo: '28',
    type: 'single',
    content: '下列哪项不属于水平子系统的设计内容（ ）。',
    options: ['A. 布线路由设计', 'B. 管槽设计', 'C. 设备安装调试', 'D. 线缆类型选择、布线材料计算'],
    answer: 'C'
  },
  {
    id: '29',
    originalNo: '29',
    type: 'single',
    content: '多少点以上规模的综合布线项目需要单独招标？',
    options: ['A. 100', 'B. 150', 'C. 200', 'D. 250'],
    answer: 'C'
  },
  {
    id: '30',
    originalNo: '30',
    type: 'single',
    content: '天花吊杆间距应为（ ）。',
    options: ['A. 0.5至0.8米', 'B. 0.8至1米', 'C. 1至1.2米', 'D. 1.2至1.5米'],
    answer: 'C'
  },
  {
    id: '31',
    originalNo: '31',
    type: 'single',
    content: '轻钢龙骨主龙骨间距不得超过（ ）。',
    options: ['A. 0.8米', 'B. 1.0米', 'C. 1.2米', 'D. 1.5米'],
    answer: 'C'
  },
  {
    id: '32',
    originalNo: '32',
    type: 'single',
    content: '职场建设要求灯具电线截面面积应为（ ）。',
    options: ['A. 1.5平方毫米', 'B. 2.5平方毫米', 'C. 4平方毫米', 'D. 6平方毫米'],
    answer: 'B'
  },
  {
    id: '33',
    originalNo: '33',
    type: 'single',
    content: '职场建设要求插座电线截面面积应为（ ）。',
    options: ['A. 1.5平方毫米', 'B. 2.5平方毫米', 'C. 4平方毫米', 'D. 6平方毫米'],
    answer: 'C'
  },
  {
    id: '34',
    originalNo: '34',
    type: 'single',
    content: '甲方作为项目建设的一个参与方，甲方的项目管理工作涉及（ ）全程。',
    options: [
      'A. 设计前的准备阶段至保修期',
      'B. 设计阶段至动用前的准备阶段',
      'C. 设计前的准备阶段至动用前的准备阶段',
      'D. 设计阶段至保修期'
    ],
    answer: 'A'
  },
  {
    id: '35',
    originalNo: '35',
    type: 'single',
    content: '给水管安装好封闭前必须做（ ）。',
    options: ['A. 打压试验', 'B. 灌水试验', 'C. 通球试验', 'D. 闭水试验'],
    answer: 'A'
  },
  {
    id: '36',
    originalNo: '36',
    type: 'single',
    content: '职场运营多久后方可申请竣工验收（ ）。',
    options: ['A. 不限', 'B. 一个月', 'C. 两个月', 'D. 三个月'],
    answer: 'D'
  },
  {
    id: '37',
    originalNo: '37',
    type: 'single',
    content: '哪种电气设备必须安装带漏电保护装置的空气开关（ ）。',
    options: ['A. 照明', 'B. 空调', 'C. 插座', 'D. 应急照明'],
    answer: 'C'
  },
  {
    id: '38',
    originalNo: '38',
    type: 'single',
    content: '检测墙面垂直度、平整度的工具为（ ）。',
    options: ['A. 水平靠尺、楔形塞尺', 'B. 卷尺', 'C. 钢尺', 'D. 卷线器'],
    answer: 'A'
  },
  {
    id: '39',
    originalNo: '39',
    type: 'single',
    content: '正确的结算阶段流程是：（ ）。',
    options: [
      'A. 工程经各方竣工验收合格→职场管理员整理全套竣工结算资料→机构职场部门结算审核，出具结算报告→二级机构向承包单位结算支付',
      'B. 工程经各方竣工验收合格→各承包单位提交竣工结算资料→机构职场部门结算审核，出具结算报告→二级机构向承包单位结算支付',
      'C. 工程经各方竣工验收合格→各承包单位提交竣工结算资料→职场管理员整理全套竣工结算资料→机构职场部门结算审核，出具结算报告→职场管理督导室或专业公司财务部进行结算报告审批→二级机构向承包单位结算支付',
      'D. 工程经各方竣工验收合格→职场管理员整理全套竣工结算资料→机构职场部门结算审核，出具结算报告→职场管理督导室或专业公司财务部进行结算报告审批→二级机构向承包单位结算支付'
    ],
    answer: 'C'
  },
  {
    id: '40',
    originalNo: '40',
    type: 'single',
    content: '未经采购中心审定结算报告的职场装修工程，专业公司二级机构支付的进度款不得超过工程合同价款的（ ）。',
    options: ['A. 70%', 'B. 80%', 'C. 85%', 'D. 90%'],
    answer: 'B'
  },
  {
    id: '41',
    originalNo: '41',
    type: 'single',
    content: '工程结算审核，主要的工作内容是：核对合同条款、检查隐蔽验收记录、落实设计变更签证、验收项目整改情况、核实工程数量、（ ）。',
    options: [
      'A. 查看平面图布局',
      'B. 核对主要材料品牌',
      'C. 进行结算审核，出具结算报告',
      'D. 查看投标保证金收据扫描件'
    ],
    answer: 'C'
  },
  {
    id: '42',
    originalNo: '42',
    type: 'single',
    content: '关于工程价款支付约定，正确的是（ ）。',
    options: [
      'A. 合同生效后，工程形象进度达到总工程量的50%时，甲方支付合同总价款的50%为工程进度款；工程形象进度达到总工程量的100%时，甲方支付合同总价款的45%为工程进度款；工程款支付累计达合同总价款的95%后，其余工程款待竣工验收合格并取得当地消防监管部门要求的相关手续和文件，完成结算后15日内支付，并扣除质量保证金。',
      'B. 完成工程量的100%，甲方向乙方支付第一笔工程进度款，为本合同总金额的95%；工程竣工验收合格，乙方按要求提供点位测试报告和主要材料原厂证明，完成结算后，甲方向乙方支付合同总价款的5%。',
      'C. 工程形象进度达到总工程量的50%时，甲方向乙方支付合同总价款的50%；工程形象进度达到总工程量的100%时，甲方向乙方支付合同总价款的35%；工程款支付累计达合同总价款的85%后，其余工程款待竣工验收合格并取得当地消防监管部门要求的相关手续和文件，完成结算后15日内支付，并扣除质量保证金。',
      'D. 每月月底按实际完成工程量的85%甲方向乙方支付工程款，累计支付工程款达到合同工程价款的80%时停止支付；工程竣工验收合格，乙方按要求提供点位测试报告和主要材料原厂证明，完成结算后，甲方向乙方支付合同总价款的15%；合同余款为合同工程价款的5%，作为质量保证金，保修期满后一次性付清。'
    ],
    answer: 'A'
  },
  {
    id: '43',
    originalNo: '43',
    type: 'single',
    content: '家具采购中，家具供应商所提供产品的产品保修期为自验收完成之日起（ ）。',
    options: ['A. 一年', 'B. 二年', 'C. 三年', 'D. 五年'],
    answer: 'D'
  },
  {
    id: '44',
    originalNo: '44',
    type: 'single',
    content: '综合布线施工中，六类双绞线适用（ ）。',
    options: [
      'A. 各类型职场无线AP点位',
      'B. 各类型职场所有点位',
      'C. 总部及大型管理职场（800内勤人力以上）无线AP点位',
      'D. 总部及大型管理职场（800内勤人力以上）所有点位'
    ],
    answer: 'D'
  },
  {
    id: '45',
    originalNo: '45',
    type: 'single',
    content: '第三方主材平台上线后，由（ ）向第三方主材平台下单采购。',
    options: [
      'A. 总部职场管理员',
      'B. 使用机构职场管理员',
      'C. 施工单位',
      'D. 平安内部任一员工'
    ],
    answer: 'C'
  },
  {
    id: '46',
    originalNo: '46',
    type: 'single',
    content: '家具交货时，家具供应商应向机构收货人确认安装现场具备安装条件，并应在产品送达机构指定地点后（ ）天之内免费完成安装（超过30万元的项目，安装时间双方可另行约定）。',
    options: ['A. 3个工作日', 'B. 4个工作日', 'C. 5个工作日', 'D. 7个工作日'],
    answer: 'A'
  },
  {
    id: '47',
    originalNo: '47',
    type: 'single',
    content: '家具板式产品验收项目包含（ ）。',
    options: [
      'A. 封边、面板与基材等用胶处无脱胶、起泡、无划痕',
      'B. 焊接处无脱焊',
      'C. 麻布缝线均匀',
      'D. 防锈层无脱落'
    ],
    answer: 'A'
  },

  // --- 多选题 ---
  {
    id: '48',
    originalNo: '48',
    type: 'multiple',
    content: '智慧职场系统中包含哪些常用模块？',
    options: ['A. 立项列表', 'B. 职场列表', 'C. 履约列表', 'D. 支付列表'],
    answer: 'ABCD'
  },
  {
    id: '49',
    originalNo: '49',
    type: 'multiple',
    content: '照明环境的主要特性指标有（ ）。',
    options: ['A. 照度指标', 'B. 色温指标', 'C. 眩光值指标', 'D. 价格指标'],
    answer: 'ABC'
  },
  {
    id: '50',
    originalNo: '50',
    type: 'multiple',
    content: '管理职场应该按照三区分离原则进行设计，三区分离是指哪些区域：（ ）。',
    options: ['A. 接待区', 'B. 办公区', 'C. 茶水间', 'D. 会议区'],
    answer: 'ABD'
  },
  {
    id: '51',
    originalNo: '51',
    type: 'multiple',
    content: '职场租赁管理的目标是什么？',
    options: [
      'A. 统一规范职场租赁行为',
      'B. 加强投产意识',
      'C. 实现成本合理',
      'D. 租赁风险可控',
      'E. 支持业务发展'
    ],
    answer: 'ACDE'
  },
  {
    id: '52',
    originalNo: '52',
    type: 'multiple',
    content: '职场选址应尽量避免在（ ）附近。',
    options: [
      'A. 地铁口、公交站',
      'B. 娱乐性场所',
      'C. 城市行政中心、商务中心',
      'D. 各类污染源及辐射源'
    ],
    answer: 'BD'
  },
  {
    id: '53',
    originalNo: '53',
    type: 'multiple',
    content: '下列关于职场消防与安全说法正确的是？',
    options: [
      'A. 职场使用单位应关注设备的安全使用，适当张贴相关的安全警示标识。',
      'B. 职场使用单位应建立职场消防安全工作细则，定期进行消防安全检查、消防设备检查与消防安全宣传教育。',
      'C. 职场使用单位需要熟悉灭火器的位置，手提式灭火器及消火栓应放在隐蔽的位置。',
      'D. 办公职场应确保办公区域整洁、干净、且有足够的照明，工位下方没有堆放纸盒与易燃的物品。'
    ],
    answer: 'ABD'
  },
  {
    id: '54',
    originalNo: '54',
    type: 'multiple',
    content: '管理职场哪些区域天花主材为矿棉板（ ）。',
    options: ['A. 大堂', 'B. 敞开办公区', 'C. 机房', 'D. 培训室'],
    answer: 'BD'
  },
  {
    id: '55',
    originalNo: '55',
    type: 'multiple',
    content: '干扰无线WIFI信号的干扰源主要有（ ）。',
    options: ['A. 微波炉', 'B. 手机', 'C. 支持蓝牙的设备', 'D. 跳频扩频无线网', 'E. 临近的无线网'],
    answer: 'ABCE'
  },
  {
    id: '56',
    originalNo: '56',
    type: 'multiple',
    content: '轻钢龙骨主件为（ ）。',
    options: ['A. 沿顶龙骨', 'B. 沿地龙骨', 'C. 竖向龙骨', 'D. 横撑龙骨', 'E. 契合龙骨'],
    answer: 'ABCD'
  },
  {
    id: '57',
    originalNo: '57',
    type: 'multiple',
    content: '关于装修工程天花吊顶项目以下哪几种说法是正确的（ ）。',
    options: [
      'A. 吊顶封板可使用小碎块板材拼接',
      'B. 吊顶标高与梁底标高相等时，龙骨与梁底齐平，石膏板穿过梁底',
      'C. 天花吊顶大面积石膏板需错缝封板',
      'D. 天花吊顶转角部位面层石膏板需整张铺设（切割成L型），不得在转角部位接缝'
    ],
    answer: 'CD'
  },
  {
    id: '58',
    originalNo: '58',
    type: 'multiple',
    content: '关于塑胶地板，以下哪几种说法是正确的（ ）。',
    options: [
      'A. 表面平整度允许偏差值为2毫米',
      'B. 接缝高低差允许偏差值为0.5毫米',
      'C. 缝格平直度允许偏差值为1毫米',
      'D. 踢脚缝上口平直度允许偏差值为1毫米'
    ],
    answer: 'BCD'
  },
  {
    id: '59',
    originalNo: '59',
    type: 'multiple',
    content: '游标卡尺可用来检测哪几种材料（ ）。',
    options: ['A. 玻璃厚度', 'B. 天花矿棉板厚度', 'C. 电线线径', 'D. 瓷砖缝隙大小'],
    answer: 'ABCD'
  },
  {
    id: '60',
    originalNo: '60',
    type: 'multiple',
    content: '根据职场管理办法和专业公司规定，不得列入室内装修工程结算的项目有：（ ）。',
    options: [
      'A. 外墙、外窗等属于室外装饰工程的项目',
      'B. 职场美化布置需求（如字画、照片、盆景等）',
      'C. 新做或升级通风空调工程',
      'D. 分体空调铜管延长',
      'E. 新做或升级消防工程、通风空调工程'
    ],
    answer: 'ABCDE'
  },
  {
    id: '61',
    originalNo: '61',
    type: 'multiple',
    content: '适用于管理类和作业类职场培训室使用的甲指乙购材料包括（ ）。',
    options: [
      'A. 矿棉板',
      'B. LED灯盘600*600',
      'C. PVC多层复合地胶板-浅色',
      'D. PVC底方块地毯'
    ],
    answer: 'BC'
  },

  // --- 判断题 ---
  {
    id: '62',
    originalNo: '62',
    type: 'judgment',
    content: '职场租赁时间为3-5年应采用PERT地暖。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'B'
  },
  {
    id: '63',
    originalNo: '63',
    type: 'judgment',
    content: '如果职场提前退租，需要在职场系统中走退租立项，完成退租操作流程。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '64',
    originalNo: '64',
    type: 'judgment',
    content: '智慧职场系统中，租赁合同在印章系统用印完成后，无需任何操作，职场系统合同状态即为已生效。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'B'
  },
  {
    id: '65',
    originalNo: '65',
    type: 'judgment',
    content: '只有取得“职场管理员认证证书”的职场管理员才能够提交租赁签报。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '66',
    originalNo: '66',
    type: 'judgment',
    content: '市场租金数据参考价格可以在财智云>职场管理>通用>资源共享>市场租金数据界面查询。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '67',
    originalNo: '67',
    type: 'judgment',
    content: '能在租金查询报表中查到参考价格，仍需要启用租金咨询服务。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '68',
    originalNo: '68',
    type: 'judgment',
    content: '对承租方而言，必须与具有产权证明文件的业主或其委托人签署租赁合同。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '69',
    originalNo: '69',
    type: 'judgment',
    content: '退租是指合同租期内全部已租面积提前解约。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '70',
    originalNo: '70',
    type: 'judgment',
    content: '相同使用率下，写字楼平面布局设计和空间排列是否合理，直接影响到办公空间是否能够被有效利用。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '71',
    originalNo: '71',
    type: 'judgment',
    content: '职场使用单位应做好职场污染防治工作，职场环境各项检测指标尚未合格但因业务紧急需要时也可投入使用。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'B'
  },
  {
    id: '72',
    originalNo: '72',
    type: 'judgment',
    content: '不同类型的业务职场须符合相关金融监管等政府主管单位的要求。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '74',
    originalNo: '74',
    type: 'judgment',
    content: '管理职场机房地面材质可选防静电架空地板。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '75',
    originalNo: '75',
    type: 'judgment',
    content: '管理职场轻钢龙骨隔墙需到楼层顶端。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '51-miss',
    originalNo: '51', 
    type: 'judgment',
    content: '按照平安CI制作要求，公司法定名称所用字体为方正圆体。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '50-miss',
    originalNo: '50',
    type: 'judgment',
    content: '为保障办公网络无线信号覆盖效果，在预算允许的范围内无线AP安装越多越好。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'B'
  },
  {
    id: '49-miss',
    originalNo: '49',
    type: 'judgment',
    content: '超五类网线的最大传输速率是10G。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'B'
  },
  {
    id: '48-miss',
    originalNo: '48',
    type: 'judgment',
    content: '非网管的交换机允许接入公司网络。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'B'
  },
  {
    id: '47-miss',
    originalNo: '47',
    type: 'judgment',
    content: '在装修过程中产生的设计变更、现场签证，需先报备甲方职场相关部门确认后方可实施。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '46-miss',
    originalNo: '46',
    type: 'judgment',
    content: '清单内容仅做参考，施工方在投标报价时应仔细核对现场、施工图及工程量清单，漏报或少报的项目视为已经包含在投标报价中。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '83',
    originalNo: '83',
    type: 'judgment',
    content: '合同内工作内容指合同条款、招标文件、工程量清单、招标图纸所约定的一切工作。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '84',
    originalNo: '84',
    type: 'judgment',
    content: '家具供货周期计算方式：供货周期=生产期+运输期+安装期。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  },
  {
    id: '85',
    originalNo: '85',
    type: 'judgment',
    content: '家具采购中，机构授权订单中指定的机构收货人且在相关出货验收单上签字者为验收人。',
    options: ['A. 正确', 'B. 错误'],
    answer: 'A'
  }
];
