import Vue from 'vue'
import {
  Container,
  Header,
  Main,
  Avatar,
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
  MessageBox,
  Tooltip
} from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Avatar)
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

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
