# my-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 组件

**底部导航**
```
<BottomNav :current="current" :list="list" font-color="#101010" active-font-color="#45BDE9" />
import BottomNav from '@/components/BottomNav'
```

**顶部导航**
需要topbar
```
<top-bar :show="true" />
<uniNavBar title="注册登录" :fixed="true" color="#fff" />
import uniNavBar from '@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar'
import TopBar from '../../components/TopBar'
```
不需要topbar
```
<uniNavBar title="注册登录" :fixed="true" color="#fff" />
import uniNavBar from '@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar'
```
