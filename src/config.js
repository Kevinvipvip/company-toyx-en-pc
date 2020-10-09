let base = 'https://mp.tjluckytoy.com';
let aliyun_base = 'https://shanhaitest.oss-cn-beijing.aliyuncs.com';
let nav = [
  {
    id: 1,
    name: 'Home',
    url: '/',
  }, {
    id: 2,
    name: 'Service',
    url: '/server',
    s_nav: [{
      name: 'Domestic product',
      url: '/server',
      index: 1
    }, {
      name: 'Foreign product',
      url: '/server',
      index: 2
    }, {
      name: 'Toys custom',
      url: '/server',
      index: 3
    }]
  }, {
    id: 3,
    name: 'About',
    url: '/about',
    s_nav: [{
      name: 'Profile',
      url: '/about',
      index: 1
    }, {
      name: 'History',
      url: '/about',
      index: 2
    }, {
      name: 'Culture',
      url: '/about',
      index: 3
    }, {
      name: 'Honor',
      url: '/about',
      index: 4
    }]
  }, {
    id: 4,
    name: 'News',
    url: '/news',
    s_nav: [{
      name: 'Company news',
      url: '/news',
      index: 1
    }, {
      name: 'Industry trends',
      url: '/news',
      index: 2
    }]
  }, {
    id: 5,
    name: 'Contact',
    url: '/contact'
  }
];

let home_tab_cont = [
  {
    title: 'Company Profile',
    cont: 'Tianjin Lucky Toy Co.,Ltd, founded in 1993, is expert in idea designing, developing and manufacturing of plush toys.  It exports to North America, Europe, Australia etc for over 20 years with strong products development, whole manufacturing system and strict QC system. Now we are engaged in supplying all-age products, owning two labels, which are “Unicorn” and “One Happy Family”, and hope we can be your good partner on your way to good life.  Our target is: put goodness to your life and make your life better.',
    pics: [
      aliyun_base + '/static/cp-image1.jpg',
      aliyun_base + '/static/cp-image2.jpg',
      aliyun_base + '/static/cp-image3.jpg',
      aliyun_base + '/static/cp-image4.jpg',
      aliyun_base + '/static/cp-image5.jpg'],
  }, {
    title: 'R & D Center',
    cont: 'Lucky toy is constantly pursuing new development road. In the future, it is not only plush toys, but also plush toys plus intelligence, plush toy processing industry, etc. Close to the times, integrate with new technology and advance towards the extreme. At present, the R & D center has a number of experienced R & D personnel to improve the quality, attributes and communication of existing products through new ideas and new technologies.',
  }, {
    title: 'Incubation Center',
    cont: 'For the reconstruction of different elements, grasp the market demand and product positioning, incubate plush toys with attributes and connotation, and diversify, brand and spread toys. At present, our incubation base has successfully produced hundreds of kinds of plush toys and promoted the sales volume greatly.',
  }
];

