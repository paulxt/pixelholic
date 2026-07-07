import kingcartLogo from '../assets/logos/kingcart.png'
import polarisLogo from '../assets/logos/polaris.png'
import cmeiLogo from '../assets/logos/cmei.png'
import yunyangLogo from '../assets/logos/yunyang.png'
import woolbuddyLogo from '../assets/logos/woolbuddy.png'

export const clients = [
  {
    id: 'kingcart',
    icon: '◈',
    logo: kingcartLogo,
    color: '#4338CA',
    colorName: 'primary',
    metrics: [{ value: '+286%' }, { value: '+192%' }, { value: '8.4%' }, { value: '6.8x' }],
    website: 'https://www.kingcart.co',
  },
  {
    id: 'polaris',
    icon: '◉',
    logo: polarisLogo,
    color: '#0891B2',
    colorName: 'cyan',
    metrics: [{ value: '+456%' }, { value: '30+' }, { value: '+134%' }, { value: '68%' }],
    website: 'https://polaris-esim.tw',
  },
  {
    id: 'cmei',
    icon: '◇',
    logo: cmeiLogo,
    color: '#059669',
    colorName: 'green',
    metrics: [{ value: '+318%' }, { value: 'TOP 5' }, { value: '+224%' }, { value: null }],
    website: 'https://www.cmei.tw',
  },
  {
    id: 'yunyang',
    icon: '◆',
    logo: yunyangLogo,
    color: '#7C3AED',
    colorName: 'purple',
    metrics: [{ value: '+312%' }, { value: '+245%' }, { value: '+178%' }, { value: '4.9★' }],
    website: 'https://www.ctltour.com.tw',
  },
  {
    id: 'woolbuddy',
    icon: '▣',
    logo: woolbuddyLogo,
    color: '#EA580C',
    colorName: 'coral',
    metrics: [{ value: 'TOP 3' }, { value: '+247%' }, { value: '+185%' }, { value: '4.8★' }],
    website: 'https://woolbuddy.com',
  },
]

export default clients
