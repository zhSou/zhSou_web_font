import Vue from 'vue'
import {
  Container,
  Header,
  Main,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
  Card,
  Image,
  Dialog,
  Form,
  FormItem,
  Checkbox,
  Divider,
  Message,
  MessageBox,
  Tooltip,
  Aside,
  Radio
} from 'element-ui'

Vue.use(Aside)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Card)
Vue.use(Image)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Checkbox)
Vue.use(Divider)
Vue.use(Tooltip)
Vue.use(Radio)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message