let history = [
  {
    year: '1993',
    event: 'On December 28, five backbones jointly founded tongyuanxing and entered the toy industry.'
  }, {
    year: '1994',
    event: 'On October 1, the factory moved to shangcang science and technology town to gradually expand the productivity.'
  }, {
    year: '1996',
    event: 'The company has reached the scale of 100 people, the productivity has increased steadily, and the business has gradually turned to Beijing with the cooperation of Korean sole proprietorship enterprises. The quality is ahead of other enterprises and has been affirmed by the industry. Establish long term cooperation relationship with the largest supplier of play by play (Beijing Shiyuan Toy Co., Ltd.)'
  }, {
    year: '2000',
    event: 'Under the impact of the instability of the international market, tongyuanxing stands out from many manufacturing and processing enterprises with its ultra-high product quality.'
  }, {
    year: '2001',
    event: 'With Beijing Shunxiang Toys Co., Ltd. to establish a long-term cooperative relationship, among the forefront of the industry.'
  }, {
    year: '2005',
    event: 'The company was awarded "advanced unit of work safety".'
  }, {
    year: '2008',
    event: 'In May, the company was awarded the certificate of "independent Entrepreneurship Model".'
  }, {
    year: '2010',
    event: 'Set up joint venture, invest special fund to turn to toy export business.'
  }, {
    year: '2011',
    event: 'Tongyuanxing Toys Co., Ltd. was formally established. It introduced laser machines, filling machines and other advanced equipment, with an annual output value of 2 million US dollars in the first year.'
  }, {
    year: '2012',
    event: 'Research and development of cartoon toy sole set machine, and obtained the national patent certificate.'
  }, {
    year: '2015',
    event: 'A year of rapid development: expand the factory, further expand the scale, from the majority of outward processing to independent R & D and production; develop export business; in September of the same year, passed the highest ICTI A-level certification in the toy industry, with the qualification of exporting to foreign big customers. Set up key account department, clarify responsibilities, improve service quality, export products to EU, North America and other places, leading the industry.'
  }, {
    year: '2016',
    event: 'In September of the same year, the company was listed in the stock reform and established tongyuanxing Technology Co., Ltd. The gonging ceremony was held on October 13, taking the field of export to a new level.'
  }, {
    year: '2017',
    event: 'We have invested a lot in product R & D capability, and employed well-known domestic designers and publishers to expand the R & D team.'
  }, {
    year: '2018',
    event: 'Introduce large-scale intelligent cutting machine, join China Toy Association to become a 5-star supplier; prepare for the construction of Jizhou Development Zone Branch plant, the current workshop area is 10000 square meters, the storage area is 15000 square meters, and the annual output value of the enterprise is 7 million US dollars. He has been active in many well-known exhibitions in China, and reached agreements with PMS, six flags, ideal toys direct, fiesta process Corp, supreme and other companies with the greatest influence in Europe.'
  }
];
let hq_data = {
  honor: [{
    pic: aliyun_base + '/static/hq-honor1.png',
    title: 'ICTI certificate',
  }, {
    title: 'Technical training base of In-stitute of Industrial Fine Arts',
    pic: aliyun_base + '/static/hq-honor2.png',
  }, {
    title: 'Advanced group',
    pic: aliyun_base + '/static/hq-honor3.png',
  }, {
    title: 'Member unit of China Toy Association',
    pic: aliyun_base + '/static/hq-honor4.png',
  }, {
    title: 'Tianjin Cultural Industry Demo nstration Base',
    pic: aliyun_base + '/static/hq-honor5.png',
  }, {
    title: 'Self employed pacesetter',
    pic: aliyun_base + '/static/hq-honor6.png',
  }],

  zizhi: [{
    pic: aliyun_base + '/static/hq-zizhi1.png',
    title: 'GSV反恐'
  }, {
    title: '营业执照',
    pic: aliyun_base + '/static/hq-zizhi2.png'
  }, {
    title: '实用新型专利证书',
    pic: aliyun_base + '/static/hq-zizhi3.png'
  }, {
    title: '独角兽商标注册证',
    pic: aliyun_base + '/static/hq-zizhi4.png'
  }, {
    title: '同缘兴商标注册证',
    pic: aliyun_base + '/static/hq-zizhi5.png'
  }, {
    title: '充棉机PLC控制系统',
    pic: aliyun_base + '/static/hq-zizhi6.png'
  }, {
    title: '丝网印刷制版系统',
    pic: aliyun_base + '/static/hq-zizhi7.png'
  }, {
    title: '激光裁剪定位控制系统',
    pic: aliyun_base + '/static/hq-zizhi8.png'
  }]
};
let customized = [
  {
    id: 1,
    title: 'Corporate mascot',
    pic: aliyun_base + '/static/customized-img1-en.png'
  }, {
    id: 2,
    title: 'Plush dolls',
    pic: aliyun_base + '/static/customized-img1-en.png'
  }, {
    id: 3,
    title: 'Mascots for events',
    pic: aliyun_base + '/static/customized-img1-en.png'
  }, {
    id: 4,
    title: 'Plush derivatives',
    pic: aliyun_base + '/static/customized-img1-en.png'
  }, {
    id: 5,
    title: 'Licensing and Merchandising',
    pic: aliyun_base + '/static/customized-img1-en.png'
  }, {
    id: 6,
    title: 'Figure',
    pic: aliyun_base + '/static/customized-img1-en.png'
  }, {
    id: 7,
    title: 'Pillow neck pillow',
    pic: aliyun_base + '/static/customized-img1-en.png'
  }, {
    id: 8,
    title: 'Key ring',
    pic: aliyun_base + '/static/customized-img1-en.png'
  }, {
    id: 9,
    title: 'Plush pendant',
    pic: aliyun_base + '/static/customized-img1-en.png'
  }, {
    id: 10,
    title: 'Backpack plush',
    pic: aliyun_base + '/static/customized-img1-en.png'
  }
];
let customized_liucheng = [
  {
    id: 1,
    name: 'Selection',
    pic: aliyun_base + '/static/en-icon-xuanpin.png'
  }, {
    id: 2,
    name: 'Design',
    pic: aliyun_base + '/static/en-icon-sheji.png'
  }, {
    id: 3,
    name: 'Proofing',
    pic: aliyun_base + '/static/en-icon-dayang.png'
  }, {
    id: 4,
    name: 'Contract',
    pic: aliyun_base + '/static/en-icon-hetong.png'
  }, {
    id: 5,
    name: 'Production',
    pic: aliyun_base + '/static/en-icon-shengchan.png'
  }, {
    id: 6,
    name: 'Distribution',
    pic: aliyun_base + '/static/en-icon-peisong.png'
  }, {
    id: 7,
    name: 'Sign on',
    pic: aliyun_base + '/static/en-icon-qianshou.png'
  }, {
    id: 8,
    name: 'Aftermarket',
    pic: aliyun_base + '/static/en-icon-shouhou.png'
  }
];

let config = {
  url: base + '/',
  // api: base + '/api/zh.index/',
  api: base + '/api/en.index/',
  aliyun: aliyun_base + '/',//阿里云oss链接域名
  tel_reg: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
  phone_reg: /0\d{2,3}-\d{7,8}/,

  banner: aliyun_base + '/static/banner.png',//多个页面共用的banner图
  bg_img: aliyun_base + '/static/index-bg.jpg',//多个页面共用的冰山背景图

  // 数据内容
  nav: nav,//导航栏数据
  home_tab_cont,//首页tab栏数据

  history,//发展历程数据
  hq_data,//荣誉资质数据
  customized,//服务全球定制产品数据
  customized_liucheng,//服务全球定制流程数据
};

export default config;
